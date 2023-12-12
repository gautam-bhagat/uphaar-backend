const bcrypt = require('bcrypt')
const jwt=require('jsonwebtoken');

require('dotenv').config()

const genSaltRounds = 10

const encryptPassword = async (password) =>{

    const salt = await bcrypt.genSalt(genSaltRounds);
    // Hash the password with the salt
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword
}

const decryptPassword = async(password,encryptedPassword) =>{
   const match=await bcrypt.compare(password, encryptedPassword)
   return match
}

const deviceAuth=async(token)=>{
   const verifiedToken=  jwt.verify(token, process.env.JWT_SECRET_KEY);
//    console.log(verifiedToken.id)
   return verifiedToken
}
module.exports = { encryptPassword, decryptPassword,deviceAuth }