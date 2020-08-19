export interface DiscordConfig {
  scope: string[]
  redirectUri: string
  botToken: string
  clientId: string
  clientSecret: string
  verifiedRole: string
  guildId: string
  staffRoleId: string
  memberCountChannelId: string
  memberCountMessage: string
  memberCountEnabled: boolean
}
