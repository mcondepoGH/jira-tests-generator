import fetch from 'node-fetch'

const NAUTILUS_AUTH_URL = process.env.NAUTILUS_AUTH_URL
const NAUTILUS_BASIC_TOKEN = process.env.NAUTILUS_BASIC_TOKEN

export const getNautilusBearerToken = async () => {
  const response = await fetch(`${NAUTILUS_AUTH_URL}`, {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${NAUTILUS_BASIC_TOKEN}`,
      'Accept': '*/*'
    }
  })

  const data = await response.json()
  return data.token
}