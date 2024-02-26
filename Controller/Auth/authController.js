// render to register page

const { users } = require("../../model/exp")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


exports.RenderRegister= (req,res)=>{
    res.render("Register.ejs")
}

exports.CreateUser = async (req, res) => {
    const Email = req.body.email;
    const Username = req.body.username;
    const Password = req.body.password;
    const ConfirmPassword = req.body.Confirmpassword;

    console.log(req.body);

    if (!Email || !Username || !Password || !ConfirmPassword) {
        return res.send("Please Fill All data");
    }

    try {
        const userExist = await users.findOne({ 
            where: {
                Email: Email
            }
        });

        if (userExist) { 
            return res.send("Email Already exists. Please use another email");
        }

        if (Password !== ConfirmPassword) {
            return res.send("Passwords do not match");
        }
            
        await users.create({
            Username: Username,
            Email: Email,
            Password: bcrypt.hashSync(Password, 10)
        });

        res.redirect("/login");
    } catch (error) {
        console.log("Error occurred: ", error);
        return res.send("Error occurred while creating user.");
    }
}


exports.RenderLogin= (req,res)=>{
    res.render("Login.ejs")
}

exports.LoginUser = async (req,res)=>{

    const Email = req.body.email;
    const Password = req.body.password;

    try{
        const emailCheck = await users.findOne({
            where :{
                Email : Email
            }
        })
    
    
    if(!emailCheck){
    return res.send("Email doesnot exist")
    }
     
    //check password
    const emailpass = emailCheck.Password
    const check_emailPass = bcrypt.compareSync(Password, emailpass)
    
    
    if(check_emailPass){

        // jwt.sign({mail : Email})
   const token = jwt.sign({id : emailCheck.ID},process.env.SECRETKEY,{
    expiresIn : '30d'
   })
        console.log(token)
        res.cookie('token',token)
         res.send("Login Success")
    }else{
        res.send("Incorrect password");
    }
    }catch(error){
        res.status(400).send("error occur")
    }
  



}


exports.LogOut = (req,res)=>{
    res.clearCookie('token')
    res.redirect("/login")
}

exports.Forgot = (req,res)=>{

   res.render('Forgot.ejs')

}