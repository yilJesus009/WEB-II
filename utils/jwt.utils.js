module.exports={
    generateToken:(payload) =>{
        const jwt   = require('jsonwebtoken');
        const secretKey = process.env.JWT_SECRET;
        return jwt.sign(payload, secretKey, {expiresIn:'1d'});
    },
    verifyToken: (token) => {
        const jwt = require('jsonwebtoken');
        const secretKey = process.env.JWT_SECRET;
        try {
            const decoded = jwt.verify(token, secretKey);
            return decoded;
        } catch (err) {
            return null;
        }
    }
}