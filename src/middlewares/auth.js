const jwt = require("jsonwebtoken");

const auth = (req,res,next) => {
    try {
        const header = req.headers.authorization;

        if (!header || !header.startsWith("Bearer ")) {
            return res.status(401).json({
                error: 'unauthorized',
                message: 'Token manquant',
            })
        }
        const token = header.split(" ")[1]
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = payload.userId

        next()
    } catch (err) {
        return res.status(401).json({
            error: 'unauthorized',
            message: 'Token manquant',
        });
    }
}

module.exports = auth;