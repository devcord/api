import { Config } from './Config'
import { Discord } from './discord'
// import { Db } from 'mongodb'

export interface Props {
  config: Config
  success: Function
  failure: Function
  // db?: Db

  jwt: {
    sign: Function
    verify: Function
  }

  discord: Discord
}
