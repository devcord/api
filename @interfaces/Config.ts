import { DiscordConfig } from "./discord"
import cors from '@koa/cors'

export interface Config {
  database?: {
    url: string
    name: string
  }

  port?: number

  meta?: {
    title: string
    description: string
    thumbnail: string
    themeColor: string
    url: string
  }

  discord?: DiscordConfig

  isDevelopment?: boolean

  cors?: cors
}
