const nodemailer = require('nodemailer')

const sendEmail = async(options)=>{

    let transporter = nodemailer.createTransport({

        service :'gmail',

        auth:{
            user:"aayushadhikari601@gmail.com",
            pass:'zfdeskszyzkkbyfe'
        }

    });
const mailoptions = {
    from : "Aayush Adhikari <aayushadhikari601@gmail.com>",
    to : options.email,
    subject: options.subject,
    text: "Your Otp is " + options.otp,
};

await transporter.sendMail(mailoptions);
}

module.exports  = sendEmail;