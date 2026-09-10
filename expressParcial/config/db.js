const mongoose = require('mongoose');
const dns = require('dns');

// Forzar el uso de los DNS de Google en Node.js
dns.setServers(['8.8.8.8', '8.8.4.4']);

const conectarDB = async () => {
    try {
        const uri = 'mongodb+srv://Examen_ParcialDB:EQEw6OQPLuj6oA2m@devweb.ht05s4z.mongodb.net/examen?appName=DevWeb';
        await mongoose.connect(uri);
        console.log(' Conexión exitosa a MongoDB Atlas');
    } catch (error) {
        console.error(' Error de conexión:', error);
        process.exit(1);
    }
};

module.exports = conectarDB;