const express = require('express');
const userRoutes = require("./routes/user.routes");
const app = express();
const pool = require("./config/db");  
const userAuth = require("./routes/auth.route");
const postRoutes = require("./routes/post.route");

require("dotenv").config()

pool
    .query("SELECT 1")
    .then(() => console.log("MYSQL connecté"))
    .catch((err) => console.error(err));

app.use(express.json())

app.get('/', (req, res) => {
    res.send({
        message: "API OK",
        status: "succès",
    });
});

app.use('/users', userRoutes)
app.use('/auth', userAuth)
app.use("/posts", postRoutes);

app.use((req, res, next) => {
    res.status(404).json({
        error: "not found",
        message: "route inexistante",
    });
});

app.use((err, req, res, next) => {
    console.log(err)

    res.status(err.statusCode || 500).json({
        err: err.name || "serverError",
        message: err.message || "erreur serveur"
    });
});

app.listen(3000, () => {
    console.log("server running on port 3000");
})

