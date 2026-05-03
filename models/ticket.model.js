const { DataTypes } = require('sequelize');

const ESTADOS     = ['Pendiente', 'En Progreso', 'Completado'];
const TRANSICIONES = {
    'Pendiente':   ['En Progreso'],
    'En Progreso': ['Pendiente', 'Completado'],
    'Completado':  []
};

module.exports = (sequelize) => {
    const Ticket = sequelize.define('Ticket', {
        titulo: {
            type:      DataTypes.STRING,
            allowNull: false
        },
        descripcion: {
            type:     DataTypes.TEXT,
            allowNull: true
        },
        estado: {
            type:         DataTypes.STRING,
            allowNull:    false,
            defaultValue: 'Pendiente',
            validate: {
                isIn: {
                    args: [ESTADOS],
                    msg:  `Estado inválido. Permitidos: ${ESTADOS.join(', ')}`
                }
            }
        },
        prioridad: {
            type:         DataTypes.STRING,
            allowNull:    false,
            defaultValue: 'Media',
            validate: {
                isIn: {
                    args: [['Alta', 'Media', 'Baja']],
                    msg:  'Prioridad inválida. Permitidos: Alta, Media, Baja'
                }
            }
        }
        // proyectoId y asignadoId los agrega Sequelize al definir las asociaciones
    });

    // Exponemos las constantes para usarlas en el service
    Ticket.ESTADOS      = ESTADOS;
    Ticket.TRANSICIONES = TRANSICIONES;

    return Ticket;
};