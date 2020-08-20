import {
  Discord,
  DiscordConfig,
  DiscordUser,
} from '@interfaces'

import { apiRequest } from './request'

export default (config: DiscordConfig, { getAvatar, getDefaultAvatar }): Discord => {
  const { botToken } = config

  const Bearer = (token: string): string => `Bearer ${token}`
  const Bot = (): string => `Bot ${botToken}`
  
  const getUserById = async (id: string): Promise<DiscordUser> => {
    const data = await apiRequest(`/users/${ id }`, {
      headers: {
        authorization: Bot(),
      },
    }) as DiscordUser

    const { 
      avatar, 
      discriminator,
    } = data

    return {
      ...data,
      avatarUrl: data.avatar ? getAvatar(id, avatar) : getDefaultAvatar(discriminator),
    } as DiscordUser
  }

  const getUserByToken = async (token?: string): Promise<DiscordUser> => {
    const data = await apiRequest(`/users/@me`, {
      headers: {
        authorization: Bearer(token),
      },
    }) as DiscordUser

    const { 
      id, 
      avatar, 
      discriminator,
    } = data

    return {
      ...data,
      avatarUrl: data.avatar ? getAvatar(id, avatar) : getDefaultAvatar(discriminator),
    } as DiscordUser
  }

  return {
    getUserById,
    getUserByToken,
  }
}
