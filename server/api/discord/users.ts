import { Middleware } from 'koa'
import Router from 'koa-router'

import {
  Props,
} from '@interfaces'

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

  return router.routes()
}
