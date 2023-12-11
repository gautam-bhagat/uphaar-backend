const bcrypt = require('bcrypt')
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

module.exports = { encryptPassword, decryptPassword }