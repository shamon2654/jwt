const User = require("../models/User");
const bcrypt=require('bcryptjs')//it is used to encryption some values like password.using algorithms MD5,SHA256 and it converted into cypher text

const signUp = async (req, res, next) => {
    let existingUser;
    const { name, email, password } = req.body;
    existingUser = await User.findOne({ email: email });
    if (existingUser) {
        return res.status(400).json("User Already existed")
    }
    if (password.length < 6) {
        return res.status(400).json('atleast give 6 characters in the password')
    }
    let cypherText = bcrypt.hashSync(password);
    console.log(req.body)
    const user = new User({// create modle user instance
        name,// like this name:name it is updation of es6 the key and value 
        email,
        password:cypherText,
    })
    await user.save();
    res.status(200).json({msg:user})
}

const login = async (req, res, next) => {
    const { email, password } = req.body;
    let existingUser = await User.findOne({ email });
    if (!existingUser) {
        return res.status(400).json({msg:"Please Check Credentials"})
    }
    const validPassword = bcrypt.compareSync(password, existingUser.password);
    if (!validPassword) {
        return res.status(400).json({ msg: "Invalid Credentials" });
    }
    res.status(200).json(({msg:"success"}))
}; 

module.exports = {
    signUp,
    login
}