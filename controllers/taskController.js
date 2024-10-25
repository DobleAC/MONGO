const taskService = require('../service/taskService'); // Asegúrate de ajustar la ruta según tu estructura

// Controlador para obtener todas las tareas de un usuario
async function getAllTasks(req, res) {
    const username = req.params.username; // Obtener el nombre de usuario de los parámetros de la ruta
    try {
        const tasks = await taskService.getAllTasks(username);
        res.status(200).json(tasks); // Devolver las tareas con un estado 200
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las tareas' }); // Manejar errores
    }
}

// Controlador para crear una nueva tarea
async function createTask(req, res) {
    const username = req.params.username; // Obtener el nombre de usuario de los parámetros de la ruta
    const data = req.body; // Obtener los datos de la tarea del cuerpo de la solicitud
    try {
        const newTask = await taskService.createTask(username, data);
        res.status(201).json(newTask); // Devolver la nueva tarea con un estado 201
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la tarea' }); // Manejar errores
    }
}

// Controlador para actualizar una tarea
async function updateTaskById(req, res) {
    const { id, username } = req.params;
    const { title, description, status } = req.body; // Asegúrate de que coincida con la estructura del cuerpo

    try {
        const updatedTask = await taskModel.updateTask(id, username,  {
            title,
            description,
            status
        });

        if (updatedTask) {
            res.status(200).json({ message: 'Tarea actualizada', task: updatedTask });
        } else {
            res.status(404).json({ error: 'Tarea no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la tarea' });
    }
}

// Controlador para eliminar una tarea
async function deleteTaskById(req, res) {
    const { username, id } = req.params;

    try {
        const result = await taskModel.deleteTask(username, id);

        if (result) {
            res.status(200).json({ message: 'Tarea eliminada' });
        } else {
            res.status(404).json({ error: 'Tarea no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la tarea' });
    }
}

module.exports = {
    getAllTasks,
    createTask,
    updateTaskById,
    deleteTaskById,
};
