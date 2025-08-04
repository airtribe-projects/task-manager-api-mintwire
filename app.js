const express = require('express');
const app = express();
const port = 3000;
const tasks = require('./models/tasks');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Lists all tasks, with the option of filtering by completed query parameter
app.get('/tasks', (req, res) => {
    const completed = req.query.completed;
    if (typeof completed !== 'undefined') {
        const filteredTasks = tasks.filter(task => task.completed === (completed === 'true'));
        return res.status(200).json({
            status: 'success',
            data: {
                tasks: filteredTasks
            }
        });
    }
    res.send(tasks);
});

//Lists(GET) all tasks sorted by creation order
app.get('/tasks/sortedbycreated', (req, res) => {
    const sortedTasks = tasks.slice().sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    res.status(200).json({
        status: 'success',
        data: {
            tasks: sortedTasks
        }
    });
})

//Get a specific task by ID
app.get('/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    const task = tasks.find(t=> t.id === parseInt(taskId));
    if(task) {
        return res.status(200).send(task);
    }
    // If task not found, send an error response
    res.status(404).send({ error: 'Task not found' });
});

//Create a new task
app.post('/tasks', (req, res) => {
    const task = req.body;
    const { title, description, completed } = task;
    if(!title || !description) {
        return res.status(400).send({ error: 'Title and description are required' });
    }
    if (typeof title !== 'string' || typeof description !== 'string' || typeof completed !== 'boolean') {
        return res.status(400).send({ error: 'Invalid task data' });
    }
    task.id = tasks.length + 1;
    task.createdAt = new Date().toISOString();
    tasks.push(task);
    res.status(201).json({
        status: 'success, task created',
        data: {
            task: task
        }
    });
})

//Update a task by ID
app.put('/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    const task = tasks.find(t => t.id === parseInt(taskId));
    if (!task) {
        return res.status(404).send({ error: 'Task not found' });
    }
    const { title, description, completed } = req.body;
    if(!title || !description) {
        return res.status(400).send({ error: 'Title and description are required' });
    }
    if (typeof title !== 'string' || typeof description !== 'string' || typeof completed !== 'boolean') {
        return res.status(400).send({ error: 'Invalid task data' });
    }

    task.title = title;
    task.description = description;
    task.completed = completed;
    res.status(200).send('Task updated successfully');
});

//Delete a task by ID
app.delete('/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    const taskIndex = tasks.findIndex(t => t.id === parseInt(taskId));
    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        res.status(200).send(tasks[taskIndex]);
    } else {
        res.status(404).send({ error: 'Task not found' });
    }
});

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});



module.exports = app;