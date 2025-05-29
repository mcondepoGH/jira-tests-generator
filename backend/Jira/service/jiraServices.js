import fetch from 'node-fetch'

const JIRA_URL = process.env.JIRA_URL
const JIRA_EMAIL = process.env.JIRA_EMAIL
const JIRA_TOKEN = process.env.JIRA_TOKEN

export const getJiraIssue = async (taskKey) => {
  return await fetch(`${JIRA_URL}/rest/api/2/issue/${taskKey}`, {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${Buffer.from(
        `${JIRA_EMAIL}:${JIRA_TOKEN}`
      ).toString('base64')}`,
      'Accept': 'application/json'
    }
  })
}