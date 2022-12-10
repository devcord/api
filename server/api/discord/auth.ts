import { Middleware } from 'koa'
import Router from 'koa-router'

import {
  Props,
  DiscordToken,
} from '@types'

import AuthMiddleware from '../../middleware/auth'

export default (props: Props): Middleware => {
  const router = new Router()

  const {
    discord,
    jwt,
  } = props

  router.get('/logout', async ctx => {
    ctx.cookies.set('accessToken', '', {
      expires: new Date(),
      sameSite: 'lax',
    })
    
    ctx.cookies.set('refreshToken', '', {
      expires: new Date(),
      sameSite: 'lax',
    })
    
    ctx.cookies.set('loggedIn', '', {
      expires: new Date(),
      sameSite: 'lax',
    })

    ctx.body = ''
  })

  router.get('/auth', AuthMiddleware(props), async ctx => {
    const { userId, loggedIn } = ctx.state

    ctx.body = { 
      userId, 
      loggedIn,
    }
  })

  router.get('/process-code', AuthMiddleware(props), async ctx => {
    const { code } = ctx.query

    if (ctx.state.loggedIn) {
      const guildMember = await discord.getGuildMember(ctx.state.userId)

      const memberExists = Boolean(guildMember)

      const hasVerifiedRole = memberExists ? await discord.checkUserHasVerifiedRole(guildMember) : false

      ctx.body = {
        memberExists,
        hasVerifiedRole,
      }
    } else {
      if (!code) return ctx.throw(400, 'Please provide a code parameter.')
      if(Array.isArray(code)) return ctx.throw(400, 'Code must be a string.')

      const { refreshToken, accessToken, user }: DiscordToken = await discord.processCode(code)

      ctx.cookies.set('accessToken', accessToken, {
        expires: new Date(Date.now() + 604800000), // 1 week
        sameSite: 'lax',
      })

      ctx.cookies.set('refreshToken', refreshToken, {
        sameSite: 'lax',
        expires: new Date(Date.now() + 604800000 * 52), // 1 year
      })

      ctx.cookies.set('loggedIn', jwt.sign({
        id: user.id,
        expires: Date.now() + 604800000,
      }), {
        expires: new Date(Date.now() + 604800000), // 1 week
        sameSite: 'lax',
      })

      const guildMember = await discord.getGuildMember(user.id)

      const memberExists = Boolean(guildMember)

      const hasVerifiedRole = memberExists ? await discord.checkUserHasVerifiedRole(guildMember) : false

      ctx.body = {
        memberExists,
        hasVerifiedRole,
      }
    }
  })

  return router.routes()
}
