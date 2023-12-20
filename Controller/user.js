const User = require("../models/User");
const bcrypt=require('bcryptjs')//it is used to encryption some values like password.using algorithms MD5,SHA256 and it converted into cypher text
const jsonWebToken = require("jsonwebtoken")


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
   return res.status(200).json({msg:user})
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
    const userToken = jsonWebToken.sign({ id: existingUser._id },//sign using to create token
        process.env.WEB_TOKEN_SECRET,//using to generate ecripted token
        { expiresIn: "40s" });//seting time
    //cookie
  res.cookie(String(existingUser._id), userToken, {//cookie using to create new cookie 
    path: "/",//set path and / using it acess enter of all the project
    expires: new Date(Date.now() + 1000 * 30),//how many time expire the cookie
    httpOnly: true,//only access http
    sameSite:"lax"//it is using to only access cookies in link or api
  });
    
   return res.status(200).json(({msg:"success",userToken}))
}; 

const userVerification = (req, res, next) => {
    const cookie = req.headers.cookie;
    const token = cookie.split("=")[1];
    console.log(token)
    if (!token) {
        return res.status(404).json({msg:"Invalid Cridential:token notfount"})
    };
    jsonWebToken.verify(token.toString(), process.env.WEB_TOKEN_SECRET, (error, user) => {
        if (error) {
            return res.status(400).json({ msg: "Invalid Cridential" });
        }
        
        req.id = user.id;// store id in request 
    });
    next();
  
  console.log(cookie)
}

const getUser = async (req, res, next) => {
    const userID = req.id;//get the requset id
    let user;
    try {
         user = await User.findById(userID, "-password");
    } catch (error) {
        return new Error(error);
    }
    if (!user) {
        return res.status(404).json({msg:"User Not Found"})
    }
    return res.status(200).json({user})
}
module.exports = {
    signUp,
    login,
    userVerification,
    getUser
}