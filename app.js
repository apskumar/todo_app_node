const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors');
const app = express()

//connection
connectDB()

// cors policy update
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(cors());

//Initial Middleware
app.use(express.json({ extended : false }))
// defined Routers
app.use("/api/users",require("./router/api/users"));

app.use("/api/auth",require("./router/api/auth"))

app.use("/api/profile",require("./router/api/profile"))

app.use("/api/posts",require("./router/api/posts"))

const PORT = process.env.PORT || 5000


app.listen(PORT,()=> console.log(`Server started port ${ PORT }`))

