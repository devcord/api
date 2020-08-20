import {
  Discord,
} from '@types'

export default (): Discord => {
  const getAvatar = (id: string, avatar: string): string => (
    `https://cdn.discordapp.com/avatars/${id}/${avatar}.png`
  )

  const getDefaultAvatar = (discriminator: number): string => (
    `https://cdn.discordapp.com/embed/avatars/${discriminator % 5}.png`
  )

  return {
    getAvatar,
    getDefaultAvatar,
  }
}
