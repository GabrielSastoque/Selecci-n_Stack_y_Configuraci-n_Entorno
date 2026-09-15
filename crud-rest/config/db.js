const mongoose = require('mongoose');
const dns = require('dns');

// Forzar el uso de servidores DNS públicos de Google
dns.setServers(['8.8.8.8', '8.8.4.4']);

const conectarDB = async () => {
    try {
        // Reemplaza <usuario>, <password> y <cluster> por tus credenciales de Atlas
        const uri = 'mongodb+srv://sastoquegabriel95_db_user:JRk24VUFZP6bLRum@webdb.9u8svdh.mongodb.net/?appName=WebDB';
        await mongoose.connect(uri);
        console.log(' Conectado a MongoDB Atlas');
    } catch (error) {
        console.error(' Error de conexión a MongoDB:', error);
        process.exit(1);
    }
};

module.exports = conectarDB;