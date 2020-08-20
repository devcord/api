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

  router.get('/staff', async ctx => {
    const members = await discord.getStaff()

    const users = members.map(({ user }) => user)

    ctx.body = users.map(({ 
      id, 
      username, 
      discriminator, 
      avatar, 
    }) => {
      return {
        id,
        username,
        discriminator,
        tag: `${username}#${discriminator}`,
        avatar,
        avatarUrl: avatar ? discord.getAvatar(id, avatar) : discord.getDefaultAvatar(Number(discriminator)),
      }
    })
  })
  
  return router.routes()
}
