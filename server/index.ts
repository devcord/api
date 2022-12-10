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
  
  await mongoose.connect(config.database.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  

  const props: Props = {
    config,
    success,
    failure,
    jwt,
    discord: discord(config.discord),
  }

  router(props)
}

init().catch(failure)
