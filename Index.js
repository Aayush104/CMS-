
const express = require('express')
// const { blogs, users } = require('./model/exp')
const { create,createBlog,createpageRender,SinglePageRender,Delete,editRender,edit, myblogsrender} = require('./Controller/blog/blogcontroller')
const { RenderRegister,CreateUser,RenderLogin, LoginUser, LogOut, Forgot } = require('./Controller/Auth/authController')
const app = express()
const bcrypt = require('bcrypt')
const { isAuthenticated } = require('./Middleware/isAuthenticated')
require('dotenv').config() //require or import dotenv with default configuration
const cookieParser = require('cookie-parser')


//database connection

require("./model/exp")

app.set("view engine", 'ejs')


//cookie bata aako data padhna lai middleware authenticaion ko lagi
app.use(cookieParser())



//NAVBAR DYNamics ko lagi  middleware  banauney

app.use((req,res,next)=>{

   res.locals.currentUser = req.cookies.token
    next()
})



//nodelai File access garna dey vaneko
app.use(express.static("public/"))
app.use(express.static("uploads/"))

app.use(express.json()) // parse gaar or handel gaar vanya form bata aako data
app.use(express.urlencoded({extended:true}))

//multer image ko lagi import garya ho
const {multer, storage} = require("./Middleware/MulterConfig");
const { users } = require('./model/exp')
const sendEmail = require('./Services/Sendemail')
const upload = multer({storage : storage})

//main page render
app.get('/',create)

//createpagerender
app.get('/create', isAuthenticated, createpageRender)

// Single blog page render
app.get("/Single/:id", isAuthenticated, SinglePageRender)


app.get('/Delete/:id',isAuthenticated,Delete)


//database nma halna ko lagi
app.post('/create', isAuthenticated, upload.single("img"),createBlog)
//edit ko api banako
app.get('/edit/:id', isAuthenticated, editRender )

//edit gareko database ma halna ko lagi

app.post('/edit/:id', isAuthenticated, upload.single("img"), edit)

//register page ma render gar
app.get('/register',RenderRegister)

app.get('/myblog', isAuthenticated, myblogsrender)

//User lai data base ma halna ko lagi
app.post('/registerUser',CreateUser)

//Login page ma render gar
app.get('/login', RenderLogin)

//Login Garney yaha bata ho
app.post('/loginUser', LoginUser  )

//logout ko 

app.get('/logout', LogOut)

//forgot page render garya matra ho
app.get('/Forgot', Forgot)


//post for forgot

app.post('/forgotPass', async (req,res)=>{

    const email = req.body.email

    const checkUser = await users.findAll({

        where :{
            Email : email
        }
    })

   if(!checkUser){
   return res.send("Email with that user not foud")
   }

  await sendEmail({
    email: email,
    subject : "forget password otp",
    otp : 1234,
   })

   res.send("email send successfully")
})
app.listen(3000, ()=>{
    console.log("Server is running on port 3000")
})