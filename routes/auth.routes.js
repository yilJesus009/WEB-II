const { isJsonRequestValid } = require('../middlewares/isJsonRequestValid.middleware');
const schemaValidation       = require('../middlewares/schemaValidation.middleware');
const requireAuth            = require('../middlewares/auth.middleware');
const { registerSchema, loginSchema } = require('../validators/auth.schema');

module.exports = app => {
    const router     = require('express').Router();
    const controller = require('../controllers/auth.controller');

    router.post('/register', isJsonRequestValid, schemaValidation(registerSchema), controller.postRegister);
    router.post('/login',    isJsonRequestValid, schemaValidation(loginSchema),    controller.postLogin);
    router.get('/me',        requireAuth,                                           controller.getMe);

    app.use('/auth', router);
};