const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Definir las rutas para las tareas
router.get('/:username/tareas', taskController.getAllTasks); // Obtener todas las tareas
router.post('/:username/tareas', taskController.createTask); // Crear una nueva tarea
router.put('/:username/tareas/:id', taskController.updateTaskById); // Actualizar una tarea
router.delete('/:username/tareas/:id', taskController.deleteTaskById); // Eliminar una tarea

module.exports = router;
