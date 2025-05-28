
# Jira Test Generator

Aplicación para generar automáticamente baterías de pruebas basadas en criterios de aceptación de Jira.

## Arquitectura

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Node.js + Express
- **Containerización**: Docker + Docker Compose

## Estructura del Proyecto

```
├── docker-compose.yml
├── frontend/
│   ├── src/
│   ├── package.json
│   ├── Dockerfile
│   └── ...
└── backend/
    ├── server.js
    ├── package.json
    ├── Dockerfile
    └── ...
```

## Desarrollo Local

### Con Docker Compose (Recomendado)

1. Clona el repositorio
2. Ejecuta el proyecto completo:
```bash
docker-compose up --build
```

La aplicación estará disponible en:
- Frontend: http://localhost:8080
- Backend API: http://localhost:3001

### Sin Docker

#### Backend
```bash
cd backend
npm install
npm run dev
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Variables de Entorno

### Backend
- `JIRA_URL`: URL de tu instancia de Jira
- `JIRA_TOKEN`: Token de autenticación de Jira
- `PORT`: Puerto del servidor (por defecto 3001)

### Frontend
- `VITE_API_URL`: URL del backend API (por defecto http://localhost:3001)

## API Endpoints

- `GET /api/health`: Health check del backend
- `GET /api/jira/task/:taskKey`: Obtener tarea de Jira

## Uso

1. Ingresa la clave de una tarea de Jira (ej: PROJ-123)
2. Haz clic en "Cargar Tarea"
3. Revisa los criterios de aceptación cargados
4. Genera las pruebas automáticas
5. Exporta o copia los casos de prueba generados
