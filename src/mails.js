const nodemailer = require('nodemailer')
const Email = require('email-templates');
const path = require('path')
let {EMAIL_HOST,EMAIL_PORT, EMAIL_USER, EMAIL_PASSWORD} = process.env
var transport = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASSWORD
    }
  })

  var cons = require('consolidate');

let html;
exports.Template = (url,info) =>{


}
  //var send = transport.templateSender(email)
 
exports.sendMail= (mailOptions)=>{
   console.log(mailOptions)
    return new Promise((res,rej)=>{
    cons.swig(mailOptions.url, mailOptions.info, function(err, html){
          if (err) rej(err);

          mailOptions.html = html
          transport.sendMail(mailOptions, (error, info) => {
            if (error) {
               rej(error)
            }
         
           res(info)
          });
        });
    } )

}