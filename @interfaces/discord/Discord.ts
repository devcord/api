import { DiscordUser } from './DiscordUser'
import { DiscordToken } from './DiscordToken'
import { GuildMember } from 'discord.js'

export interface Discord {
  getUserById (id: string): Promise<DiscordUser>
  getUserByToken (token: string): Promise<DiscordUser>
  getGuildMember (id: string): Promise<GuildMember>
  checkUserHasVerifiedRole (member: GuildMember): Promise<boolean>
  verifyUser (id: string): Promise<void>
  processCode (code: string): Promise<DiscordToken>
  processRefresh (refreshToken: string): Promise<DiscordToken>
  redirect: string
}
