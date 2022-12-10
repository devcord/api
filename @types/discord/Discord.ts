import { DiscordUser } from './DiscordUser'
import { DiscordToken } from './DiscordToken'
import { GuildMember } from 'discord.js'

export interface Discord {
  getUserById?(id: string): Promise<DiscordUser>
  getUserByToken?(token: string): Promise<DiscordUser>
  getGuildMember?(id: string): Promise<GuildMember>
  getMemberCount?(): Promise<number>
  getStaff?(): Promise<GuildMember[]>
  getAvatar?(id: string, avatar: string): string
  getDefaultAvatar?(discriminator: number): string
  checkUserHasVerifiedRole?(member: GuildMember): Promise<boolean>
  verifyMember?(member: GuildMember): Promise<void>
  processCode?(code: string): Promise<DiscordToken>
  processRefresh?(refreshToken: string): Promise<DiscordToken>
  redirect?: string
}
