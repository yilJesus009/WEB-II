const { findUserById } = require('../services/user.service');
const { verifyToken }  = require('../utils/jwt.utils');

const requireAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'Unauthorized' });

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const payload = verifyToken(parts[1]);
    if (!payload || payload.id === undefined) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = await findUserById(payload.id);  // async + await
    if (!user) return res.status(401).json({ message: 'Unauthorized' });

    req.user = user;
    next();
};

module.exports = requireAuth;