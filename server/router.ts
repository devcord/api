import koa from 'koa'
import compression from 'koa-compress'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'

import api from './api'

import { Props } from '@interfaces'

export default (props: Props): void => {
  const app = new koa()
  const router = new Router()

  const {
    config, 
    success,
    failure,
  } = props

  app.use(compression())
  app.use(bodyParser())

  app.on('error', error => failure(error))

  router.use('', api(props))

  app.use(router.routes())

  app.listen(config.port)
  
  success(`Running on port ${config.port}.`)
}
