const mongoose = require('mongoose');

// URI alternativa que elude bloqueos DNS SRV en redes locales
const mongoURI = 'mongodb://Examen_ParcialDB:EQEW6OQPLuj60A2m@devweb-shard-00-00.ht05s4z.mongodb.net:27017,devweb-shard-00-01.ht05s4z.mongodb.net:27017,devweb-shard-00-02.ht05s4z.mongodb.net:27017/examen?ssl=true&replicaSet=atlas-130l2y-shard-0&authSource=admin&retryWrites=true&w=majority';

const conectarDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('>>> Conexión exitosa a MongoDB Atlas (Base: examen)');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error.message);
    process.exit(1);
  }
};

module.exports = conectarDB;

