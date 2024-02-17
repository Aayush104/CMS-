
const express = require('express')
// const { blogs, users } = require('./model/exp')
const { create,createBlog,createpageRender,SinglePageRender,Delete,editRender,edit, myblogsrender} = require('./Controller/blog/blogcontroller')
const { RenderRegister,CreateUser,RenderLogin, LoginUser } = require('./Controller/Auth/authController')
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
app.get('/create',createpageRender)

// Single blog page render
app.get("/Single/:id", SinglePageRender)


app.get('/Delete/:id',isAuthenticated,Delete)


//database nma halna ko lagi
app.post('/create', isAuthenticated, upload.array("img"),createBlog)
//edit ko api banako
app.get('/edit/:id', isAuthenticated, editRender )

//edit gareko database ma halna ko lagi

app.post('/edit/:id', isAuthenticated, edit)

//register page ma render gar
app.get('/register', RenderRegister)

app.get('/myblog', isAuthenticated, myblogsrender)

//User lai data base ma halna ko lagi
app.post('/registerUser',CreateUser)

//Login page ma render gar
app.get('/login', RenderLogin)

//Login Garney yaha bata ho
app.post('/loginUser', LoginUser  )

app.listen(3000, ()=>{
    console.log("Server is running on port 3000")
})