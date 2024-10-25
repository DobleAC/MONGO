const Task = require('../models/taskModel'); // Ajusta la ruta según tu estructura

// Obtener todas las tareas de un usuario
async function getAllTasks(username) {
    const tasks = await Task.find({ username }); // Buscar tareas por el campo username
    return tasks.map(task => {
        return { ...task.toObject(), id: task._id }; // Convertir a objeto y agregar el id
    });
}

// Crear una nueva tarea
async function createTask(username, data) {
    const newTask = new Task({
        title: data.titulo,
        description: data.descripcion,
        status: false,
        username // Almacenar el nombre de usuario junto con la tarea
    });

    try {
        await newTask.save();
    } catch (e) {
        console.error("Error al agregar la tarea: ", e);
    }

    return newTask; // Devolver el nuevo objeto de tarea
}

// Actualizar una tarea por ID
async function updateTaskById(username, id, data) {
    const task = await Task.findByIdAndUpdate(
        id,
        { status: data.estado },
        { new: true } // Devolver el documento actualizado
    );

    return task;
}

// Eliminar una tarea por ID
async function deleteTaskById(id) {
    await Task.findByIdAndDelete(id); // Eliminar la tarea por ID
}

module.exports = {
    getAllTasks,
    createTask,
    updateTaskById,
    deleteTaskById,
};
