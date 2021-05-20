import { ObjectId, ObjectID } from 'bson';

const Login = require('../../src/models/login')
const {hash} = require('../../src/crypt')

var mongoClient = require('mongodb').MongoClient


url= "mongodb://localhost/27017"


var client = new mongoClient(url);

export default async   function main(req,res){
  try{

   await client.connect();
  
   
  let a=     await   client.db('school_system')
  //.dropCollection('users')
 
  


 let login = new Login()
    /** let h_password = await hash("user_dev123")
 let resp = await  login.createLogin({_id:"user_dev123",password:h_password})
res.send(resp)

status "609a4d69753e800da0478f88"
acc = "609a4c45753e800da0478f7d"
**/
  let r =await login.log("user_dev11")
res.send(r)
  }catch(e){
    console.log(e)
    res.send(e)
  }
}






/**
 * 
 * let c = a.createCollection('users',{
    validator:{
      $jsonSchema: {
        bsonType: "object",
        required:["firstname","surname","email","phone","address","sex", "account_type", "account_status"],
        properties:{
            firstname:{
              bsonType :'string',
              description:'Required and must be a string'
            },
            othername:{
              bsonType :'string',
              description:' must be a string'
            },
            surname:{
              bsonType :'string',
              description:'Required and must be a string'
            },
             sex:{
              enum :['Male','Female'],
              description:'Required and must be either be Male or Female'
            },
            avatar:{
              bsonType :'string',
              description:'Required and must be a string'
            },
            account_type:{
              bsonType :'string',
              description:'Required and must be a string'
            },
            account_status:{
              bsonType :'string',
              description:'Required and must be a string'
            },
            address:{
              bsonType :'string',
              description:'Required and must be a string'
            },
            email:{
              bsonType :'string',
              description:'Required and must be a string'
            },
            dob:{
              bsonType :'date',
              description:'Required and must be a string'
            },
        }
      }
    }
  })
 */