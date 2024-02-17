const jwt = require('jsonwebtoken')
const { users } = require('../model/exp')
const promisifyy= require('util').promisify


exports.isAuthenticated = async (req,res,next)=>{

    const token = req.cookies.token


    // ..chcek if token given or not

    if(!token){
      
        return res.render('login'); // Assuming your login view file is named "login.ejs" =

    }

    //verofy token legit ho ki nai

const cookiDecoded = await promisifyy(jwt.verify)(token,process.env.SECRETKEY)
console.log(cookiDecoded)


// //check garney if thhat id jun aauxa cookie bata JUn xai login gard encrypt vayera baseko hunxa (Id) radecoded garepaxi decrypt hunxa
// tyo database ma xa ki nai

const verifyId = await users.findAll({
    where :{
ID : cookiDecoded.id
    }
})

// console.log(verifyId)

if(!verifyId){
   return res.send("User with that token doesnot exist")

}

req.user =  verifyId //req.j halda ni hunxa esma  if ba cookie bata aako id ra database ma vakokunai Id milxa vaney Yo id lai pathaidiney createblpg ma



next();
}