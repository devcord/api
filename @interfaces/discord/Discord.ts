import { DiscordUser } from './DiscordUser'
import { DiscordToken } from './DiscordToken'

export interface Discord {
  getUserById (id: string): Promise<DiscordUser>
  getUserByToken (token: string): Promise<DiscordUser>
  processCode (code: string): Promise<DiscordToken>
  processRefresh (refreshToken: string): Promise<DiscordToken>
  redirect: string
}
