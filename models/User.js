const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "must provide a name"],
    },
    email: {
        type: String,
        required: [true, "must provide a email"],
        unique:true
    },
    password: {
        type: String,
        required: [true, "must provide a password"],
        minlength:6,
    }
})