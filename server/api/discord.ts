import { Middleware } from 'koa'
import Router from 'koa-router'

import {
  Props,
  DiscordToken,
} from '@interfaces'

import AuthMiddleware from '../middleware/auth'
import { verify } from 'jsonwebtoken'

export default (props: Props): Middleware => {
  const router = new Router()

  const { 
    discord,
    jwt,
  } = props

  router.get('/redirect', ctx => {
    ctx.redirect(discord.redirect)
  })

  router.get('/get-redirect', ctx => {
    ctx.body = discord.redirect
  })

  router.get('/users/:id', async ctx => {
    ctx.body = ctx.params.id === '@me' 
      ? await discord.getUserByToken(ctx.cookies.get('accessToken'))
      : await discord.getUserById(ctx.params.id)
  })

  router.get('/process-code', async ctx => {
    const { code } = ctx.query

    if (!code) return ctx.throw(400, 'Please provide a code parameter.') 

    const { refreshToken, accessToken, user }: DiscordToken = await discord.processCode(code)
    
    ctx.cookies.set('accessToken', accessToken, {
      expires: new Date(Date.now() + 604800000), // 1 week
      sameSite: 'lax',
    })
    
    ctx.cookies.set('refreshToken', refreshToken, {
      sameSite: 'lax',
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
      ...user,
      memberExists,
      hasVerifiedRole,
    }
  })

  router.get('/auth', AuthMiddleware(props), async ctx => {
    const { userId, loggedIn } = ctx.state

    ctx.body = { 
      userId, 
      loggedIn,
    }
  })

  router.get('/verification-status', AuthMiddleware(props), async ctx => {
    const { userId, loggedIn } = ctx.state

    if (!loggedIn) return ctx.throw(401, 'Please log in.')

    const guildMember = await discord.getGuildMember(userId)

    const memberExists = Boolean(guildMember)

    const hasVerifiedRole = memberExists ? await discord.checkUserHasVerifiedRole(guildMember) : false

    ctx.body = {
      memberExists,
      hasVerifiedRole,
    }
  })

  router.get('/verify', AuthMiddleware(props), async ctx => {
    const { userId, loggedIn } = ctx.state

    if (!loggedIn) return ctx.throw(401, 'Please log in.')

    await discord.verifyUser(userId)
    
    ctx.body = ''
  })

  return router.routes()
}
