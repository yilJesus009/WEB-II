const { sequelize } = require('../config/db.config');

// Cargar modelos pasándoles la instancia de sequelize (patrón del docente)
const Usuario  = require('./usuario.model')(sequelize);
const Proyecto = require('./proyecto.model')(sequelize);
const Ticket   = require('./ticket.model')(sequelize);

// ── Asociaciones ──────────────────────────────────────────────────────────────

// Un usuario crea muchos proyectos
Usuario.hasMany(Proyecto, { foreignKey: 'creadorId', as: 'proyectosCreados' });
Proyecto.belongsTo(Usuario, { foreignKey: 'creadorId', as: 'creador' });

// Un proyecto tiene muchos miembros (many-to-many)
// Sequelize crea la tabla pivote "ProyectoUsuarios" automáticamente
Usuario.belongsToMany(Proyecto, { through: 'ProyectoUsuarios', as: 'proyectos' });
Proyecto.belongsToMany(Usuario, { through: 'ProyectoUsuarios', as: 'miembros' });

// Un proyecto tiene muchos tickets
Proyecto.hasMany(Ticket, { foreignKey: 'proyectoId', as: 'tickets' });
Ticket.belongsTo(Proyecto, { foreignKey: 'proyectoId', as: 'proyecto' });

// Un ticket puede estar asignado a un usuario
Usuario.hasMany(Ticket, { foreignKey: 'asignadoId', as: 'ticketsAsignados' });
Ticket.belongsTo(Usuario, { foreignKey: 'asignadoId', as: 'asignado' });

// ─────────────────────────────────────────────────────────────────────────────

module.exports = { Usuario, Proyecto, Ticket, sequelize };