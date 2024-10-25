// Importar Mongoose
const mongoose = require('mongoose');

// Configuración de tu proyecto de MongoDB Atlas
const mongoURI = 'mongodb+srv://AARONCM:VANDREAD@task.edees.mongodb.net/?retryWrites=true&w=majority&appName=TASK';

// Función para conectar a MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB conectado');
    } catch (error) {
        console.error('Error de conexión:', error);
        process.exit(1); // Salir del proceso si hay un error de conexión
    }
};

// Exportar la función de conexión
module.exports = { connectDB };
