const { Usuario } = require('../models');

const userService = {
    findUserById: async (id) => {
        return await Usuario.findByPk(id);
    },
    findUserByEmail: async (email) => {
        return await Usuario.findOne({ where: { email } });
    },
    createUser: async (nombreCompleto, email, password) => {
        return await Usuario.create({ nombreCompleto, email, password });
    }
};

module.exports = userService;