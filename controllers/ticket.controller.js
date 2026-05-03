const ticketService = require('../services/ticket.service');

exports.getTickets = async (req, res) => {
    const tickets = await ticketService.getObjectList(req.params.proyectoId);
    res.json(tickets);
};
exports.getTicketById = async (req, res) => {
    res.json(req.obj);
};
exports.postTicketCreate = async (req, res) => {
    const ticket = await ticketService.createObject(req.body, req.params.proyectoId);
    res.status(201).json(ticket);
};
exports.putTicketUpdate = async (req, res) => {
    const ticket = await ticketService.updateObject(req.obj, req.body);
    res.json(ticket);
};
exports.patchTicketEstado = async (req, res) => {
    try {
        const ticket = await ticketService.cambiarEstado(req.obj, req.body.estado);
        res.json(ticket);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.deleteTicket = async (req, res) => {
    await ticketService.deleteObject(req.obj);
    res.json({ message: 'Ticket eliminado correctamente' });
};