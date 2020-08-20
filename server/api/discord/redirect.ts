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

  router.get('/redirect', ctx => {
    ctx.redirect(discord.redirect)
  })

  router.get('/get-redirect', ctx => {
    ctx.body = discord.redirect
  })

  return router.routes()
}
