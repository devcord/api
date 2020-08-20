import { DiscordUser } from './DiscordUser'

export interface DiscordToken {
  accessToken: string
  refreshToken: string
  user?: DiscordUser
}
