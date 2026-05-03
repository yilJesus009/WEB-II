const getObjectOr404         = require('../middlewares/getObjectOr404.middleware');
const { isJsonRequestValid } = require('../middlewares/isJsonRequestValid.middleware');
const schemaValidation       = require('../middlewares/schemaValidation.middleware');
const requireAuth            = require('../middlewares/auth.middleware');
const ticketService          = require('../services/ticket.service');
const { ticketSchema, cambiarEstadoSchema } = require('../validators/ticket.schema');

module.exports = app => {
    // mergeParams: true para poder leer :proyectoId en el controller
    const router     = require('express').Router({ mergeParams: true });
    const controller = require('../controllers/ticket.controller');

    router.get('/',    requireAuth,                                                                               controller.getTickets);
    router.post('/',   requireAuth, isJsonRequestValid, schemaValidation(ticketSchema),                          controller.postTicketCreate);
    router.get('/:id',             getObjectOr404(ticketService),                                                controller.getTicketById);
    router.put('/:id', requireAuth, getObjectOr404(ticketService), isJsonRequestValid, schemaValidation(ticketSchema), controller.putTicketUpdate);
    router.delete('/:id', requireAuth, getObjectOr404(ticketService),                                           controller.deleteTicket);
    router.patch('/:id/estado', requireAuth, getObjectOr404(ticketService), isJsonRequestValid, schemaValidation(cambiarEstadoSchema), controller.patchTicketEstado);

    app.use('/proyectos/:proyectoId/tickets', router);
};