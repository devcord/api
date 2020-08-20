import koa from 'koa'
import compression from 'koa-compress'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import cors from '@koa/cors'

import api from './api'

import { Props } from '@types'

export default (props: Props): void => {
  const app = new koa()
  const router = new Router()

  const {
    config,
    success,
    failure,
  } = props

  app.use(cors(config.cors))

  app.use(compression())
  app.use(bodyParser())

  const getDate = (): string => '[UTC] ' + new Date().toLocaleString('en-US', { timeZone: 'UTC' })

  app.use(async (ctx, next) => {
    await next()

    const { request, body } = ctx

    console.log(getDate(), {
      request,
      body,
    }, '\n')
  })

  app.on('error', error => failure(error))

  router.use('/api', api(props))

  app.use(router.routes())

  app.listen(config.port)

  success(`Running on port ${config.port}.`)
}
