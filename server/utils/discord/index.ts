import {
  DiscordConfig,
  Discord,
} from '@types'

import Avatars from './avatars'
import Users from './users'
import OAuth from './oauth'
import Bot from './bot'

export default (config: DiscordConfig): Discord => {
  const {
    getAvatar, 
    getDefaultAvatar,
  } = Avatars()

  const { 
    getUserById, 
    getUserByToken, 
  } = Users(config, { 
    getAvatar, 
    getDefaultAvatar, 
  })

  const { 
    processCode, 
    processRefresh, 
    redirect,
  } = OAuth(config, { 
    getUserByToken, 
  })

  const { 
    getGuildMember, 
    checkUserHasVerifiedRole, 
    verifyMember, 
    getStaff,
  } = Bot(config)

  return {
    getAvatar,
    getDefaultAvatar,

    getUserById,
    getUserByToken,

    processCode,
    processRefresh,
    redirect,

    getGuildMember,
    checkUserHasVerifiedRole,
    verifyMember,
    getStaff,
  }
}
