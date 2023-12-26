const express = require("express");
const connectDB = require("./DB/connect");
const notfound = require("./Middlware/notFound");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoutes = require("./Routes/user");
require('express-async-errors');
require("dotenv").config();
const errorHandlerMiddleware = require("./Middlware/errorHandler");



const app = express();//insigness of express
app.use(cors({//define frondend path for recognize
    origin:'http://localhost:5173',
}));

app.use(express.json())//conver express contents into json
app.use(cookieParser())//using to acess cookies

app.get('/', (req, res) => {
    res.send("helo")
})

app.use(userRoutes)

app.use(notfound)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 6000;
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
    app.listen(port, () => {
        console.log(`server run in port ${port}`)
    })
    } catch (error) {
       console.log(error)
    }
    
}

start();
