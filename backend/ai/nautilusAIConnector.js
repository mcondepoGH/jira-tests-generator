import fetch from 'node-fetch'

const NAUTILUS_AUTH_URL = process.env.NAUTILUS_AUTH_TOKEN
const NAUTILUS_API_URL = process.env.NAUTILUS_API_URL
const NAUTILUS_NAUTILUS_TENANT = process.env.NAUTILUS_TENANT
const NAUTILUS_BASIC_TOKEN = process.env.NAUTILUS_BASIC_TOKEN

const getNautilusBearerToken = async () => {
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

export const getAcceptanceCriteria = async (content) => {
  const aiRequest = `
      Eres un asistente de IA. Tu única tarea es analizar el siguiente contenido y devolver los criterios de aceptación que encuentres, en formato JSON.
      
      🔒 IMPORTANTE:
      - No incluyas ninguna explicación.
      - No escribas títulos, encabezados, ni ningún texto fuera del JSON.
      - Devuelve únicamente un array JSON Array.
      - Si no hay criterios, devuelve: []
      
      Contenido a analizar:
      """
      ${content}
      """
      
      Ejemplo de respuesta válida:
      [ 
        "El usuario puede iniciar sesión con su correo electrónico y contraseña.", 
        "El sistema muestra un mensaje de error si las credenciales son incorrectas."
      ]
      `

  const response = await fetch(`${NAUTILUS_API_URL}/ia/${NAUTILUS_NAUTILUS_TENANT}/answer`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${await getNautilusBearerToken()}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      prompt: aiRequest,
      model: 'gpt-4o'
    })
  })

  const data = await response.json()
  return JSON.parse(data.answer)
}