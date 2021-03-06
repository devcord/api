import { Middleware } from 'koa'
import Router from 'koa-router'

import PointModel, {
  PointDocument,
  // PointType, 
} from '../../models/points'

import {
  Props,
} from '@types'


import { validTopDays, validUserDays, validGetUser } from '../../utils/points/validators'

export default (props: Props): Middleware => {
  const router = new Router()

  const {

  } = props

  // TODO: validate input

  router.get('/:id', async ctx => {
    if (!validGetUser(ctx.params)) return ctx.throw(400)

    const points: PointDocument[] | null = await PointModel.find({ userID: ctx.params.id })

    if (points?.length > 0) ctx.body = points
    else ctx.throw(404)
  })

  router.get('/user/:id/:days', async ctx => {
    if (!validUserDays(ctx.params)) return ctx.throw(400)


    const date = new Date(Date.now() - Number(ctx.params.days) * 24 * 60 * 60 * 1000)

    const points: PointDocument[] | null = await PointModel.find({
      userID: ctx.params.id,
      createdAt: { $gte: date.toISOString() },
    })

    if (points?.length > 0) ctx.body = points
    else ctx.throw(404)
  })

  router.get('/top/:days', async ctx => {
    if (!validTopDays(ctx.params)) return ctx.throw(400)

    const date = new Date(Date.now() - Number(ctx.params.days) * 24 * 60 * 60 * 1000)

    const { results } = await PointModel.mapReduce({
      map: "function () { emit(this.userID, this.amount) }",
      reduce: "function (_, values) { return Array.sum(values) }",

      query: {
        createdAt: {
          $gte: date.toISOString(),
        },
      },

      resolveToObject: true,
    })

    if (results.length === 0) ctx.throw(404)
    else ctx.body = results
  })

  return router.routes()
}
