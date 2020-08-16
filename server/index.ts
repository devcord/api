import chalk from 'chalk'

import { MongoClient } from 'mongodb'

import router from './router'
import jwt from './utils/jwt'
import config from '../config'
import discord from './utils/discord'

import {
  Props, 
} from '@interfaces'

const success = (...args: Array<string>): void => {
  console.log(`${ chalk.bgGreen.black(' API ') }`, ...args, '\n')
}

const failure = (...args: Array<string>): void => {
  console.log(`${ chalk.bgRed.black(' API ') }`, ...args, '\n')
}

const init = async (): Promise<void> => {
  const dbClient = await MongoClient.connect(config.database.url, { useUnifiedTopology: true })
  const db = dbClient.db(config.database.name)

  const props: Props = {
    config,
    success,
    failure,
    db,
    jwt,
    discord: discord(config.discord),
  }

  router(props)
}

init().catch(failure)
