
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Configuración de Jira
const JIRA_URL = process.env.JIRA_URL;
const JIRA_EMAIL = process.env.JIRA_EMAIL;
const JIRA_TOKEN = process.env.JIRA_TOKEN;

// Endpoint para obtener tarea de Jira
app.get('/api/jira/task/:taskKey', async (req, res) => {
  const { taskKey } = req.params;
  
  console.log(`Fetching task from Jira: ${taskKey}`);
  
  try {
    const response = await fetch(`${JIRA_URL}/rest/api/2/issue/${taskKey}`, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${Buffer.from(
          `${JIRA_EMAIL}:${JIRA_TOKEN}`
        ).toString('base64')}`,
        'Accept': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`Jira API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // Transformar los datos de Jira al formato esperado por el frontend
    const transformedTask = {
      key: data.key,
      summary: data.fields.summary,
      description: extractDescription(data.fields.description),
      acceptanceCriteria: extractAcceptanceCriteria(data.fields.description),
      status: data.fields.status.name,
      assignee: data.fields.assignee ? data.fields.assignee.displayName : 'Unassigned',
      priority: data.fields.priority ? data.fields.priority.name : 'Medium'
    };

    console.log('Task loaded successfully:', transformedTask);
    res.json(transformedTask);
  } catch (error) {
    console.error('Error fetching Jira task:', error);
    res.status(500).json({ 
      error: 'Failed to fetch task from Jira',
      message: error.message 
    });
  }
});

function extractDescription(content) {
  //TODO : Implementar lógica para extraer la descripción del contenido
  return content
}

function extractAcceptanceCriteria(content) {
  //TODO : Implementar lógica para extraer los criterios de aceptación del contenido
  return content
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend is running' });
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
