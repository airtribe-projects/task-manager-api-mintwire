# Task Manager API

A simple Express.js REST API for managing tasks in-memory.

## Features
- List all tasks
- Filter tasks by completion status
- Get a task by ID
- Create a new task
- Update a task by ID
- Delete a task by ID
- List tasks sorted by creation date

## Endpoints

### List all tasks
`GET /tasks`

### Filter tasks by completion
`GET /tasks?completed=true|false`

### List tasks sorted by creation date
`GET /tasks/sortedbycreated`

### Get a task by ID
`GET /tasks/:id`

### Create a new task
`POST /tasks`
- Body: `{ "title": string, "description": string, "completed": boolean }`

### Update a task by ID
`PUT /tasks/:id`
- Body: `{ "title": string, "description": string, "completed": boolean }`

### Delete a task by ID
`DELETE /tasks/:id`

## Usage
1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the server:
   ```sh
   node app.js
   ```
3. The API runs on `http://localhost:3000`

## Notes
- Data is stored in-memory and resets on server restart.
- Each task has a hardcoded `createdAt` timestamp.
