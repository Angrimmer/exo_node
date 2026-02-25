const validateUser = (req, res, next) => {
    const {email, password} = req.body;
    
    if (!email || !password) {
        return res.status(400).json({
            error: "champs manquants",
        });
    };
    
    if (typeof email !== "string") {
        return res.status(400).json({
            error: "pas bon",
        });
    };

    if (password.length < 8) {
        return res.status(400).json({
            error: "mot de passe trop court",
        });
    };
next();
}

module.exports = validateUser;

