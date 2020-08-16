import { DiscordConfig } from "./discord"

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
}
