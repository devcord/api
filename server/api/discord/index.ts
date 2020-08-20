import { Middleware } from 'koa'
import Router from 'koa-router'

import {
  Props,
} from '@types'

import Redirect from './redirect'
import Verify from './verify'
import Auth from './auth'
import Users from './users'
import Staff from './staff'

export default (props: Props): Middleware => {
  const router = new Router()

  router.use(Redirect(props))
  router.use(Verify(props))
  router.use(Auth(props))
  router.use(Users(props))
  router.use(Staff(props))

  return router.routes()
}
