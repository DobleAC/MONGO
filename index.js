const express = require('express');
const jwt = require('jsonwebtoken');
const authenticate = require('./middleware/authMiddleware'); // Middleware de autenticación
const connectDB = require('./models/dbConfig'); // Conexión a la base de datos
const Task = require('./models/taskModel'); // Modelo de tareas
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Para parsear el cuerpo de las solicitudes JSON

// Usuarios predeterminados
const users = [
    { id: 1, username: 'test', password: 'password' },
    { id: 2, username: 'admin', password: 'admin123' }
];

// Función para generar tokens
function generateToken(user) {
    return jwt.sign({ id: user.id, username: user.username }, '123', { expiresIn: '1h' });
}

// Endpoint de login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        const token = generateToken(user);
        return res.json({ token });
    }

    res.status(401).json({ error: 'Credenciales inválidas' });
});

// Middleware de autenticación aplicado a otras rutas
app.use('/api', authenticate);

// Ruta para ver tareas de un usuario
app.get('/api/:username/tareas', async (req, res) => {
    const { username } = req.params;
    try {
        const userTasks = await Task.find({ username });
        res.json(userTasks);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener tareas' });
    }
});

// Ruta para crear tareas
app.post('/api/:username/tareas', async (req, res) => {
    const { username } = req.params;
    const { title, description } = req.body;
    const newTask = new Task({ username, title, description });
    try {
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear tarea' });
    }
});

// Ruta para modificar tareas
app.put('/api/:username/tareas/:id', async (req, res) => {
    const { username, id } = req.params;
    const { title, description } = req.body;

    try {
        const updatedTask = await Task.findOneAndUpdate(
            { _id: id, username },
            { title, description },
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }

        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ error: 'Error al modificar tarea' });
    }
});

// Ruta para eliminar tareas
app.delete('/api/:username/tareas/:id', async (req, res) => {
    const { username, id } = req.params;

    try {
        const deletedTask = await Task.findOneAndDelete({ _id: id, username });

        if (!deletedTask) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }

        res.json({ message: 'Tarea eliminada' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar tarea' });
    }
});

// Conectar a la base de datos y luego iniciar el servidor
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
});

