import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { extractDescription } from './Jira/content/contentUtils.js'
import { getAcceptanceCriteria } from './Nautilus/service/aiServices.js'
import { getJiraIssue } from './Jira/service/jiraServices.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())

// Endpoint para obtener tarea de Jira
app.get('/api/jira/task/:taskKey', async (req, res) => {
  const { taskKey } = req.params

  console.debug(`Fetching task from Jira: ${taskKey}`)

  try {
    const response = await getJiraIssue(taskKey)

    if (!response.ok) {
      throw new Error(`Jira API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()

    // Transformar los datos de Jira al formato esperado por el frontend
    const transformedTask = {
      key: data.key,
      summary: data.fields.summary,
      description: await extractDescription(data),
      acceptanceCriteria: await getAcceptanceCriteria(data.fields.description),
      status: data.fields.status.name,
      assignee: data.fields.assignee ? data.fields.assignee.displayName : 'Unassigned',
      priority: data.fields.priority ? data.fields.priority.name : 'Medium'
    }

    res.json(transformedTask)
  } catch (error) {
    console.error('Error fetching Jira task:', error)
    res.status(500).json({
      error: 'Failed to fetch task from Jira',
      message: error.message
    })
  }
})

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend is running' })
})

app.listen(PORT, () => {
  console.debug(`Backend server running on port ${PORT}`)
})
