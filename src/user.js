const db = require('../../models/db');
import withSession from '../../models/session'
 let qry =  new db.Db()

 withSession(function checkUser(req){
   return new Promise((resolve,reject)=>{
        let user = req.session.get('user')
        if(user){
            resolve(user)
            return
        }
        reject('no authentication')
   }
   )
})
