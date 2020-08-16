import axios from 'axios'

export default async (
  url: string,
  options = {},
): Promise<string | object> => {
  try {
    const { data } = await axios({
      url,
      ...options,
    })

    return data
  } catch ({ response }) {
    const { 
      status, 
      data, 
      config: { url },
    }: {
      status: number
      data: string | object
      config: {
        url: string
      }
    } = response

    throw { 
      status, 
      data, 
      url, 
    }
  }
}
