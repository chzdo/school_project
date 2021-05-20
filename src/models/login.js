var {db} = require('../mongoDB')
var {login} = require('../schema')

const collection = 'login'

class Login  {
 
  

 

    constructor(){
 
        
     
    }

    async createLogin(post){
      
        if(Object.keys(post) < 2  || !(post['_id']  && post['password'])) {
          return  Promise.reject({ code:422, message:'invalid post'})
        }
        let db_ = await db(collection)
        login = {...login, ...post}
          
        return  await db_.insertOne(post)
   

    }
 
  async   log(id){
        var db_ = await db("users")  
       
         var u = await  db_.aggregate([
           {
              $lookup:{
                 from: "account_status",       // other table name
                 localField: "account_status",   // name of users table field
                 foreignField: "_id", // name of userinfo table field
                 as: "status"         // alias for userinfo table
              }
           },
           {
            $lookup:{
               from: "account_type",       // other table name
               localField: "account_type",   // name of users table field
               foreignField: "_id", // name of userinfo table field
               as: "type"         // alias for userinfo table
            }
         },
             { $match:{
                  $and:[{"_id" : id}]
              }
            
          },
         ]).toArray()
        return [u];
    }
 
    async get(){
        let db_ = await db("account_type")
            let v= []
     let a = await db_.find().toArray()

      db_ = await db("account_status")
     
let b = await db_.find().toArray()

 return [...a,...b]
          
    }
    async createAccount(post){
        let db_ = await db("account_type")
            
        return  this.logger = await db_.insertMany(post)  
          
    }

    async createUser(post){
        let db_ = await db("users")
            
        return  this.logger = await db_.insertOne(post)  
          
    }
    async createStatus(post){
        let db_ = await db("account_status")
            
        return  this.logger = await db_.insertMany(post)  
          
    }
   
    async findLogger(post){
     
        if(Object.keys(post) < 1  || !(post['_id'])) {
            return  Promise.reject({ code:422, message:'invalid post'})
        }
        let db_ = await db(collection)
            
       return  this.logger = await db_.findOne(post)  
         
        
   }



   



     

}






module.exports = Login