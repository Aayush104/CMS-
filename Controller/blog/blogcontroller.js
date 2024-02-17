const { blogs, users } = require("../../model/exp")

exports.create = async (req,res)=>{

    //blogs vaney table bata vayejati sabai data retrive
    const allblogs = await blogs.findAll({
        include :{
            model : users,  //model lekhnu parxa cAUSE Y table ko name ho ani kun table join garney tyo lekhnu apryo


        }
    })

// console.log(allblogs)
     
//blogs vaney key ma allblogsbko data pass garke
    
    res.render("Main.ejs",{Blogs: allblogs})

}

exports.createBlog = async (req, res) => {

    const img = req.file.filename
    const title = req.body.name;
    const Email = req.body.email;
    const Message = req.body.message;
    console.log(title, Email, Message, img);


        // Retrieve user ID from req.user
        const userID = req.user[0].ID
        // Create a blog with the provided information and user ID
        await blogs.create({
            Title: title,
            Email: Email,
            Image : process.env.BACKEND + img,
            description: Message,
            userID: userID
        });

        // Redirect to the home page or wherever appropriate
        res.redirect('/');
    } 
        // Handle any errors that occur during blog creation
       
    
    
exports.createpageRender = async(req,res)=>{
    res.render("Create.ejs")

}

exports.SinglePageRender = async (req,res)=>{
  
    const id = req.params.id

 const blogg = await  blogs.findAll({

        where:{
            id : id
        },
        include:{
            model : users,
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


//my blog page ma jana kko lagi
exports.myblogsrender = async (req,res)=>{
  
    const middleuserID = req.user[0].ID

 const myblogs = await blogs.findAll({
        where :{

            userID : middleuserID
        }
    })




    res.render("myblogs.ejs", {myblogs : myblogs})
}