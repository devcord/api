import { Middleware } from 'koa'
import Router from 'koa-router'

import {
  Props,
} from '@interfaces'

import AuthMiddleware from '../../middleware/auth'

export default (props: Props): Middleware => {
  const router = new Router()

  const { 
    discord,
  } = props

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

    const guildMember = await discord.getGuildMember(userId)

    const memberExists = Boolean(guildMember)

    if (memberExists) await discord.verifyMember(guildMember)
    
    ctx.body = {
      memberExists,
    }
  })

  return router.routes()
}
