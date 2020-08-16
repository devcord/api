import {
  Config, 
} from '../@interfaces'

import CustomConfig from './custom'

const config: Config = {
  meta: {
    title: 'immortal.ink',
    description: '',
    thumbnail: 'https://example.com/thumb.png',
    themeColor: '#EB7A96',
    url: 'https://example.com',
  },

  port: Number(process.env.PORT) || 44444,

  isDevelopment: process.env.NODE_ENV === 'development',

  ...CustomConfig,
}

export default config
