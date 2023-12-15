const signUp = async (req, res, next) => {
    res.status(201).json({msg:"success"})
}

module.exports = {
    signUp
}