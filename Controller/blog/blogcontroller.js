const { blogs, users } = require("../../model/exp")
const fs = require("fs");
const db = require('../../model/exp');
const { query } = require("express");
const sequelize = db.sequelize

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
    try {
        const img = req.file.filename;
        const title = req.body.name;
        const Email = req.body.email;
        const Message = req.body.message;
        console.log(title, Email, Message, img);

        // Retrieve user ID from req.user
        const userID = req.user[0].ID;

        // Multitent architecture

        //Create a unie table for each user
        // await sequelize.query(`CREATE TABLE IF NOT EXISTS blogs_${userID} (ID INT PRIMARY KEY NOT NULL AUTO_INCREMENT, Title VARCHAR(255), Email VARCHAR(255), Image VARCHAR(255), description VARCHAR(255), userID INT REFERENCES users(ID))`, {
        //     type: QueryTypes.CREATE
        // })

        // // Inserthe data to users belonging table
        // await sequelize.query(
        //     `INSERT INTO blogs_${userID}(Title, Email, Image, description, userID) VALUES (?, ?, ?, ?, ?)`,
        //     {
        //         replacements: [title, Email, img, Message, userID],
        //         type: sequelize.QueryTypes.INSERT // Changed to INSERT
        //     }
        // );


        // Create a blog with the provided information and user ID
        await sequelize.query(
            "INSERT INTO blogs (Title, Email, Image, description, userID) VALUES (?, ?, ?, ?, ?)",
            {
                replacements: [title, Email, img, Message, userID],
                type: sequelize.QueryTypes.INSERT // Changed to INSERT
            }
        );

        // Redirect to the home page or wherever appropriate
        res.redirect('/');
    } catch (error) {
        console.error(error);
        // Handle error response
        res.status(500).send("Error creating blog");
    }
};

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

    const id = req.params.id
    const title = req.body.name
const Email = req.body.email
const Message = req.body.message

const olddata = await blogs.findAll({
    where :{
        id : id
    }
})
  

let fileUrl

if(req.file){
   fileUrl= process.env.BACKEND + req.file.filename
   
const oldImage = olddata[0].Image
console.log(oldImage); //http://localhost:3000/1708163397639-8822310.jpg

const length_of_unwanted = "http://localhost:3000/".length
console.log(length_of_unwanted ) //22

const filenameinupfolder=oldImage.slice(length_of_unwanted)



    fs.unlink('uploads/' + filenameinupfolder, (err) => {
        if (err) {
            console.log('werror while deleting file');
        }else{
            console.log('Delet successfull')
        }
       
      });
}else{
   fileUrl= olddata[0].Image
}
 
    await blogs.update({
        Title: title,
        Email: Email,
        description: Message,
        Image : fileUrl
      
    },{
        where :{
            id : id
        }
    })


    res.redirect("/Single/" + id)
  
}


//my blog page ma jana kko lagi
exports.myblogsrender = async (req, res) => {
    const middleuserID = req.user[0].ID;

    try {
        const myblogs = await sequelize.query("SELECT * FROM blogs WHERE userID = :middleuserID", {
            replacements: { middleuserID }, // Using parameterized query for safety
            type: sequelize.QueryTypes.SELECT // Corrected typo
        });

        res.render("myblogs.ejs", { myblogs }); // Passed myblogs as object property

    } catch (error) {
        console.error(error); // Log any errors
        // Handle error response
        res.status(500).send("Error fetching blogs");
    }
}


//  const myblogs = await blogs.findAll({
//         where :{

//             userID : middleuserID
//         }
//     })
