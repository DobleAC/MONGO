const { body, validationResult } = require('express-validator');

// Middleware de validación para crear y actualizar tareas
const validateTask = [
    body('titulo').notEmpty().withMessage('El título es obligatorio'),
    body('descripcion').notEmpty().withMessage('La descripción es obligatoria'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() }); // Devolver errores de validación
        }
        next(); // Llamar al siguiente middleware o controlador
    },
];

module.exports = validateTask;
