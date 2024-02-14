const { blogs } = require("../../model/exp")

exports.create = async (req,res)=>{

    //blogs vaney table bata vayejati sabai data retrive
    const allblogs = await blogs.findAll()


     
//blogs vaney key ma allblogsbko data pass garke
    
    res.render("Main.ejs",{Blogs: allblogs})

}

exports.createBlog = async (req,res)=>{
    
    const title = req.body.name
    const Email = req.body.email
    const Message = req.body.message
    console.log(title,Email,Message )
    
    await blogs.create({
        Title: title,
        Email: Email,
        description: Message
    
    })
    
        // console.log(req.body)
        // res.render("Main.ejs")
        // res.send("form submitted successfully")
        res.redirect('/')
    }
    
exports.createpageRender = async(req,res)=>{
    res.render("Create.ejs")

}

exports.SinglePageRender = async (req,res)=>{
  
    const id = req.params.id

 const blogg = await  blogs.findAll({

        where:{
            id : id
        }
    })
    res.render("Single.ejs", {Singleblog: blogg} )
    // console.log(blogg.length)ye;sey length diyo //1 aauxa 
    // console.log(req.params.id)

    // specific id ko 
}

exports.Delete =  async (req,res)=>{
   

    const id = req.params.id
    console.log(id)
    
  
  await  blogs.destroy({
        where: {
            id : id
        }
    }) 
    // console.log(blogs.length)
    
   res.redirect('/')
}

exports.editRender =  async (req,res)=>{


    const id = req.params.id
    
    const editBlog=  await blogs.findAll({ 
        where : {
            id : id
        }
    })
    
    res.render('edit.ejs', {blog : editBlog})
    }
    
exports.edit = async (req,res)=>{
    
    const title = req.body.name
const Email = req.body.email
const Message = req.body.message
  


    const id = req.params.id
    await blogs.update({
        Title: title,
        Email: Email,
        description: Message,
      
    },{
        where :{
            id : id
        }
    })

    res.redirect("/Single/" + id)
  
}