import {
  Config,
} from '../@interfaces'

const config: Config = {
  database: {
    url: 'mongodb://localhost:27017',
    name: 'devcord-api',
  },

  discord: {
    scope: ['identify'],
    redirectUri: 'http://localhost:8080/process-code',
    clientId: '',
    clientSecret: '',
    botToken: '',
    guildId: '',
    verifiedRoleId: '',
    staffRoleId: '',
    memberCountChannelId: '',
    memberCountMessage: '{{ x }} Testcoders',
    memberCountEnabled: false,
  },

  cors: {
    origin: 'http://localhost:8080',
    credentials: true,
  },
}

export default config
