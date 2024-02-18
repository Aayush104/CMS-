
const express = require('express')
// const { blogs, users } = require('./model/exp')
const { create,createBlog,createpageRender,SinglePageRender,Delete,editRender,edit, myblogsrender} = require('./Controller/blog/blogcontroller')
const { RenderRegister,CreateUser,RenderLogin, LoginUser, LogOut } = require('./Controller/Auth/authController')
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

app.post('/edit/:id', isAuthenticated, edit)

//register page ma render gar
app.get('/register', isAuthenticated,RenderRegister)

app.get('/myblog', isAuthenticated, myblogsrender)

//User lai data base ma halna ko lagi
app.post('/registerUser',CreateUser)

//Login page ma render gar
app.get('/login', RenderLogin)

//Login Garney yaha bata ho
app.post('/loginUser', LoginUser  )

//logout ko 

app.get('/logout', LogOut)

app.listen(3000, ()=>{
    console.log("Server is running on port 3000")
})