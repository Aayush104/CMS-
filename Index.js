
const express = require('express')
// const { blogs, users } = require('./model/exp')
const { create,createBlog,createpageRender,SinglePageRender,Delete,editRender,edit} = require('./Controller/blog/blogcontroller')
const { RenderRegister,CreateUser,RenderLogin, LoginUser } = require('./Controller/Auth/authController')
const app = express()
const bcrypt = require('bcrypt')
require('dotenv').config() //require or import dotenv with default configuration

//database connection

require("./model/exp")

app.set("view engine", 'ejs')

//nodelai File access garna dey vaneko
app.use(express.static("public"))

app.use(express.json()) // parse gaar or handel gaar vanya form bata aako data
app.use(express.urlencoded({extended:true}))

//main page render
app.get('/',create)

//createpagerender
app.get('/create',createpageRender)

// Single blog page render
app.get("/Single/:id", SinglePageRender)


app.get('/Delete/:id',Delete)


//database nma halna ko lagi
app.post('/create',createBlog)
//edit ko api banako
app.get('/edit/:id', editRender )

//edit gareko database ma halna ko lagi

app.post('/edit/:id', edit)

//register page ma render gar
app.get('/register', RenderRegister)



//User lai data base ma halna ko lagi
app.post('/registerUser',CreateUser)

//Login page ma render gar
app.get('/login', RenderLogin)

//Login Garney yaha bata ho
app.post('/loginUser', LoginUser  )

app.listen(3000, ()=>{
    console.log("Server is running on port 3000")
})