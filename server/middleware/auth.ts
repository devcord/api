import { Props } from '@interfaces'

export default ({ jwt, discord }: Props) => async (ctx, next): Promise<void> => {
  const token = ctx.cookies.get('loggedIn')

  let loggedIn

  try {
    loggedIn = jwt.verify(token)
  } catch {
    ctx.cookies.set('loggedIn', null, {
      expires: Date.now(),
      sameSite: 'lax',
    })
  }

  ctx.state.loggedIn = false

  if (loggedIn) {
    if (loggedIn.expires <= Date.now()) {
      const { refreshToken, accessToken } = await discord.processRefresh(ctx.cookies.get('refreshToken'))
      
      ctx.cookies.set('accessToken', accessToken, {
        expires: new Date(Date.now() + 604800000), // 1 week
        sameSite: 'lax',
      })
      
      ctx.cookies.set('refreshToken', refreshToken, {
        sameSite: 'lax',
      })
  
      ctx.cookies.set('loggedIn', jwt.sign({ 
        id: loggedIn.id,
        expires: Date.now() + 604800000,
      }), {
        expires: new Date(Date.now() + 604800000), // 1 week
        sameSite: 'lax',
      })
    }
  
    ctx.state.loggedIn = true
    ctx.state.userId = loggedIn.id
  } else {
    if (!loggedIn) return ctx.throw(401)
  }

  await next()
}
