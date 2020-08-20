import { apiRequest } from './request'

import querystring from 'querystring'

import {
  DiscordToken,
  DiscordConfig,
  Discord,
} from '@interfaces'

export default (config: DiscordConfig, { getUserByToken }: Discord): Discord => {
  const {
    clientId,
    clientSecret,
    scope,
    redirectUri,
  } = config

  const processCode = async (code: string): Promise<DiscordToken> => {
    const { 
      access_token: accessToken, 
      refresh_token: refreshToken,
    } = await apiRequest(`/oauth2/token`, { 
      method: 'POST',
      data: querystring.stringify({
        'client_id': clientId,
        'client_secret': clientSecret,
        'scope': scope.join(' '),
        'grant_type': 'authorization_code',
        'redirect_uri': redirectUri,
        'code': code,
      }),
    }) as { access_token: string, refresh_token: string }

    const user = await getUserByToken(accessToken)
  
    return {
      accessToken,
      refreshToken,
      user,
    }
  }

  const processRefresh = async (refreshToken: string): Promise<DiscordToken> => {
    const { 
      access_token: accessToken,
      refresh_token: newRefreshToken,
    } = await apiRequest(`/oauth2/token`, { 
      method: 'POST',
      data: querystring.stringify({
        'client_id': clientId,
        'client_secret': clientSecret,
        'scope': scope.join(' '),
        'grant_type': 'refresh_token',
        'redirect_uri': redirectUri,
        'refresh_token': refreshToken,
      }),
    }) as { access_token: string, refresh_token: string }

    // const user = await getUserByToken(accessToken)
  
    return {
      accessToken,
      refreshToken: newRefreshToken,
      // user,
    }
  }

  const redirect = `https://discordapp.com/oauth2/authorize?client_id=${
    clientId
  }&scope=${
    scope.join('%20')
  }&response_type=code&redirect_uri=${
    redirectUri
  }&prompt=none`

  return {
    processCode,
    processRefresh,
    redirect,
  }
}
