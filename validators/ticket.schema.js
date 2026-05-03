const Joi = require('joi');

const ticketSchema = Joi.object({
    titulo:      Joi.string().min(3).required(),
    descripcion: Joi.string().allow('', null).optional(),
    prioridad:   Joi.string().valid('Alta', 'Media', 'Baja').optional(),
    asignadoId:  Joi.number().integer().allow(null).optional()
});

const cambiarEstadoSchema = Joi.object({
    estado: Joi.string()
        .valid('Pendiente', 'En Progreso', 'Completado')
        .required()
});

module.exports = { ticketSchema, cambiarEstadoSchema };