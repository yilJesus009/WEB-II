const proyectoService = require('../services/proyecto.service');

exports.getProyectos = async (req, res) => {
    const proyectos = await proyectoService.getObjectList(req.user.id);
    res.json(proyectos);
};
exports.getProyectoById = async (req, res) => {
    res.json(req.obj);
};
exports.postProyectoCreate = async (req, res) => {
    const proyecto = await proyectoService.createObject(req.body, req.user.id);
    res.status(201).json(proyecto);
};
exports.putProyectoUpdate = async (req, res) => {
    const proyecto = await proyectoService.updateObject(req.obj, req.body);
    res.json(proyecto);
};
exports.deleteProyecto = async (req, res) => {
    await proyectoService.deleteObject(req.obj);
    res.json({ message: 'Proyecto eliminado correctamente' });
};
exports.postAddMiembro = async (req, res) => {
    const proyecto = await proyectoService.addMiembro(req.obj, req.body.usuarioId);
    res.json(proyecto);
};