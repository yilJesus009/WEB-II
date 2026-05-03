const { Proyecto, Usuario } = require('../models');

const INCLUDE = [
    { model: Usuario, as: 'creador',  attributes: ['id', 'nombreCompleto', 'email'] },
    { model: Usuario, as: 'miembros', attributes: ['id', 'nombreCompleto', 'email'] }
];

const proyectoService = {
    getObjectList: async (usuarioId) => {
        // Reemplazo 1
        const usuario = await Usuario.findOne({
            where: { id: usuarioId },
            include: [{ model: Proyecto, as: 'proyectos', include: INCLUDE }]
        });
        const creados = await Proyecto.findAll({
            where: { creadorId: usuarioId }, include: INCLUDE
        });
        const todos  = [...(usuario?.proyectos || []), ...creados];
        return [...new Map(todos.map(p => [p.id, p])).values()];
    },

    getById: async (id) => {                          // nombre estándar para getObjectOr404
        // Reemplazo 2
        return await Proyecto.findOne({ where: { id }, include: INCLUDE });
    },

    createObject: async ({ nombre, descripcion }, creadorId) => {
        const proyecto = await Proyecto.create({ nombre, descripcion, creadorId });
        // Reemplazo 3 (Este era el que causaba tu error en Postman)
        const creador  = await Usuario.findOne({ where: { id: creadorId } });
        await proyecto.addMiembro(creador);            // creador entra como primer miembro
        return await proyectoService.getById(proyecto.id);
    },

    updateObject: async (proyecto, { nombre, descripcion }) => {
        proyecto.nombre      = nombre      ?? proyecto.nombre;
        proyecto.descripcion = descripcion ?? proyecto.descripcion;
        return await proyecto.save();
    },

    deleteObject: async (proyecto) => {
        return await proyecto.destroy();
    },

    addMiembro: async (proyecto, usuarioId) => {
        // Reemplazo 4
        const usuario = await Usuario.findOne({ where: { id: usuarioId } });
        if (!usuario) throw new Error('Usuario no encontrado');
        await proyecto.addMiembro(usuario);
        return await proyectoService.getById(proyecto.id);
    }
};

module.exports = proyectoService;