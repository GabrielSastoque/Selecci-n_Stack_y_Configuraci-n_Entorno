const { Sequelize, DataTypes } = require('sequelize');

// 1. Conexión a SQLite (creará un archivo 'biblioteca.sqlite' automáticamente)
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './biblioteca.sqlite',
  logging: false // Desactiva los logs SQL en consola para mantenerla limpia
});

// 2. Tabla 1: Editoriales
const Editorial = sequelize.define('Editorial', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  contacto: {
    type: DataTypes.STRING
  }
});

// 3. Tabla 2: Libros
const Libro = sequelize.define('Libro', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  resumen: {
    type: DataTypes.TEXT
  },
  paginas: {
    type: DataTypes.INTEGER
  },
  disponibles: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
});

// 4. Crear la Relación (Llave Foránea): Una Editorial tiene muchos Libros
Editorial.hasMany(Libro, { foreignKey: 'editorialId' });
Libro.belongsTo(Editorial, { foreignKey: 'editorialId' });

module.exports = { sequelize, Editorial, Libro };