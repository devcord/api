import chalk from 'chalk'

// import { MongoClient } from 'mongodb'
import mongoose from 'mongoose'

import router from './router'
import jwt from './utils/jwt'
import config from '../config'
import discord from './utils/discord'

import {
  Props,
} from '@types'


const getDate = (): string => '[UTC] ' + new Date().toLocaleString('en-US', { timeZone: 'UTC' })

const success = (...args: Array<string>): void => {
  console.log(`${chalk.bgGreen.black(' API ')} ${chalk.gray(getDate())} `, ...args, '\n')
}

const failure = (...args: Array<string>): void => {
  console.log(`${chalk.bgRed.black(' API ')} ${chalk.gray(getDate())} `, ...args, '\n')
}

const init = async (): Promise<void> => {
  // const dbClient = await MongoClient.connect(config.database.url, { useUnifiedTopology: true })
  
  await mongoose.connect(config.database.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  
  // success('Connected to MongoDB')
  // const db = dbClient.db(config.database.name)

  const props: Props = {
    config,
    success,
    failure,
    // db,
    jwt,
    discord: discord(config.discord),
  }

  router(props)
}

init().catch(failure)
