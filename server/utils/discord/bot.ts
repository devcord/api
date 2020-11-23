import DiscordJS from 'discord.js'

import {
  DiscordConfig,
  Discord,
} from '@types'

let guild: DiscordJS.Guild 
let memberCountChannel: DiscordJS.GuildChannel
let prevCount
let newCount

const bot = new DiscordJS.Client()

export default (config: DiscordConfig): Discord => {
  const {
    verifiedRoleId,
    staffRoleId,
    memberCountChannelId,
    memberCountEnabled,
    memberCountMessage,
    guildId,
    botToken,
  } = config

  const getGuildMember = async(id: string): Promise<DiscordJS.GuildMember | null> => {
    try {
      const member: DiscordJS.GuildMember = await guild.members.fetch({ 
        user: id, 
        cache: false,
      })

      return member
    } catch (error) {
      console.error(new Error(error.message), '\n')

      return null
    }
  }

  const checkUserHasVerifiedRole = async (member: DiscordJS.GuildMember): Promise<boolean> => {
    try {
      return Boolean(await member.roles.cache.find(({ id }) => id === verifiedRoleId))
    } catch (error) {
      console.error(new Error(error.message), '\n')

      return false 
    }
  }

  const verifyMember = async (member: DiscordJS.GuildMember): Promise<void> => {
    await member.roles.add(verifiedRoleId)
  }

  const getStaff = async (): Promise<DiscordJS.GuildMember[]> => {
    const { members } = await guild.roles.fetch(staffRoleId)

    return members.array()
  }

  const setMemberCount = async (count: number): Promise<void> => {
    try {
      // fixes discord.js bug
      
      if (memberCountEnabled) await memberCountChannel.edit({ 
        name: memberCountMessage.replace('{{ x }}', String(count)),
        bitrate: 8000,
      })
    } catch (error) {
      console.error(error)
    }
  }

  bot.on('ready', async () => {
    console.log(`Logged in as ${bot.user.tag}\n`)
    guild = await bot.guilds.fetch(guildId)

    memberCountChannel = guild.channels.resolve(memberCountChannelId)

    await setMemberCount(guild.memberCount)

    prevCount = guild.memberCount
    newCount = guild.memberCount

    setInterval(() => {
      if (prevCount !== newCount) {
        prevCount = newCount
        setMemberCount(newCount)
      }
    }, 1000 * 60 * 60)
  })

  bot.on('guildMemberAdd', async ({ guild }) => {
    newCount = guild.memberCount
  })

  bot.on('guildMemberRemove', async ({ guild }) => {
    newCount = guild.memberCount
  })

  bot.login(botToken)

  return { 
    getGuildMember, 
    checkUserHasVerifiedRole, 
    verifyMember, 
    getStaff,
  }
}
