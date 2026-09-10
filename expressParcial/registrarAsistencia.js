const conectarDB = require('./config/db');
const Asistencia = require('./models/Asistencia');

const registrar = async () => {
    await conectarDB();
    
    try {
        const nuevaAsistencia = new Asistencia({
            nombre: 'Gabriel Arturo Sastoque Cadena',
            idUniversidad: '000500100', // Reemplaza por tu ID/código de estudiante real
            hobby: 'Tocar guitarra y jugar Roblox'
        });

        await nuevaAsistencia.save();
        console.log(' Documento creado en la colección "asistencias" con éxito.');
    } catch (error) {
        console.error(' Error al registrar asistencia:', error);
    } finally {
        process.exit();
    }
};

registrar();