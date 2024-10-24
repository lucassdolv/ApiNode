const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/config");

const authenticateToken = (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token) {
        return res.status(401).json({ msg: "Acesso negado. Token não fornecido." });
    }

    try {
        const decoded = jwt.verify(token.split(' ')[1], JWT_SECRET);
        req.user = decoded; 
        next();
    } catch (error) {
        return res.status(403).json({ msg: "Token inválido ou expirado." });
    }
};

module.exports = authenticateToken;