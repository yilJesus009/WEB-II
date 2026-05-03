const getModels = () => require('../models');



const INCLUDE = () => {
    const db = getModels();
    return [
        { model: db.Usuario, as: 'asignado', attributes: ['id', 'nombreCompleto', 'email'] },
        { model: db.Proyecto, as: 'proyecto', attributes: ['id', 'nombre'] }
    ];
};

const ticketService = {
    getObjectList: async (proyectoId) => {
        const { Ticket } = getModels();
        return await Ticket.findAll({
            where:   { proyectoId },
            include: INCLUDE(),
            order:   [['createdAt', 'DESC']]
        });
    },

    getById: async (id) => {
        const { Ticket } = getModels();
        return await Ticket.findByPk(id, { include: INCLUDE() });
    },

    createObject: async ({ titulo, descripcion, prioridad, asignadoId }, proyectoId) => {
        const { Ticket } = getModels();
        const ticket = await Ticket.create({
            titulo, descripcion,
            prioridad:  prioridad  ?? 'Media',
            estado:     'Pendiente',
            proyectoId,
            asignadoId: asignadoId ?? null
        });
        return await ticketService.getById(ticket.id);
    },

    updateObject: async (ticket, { titulo, descripcion, prioridad, asignadoId }) => {
        ticket.titulo      = titulo      ?? ticket.titulo;
        ticket.descripcion = descripcion ?? ticket.descripcion;
        ticket.prioridad   = prioridad   ?? ticket.prioridad;
        ticket.asignadoId  = asignadoId  !== undefined ? asignadoId : ticket.asignadoId;
        await ticket.save();
        return await ticketService.getById(ticket.id);
    },

    cambiarEstado: async (ticket, nuevoEstado) => {
        const { Ticket } = getModels();
        const permitidos = Ticket.TRANSICIONES[ticket.estado];
        if (!permitidos.includes(nuevoEstado)) {
            throw new Error(
                `No se puede pasar de "${ticket.estado}" a "${nuevoEstado}". ` +
                `Permitidos: ${permitidos.join(', ') || 'ninguno'}`
            );
        }
        if (nuevoEstado === 'Completado' && !ticket.asignadoId) {
            throw new Error('No se puede completar un ticket sin responsable asignado');
        }
        ticket.estado = nuevoEstado;
        await ticket.save();
        return await ticketService.getById(ticket.id);
    },

    deleteObject: async (ticket) => {
        return await ticket.destroy();
    }
};

module.exports = ticketService;