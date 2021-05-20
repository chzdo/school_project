const bcrypt = require('bcrypt');
const saltRounds = 10;





function hash(pass){
    return new Promise((resolve,reject)=>{

        bcrypt.hash(pass, saltRounds, function(err, hash) {
            if(err){

            reject(err)
             return
            }
            resolve(hash)
        });
    })
}
function verify(pass,hash){
  
    return new Promise((resolve,reject)=>{

        bcrypt.compare(pass, hash, function(err, result) {
            // result == true
        
            if(err){

            reject(err)
             return
            }
            resolve(result)
        });
    })
}
module.exports.hash = hash
module.exports.verify = verify