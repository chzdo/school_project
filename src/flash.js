

import withSession from './session'

export function initset(req,res){

  return (code,message,url)=>
       new Promise(async (resolve,reject)=>{
      
        if(! typeof(code) === 'number' || message == undefined || !url.length > 0){
          return reject({message:'Incorrect values'})
         
         }
         
         req.session.flash = {code:code,'message':message,'payload':{'body':req.body,'query':req.query, 'files':req.files}}
         await req.session.commit()
         res.redirect(url)
        })
      
}
export function initget(req){
 
      
       let a  = req.session.flash
       delete    req.session.flash
       return a;
  
      
}



