import { Middleware } from 'koa'
import Router from 'koa-router'

import {
  Props,
} from '@types'

export default (props: Props): Middleware => {
  const router = new Router()

  const {
    discord,
  } = props

  router.get('/users/:id', async ctx => {
    ctx.body = ctx.params.id === '@me'
      ? await discord.getUserByToken(ctx.cookies.get('accessToken'))
      : await discord.getUserById(ctx.params.id)
  })

  router.get('/member/count', async ctx => {
    const memberCount = await discord.getMemberCount()

    ctx.body = memberCount
  })

  return router.routes()
}
