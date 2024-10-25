const jwt = require('jsonwebtoken');

// Middleware de autenticación
function authenticate(req, res, next) {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ error: 'Acceso no autorizado' });
    }

    try {
        const decoded = jwt.verify(token, '123'); // Cambia '123' por tu clave secreta real
        req.user = decoded; // Almacenar información del usuario en la solicitud
        next(); // Llamar al siguiente middleware o controlador
    } catch (error) {
        res.status(401).json({ error: 'Token no válido' });
    }
}

module.exports = authenticate;
