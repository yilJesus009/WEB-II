const Joi = require('joi');

const proyectoSchema = Joi.object({
    nombre:      Joi.string().min(2).required(),
    descripcion: Joi.string().allow('', null).optional()
});

const addMiembroSchema = Joi.object({
    usuarioId: Joi.number().integer().required()
});

module.exports = { proyectoSchema, addMiembroSchema };