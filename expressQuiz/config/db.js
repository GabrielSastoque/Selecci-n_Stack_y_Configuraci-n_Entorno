const mongoose = require('mongoose');

function conectarDB() {
  // Se cambia 'mongodb+srv://' por 'mongodb://' con puerto directo :27017
  return mongoose.connect(
    'mongodb://sastoquegabriel95_db_user:JRk24VUFZP6bLRum@webdb-shard-00-00.9u8svdh.mongodb.net:27017,webdb-shard-00-01.9u8svdh.mongodb.net:27017,webdb-shard-00-02.9u8svdh.mongodb.net:27017/test?ssl=true&replicaSet=atlas-9u8svdh-shard-0&authSource=admin&retryWrites=true&w=majority'
  );
}

module.exports = conectarDB;