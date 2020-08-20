import fetch from '../fetch'

import {
  AxiosRequestConfig,
} from 'axios'

export const apiRequest = async (
  path: string,
  options: AxiosRequestConfig = {
    headers: {},
  },
): Promise<object> => {
  try {
    return await fetch(`https://discordapp.com/api${path}`, {
      ...options,
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded',
        ...options.headers,
      },
    }) as object
  } catch ({ data, status, url }) {
    const {
      message, 
      error_description: error, 
    } = data

    throw new Error(`${status} at ${url} | ${ message || error || JSON.stringify(data) }`)
  }
}
