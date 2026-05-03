const getObjectOr404         = require('../middlewares/getObjectOr404.middleware');
const { isJsonRequestValid } = require('../middlewares/isJsonRequestValid.middleware');
const schemaValidation       = require('../middlewares/schemaValidation.middleware');
const requireAuth            = require('../middlewares/auth.middleware');
const proyectoService        = require('../services/proyecto.service');
const { proyectoSchema, addMiembroSchema } = require('../validators/proyecto.schema');

module.exports = app => {
    const router     = require('express').Router();
    const controller = require('../controllers/proyecto.controller');

    router.get('/',    requireAuth,                                                                                  controller.getProyectos);
    router.post('/',   requireAuth, isJsonRequestValid, schemaValidation(proyectoSchema),                           controller.postProyectoCreate);
    router.get('/:id',             getObjectOr404(proyectoService),                                                 controller.getProyectoById);
    router.put('/:id', requireAuth, getObjectOr404(proyectoService), isJsonRequestValid, schemaValidation(proyectoSchema), controller.putProyectoUpdate);
    router.delete('/:id', requireAuth, getObjectOr404(proyectoService),                                            controller.deleteProyecto);
    router.post('/:id/miembros', requireAuth, getObjectOr404(proyectoService), isJsonRequestValid, schemaValidation(addMiembroSchema), controller.postAddMiembro);

    app.use('/proyectos', router);
};