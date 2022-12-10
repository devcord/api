import { Middleware } from 'koa'
import Router from 'koa-router'

import { Props } from '@types'

import DiscordRouter from './discord'

export default (props: Props): Middleware => {
  const router = new Router()

  router.use('/discord', DiscordRouter(props))

  return router.routes()
}
