const express = require("express");
require('express-async-errors');
require("dotenv").config();
const connectDB = require("./DB/connect");
const userRoutes=require("./Routes/user")
const notfound = require("./Middlware/notFound");
const errorHandlerMiddleware = require("./Middlware/errorHandler");



const app = express();//insigness of express

app.use(express.json())//conver express contents into json

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
