const { generateToken } = require('../utils/jwt.utils');
const { sha1Encode }    = require('../utils/text.utils');
const userService       = require('../services/user.service');

exports.postRegister = async (req, res) => {
    const { nombreCompleto, email, password } = req.body;
    const existe = await userService.findUserByEmail(email);
    if (existe) {
        return res.status(400).json({ message: 'El email ya está registrado' });
    }
    await userService.createUser(nombreCompleto, email, sha1Encode(password));
    res.status(201).json({ message: 'Usuario registrado exitosamente' });
};

exports.postLogin = async (req, res) => {
    const { email, password } = req.body;
    const usuario = await userService.findUserByEmail(email);
    if (!usuario || sha1Encode(password) !== usuario.password) {
        return res.status(401).json({ message: 'Usuario o contraseña incorrectas' });
    }
    const token = generateToken({ id: usuario.id });
    res.status(200).json({ token });
};

exports.getMe = async (req, res) => {
    res.status(200).json({ usuario: req.user });
};