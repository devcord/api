import { Middleware } from 'koa'
import Router from 'koa-router'

import { Props } from '@types'

import DiscordRouter from './discord'
import PointsRouter from './points'

export default (props: Props): Middleware => {
  const router = new Router()

  router.use('/discord', DiscordRouter(props))
  router.use('/points', PointsRouter(props))

  return router.routes()
}
