const router = require("express").Router()                                      // Permet d'étre monté dans mon server.js (app.js pour vous) en gros c'est require('express') mais en mode modulaire
const jwt = require("jsonwebtoken")                                             // Le package qui gere les token (duuuuh)

router.post('/login', async (req, res, next) => {                               // Ecoute les requettes http POST sur http://localhost:3000/user/login
    const { email, password } = req.body;                                       // Get le contenu envoyé par le client, les definit au varaibles

    if (!email || !password) {                                                  // Check si elles existe ou pas
        return res.status(400).json({
            error: "badRequest",
            message: "Champs manquant"
        })
    }

    // Une requette SQL qui contiens uniquement ce qui correspond a l'email envoyé par le client
    const [rows] = await pool.query(
        "SELECT id,email,password FROM users WHERE email = ? LIMIT 1", [email]
    )

    if (rows.length === 0){                                                     // Si la reponse de la requette d'avant est null, ça degage
        return res.status(401).json({
            error: "Unauthorized",
            message: "indentifiant invalides"
        })
    }
    const user = rows[0]                                                        // Choppe le premier output de la reponse du SQL, et le definit en tant que user

    const isMatch = await bcrypt.compare(password, user.password)               // Check le mdp recu par POST, le compare avec le mdp hashé recu par SQL

    if(!isMatch){                                                               // Dit "degage" si le mdp recu coincide pas
        return res.status(401).json({
            error: "Unauthorized",
            message: "Identifiants invalides"
        })
    }
    // Set un token, lié a l'user.id 
    const token = jwt.sign(
        {userId: user.id},
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXIRES_IN || '1h'}
    )

    // Sert le token a l'utilisateur
    res.json({
        message: 'login ok',
        token
    })
})

module.exports = router