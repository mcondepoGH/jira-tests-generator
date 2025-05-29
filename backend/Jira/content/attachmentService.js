import fetch from 'node-fetch'

const JIRA_URL = process.env.JIRA_URL
const JIRA_EMAIL = process.env.JIRA_EMAIL
const JIRA_TOKEN = process.env.JIRA_TOKEN

export const fetchAttachmentAsDataUri = async (attachmentId, mimeType) => {
  const response = await fetch(`${JIRA_URL}/rest/api/2/attachment/content/${attachmentId}`, {
    method: 'GET',
    headers: {
      Authorization: `Basic ${Buffer.from(`${JIRA_EMAIL}:${JIRA_TOKEN}`).toString('base64')}`
    }
  })

  if (!response.ok) {
    throw new Error(`Error fetching attachment ${attachmentId}: ${response.statusText}`)
  }

  const arrayBuffer = await response.arrayBuffer()
  const base64Image = Buffer.from(arrayBuffer).toString('base64')
  return `data:${mimeType};base64,${base64Image}`
}
