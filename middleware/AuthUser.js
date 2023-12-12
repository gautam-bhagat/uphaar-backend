const Users = require('../models/Users');
const utils=require('../utils')
const authenticateUser=async (req,res,next)=>{

    // const userID=utils.deviceAuth(req.headers.token);
    // console.log(userID)
   
    // console.log(user)
   try {
    const {id} = await  utils.deviceAuth(req.headers.token)
    const user=await Users.find({_id:id});
   console.log(user) 
   if(user){
    next();
   }

   } catch (error) {
    

       return res.send('unauthorized access');
   

   }
}
module.exports=authenticateUser