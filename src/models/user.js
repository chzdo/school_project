const Login = require("./login");
const collection = "users"
var {db} = require('../mongoDB')
var {user} = require('../schema');
const { ObjectId } = require("bson");

class User  extends Login  {
 

   constructor() {

      super()
   }





   async   confirmUser(){
      var db_ = await db("users")  
      let {_id, ...rest} = this.logger
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
                $and:[{"_id" : _id}]
            }
         }
,
            {
               $project:{
                 
                  account_type: 0,
                
                  account_status: 0


               }
            }
          
        
       ]).toArray()
      if(u.length == 0)   {
         this.message = "User details not found"
          return false;
      }
      [u] = u
    if(u.status[0].canLogin){
       return {...user, ...u}
    }
    this.message = "You do not have access!"
    return false

 }
/**

   async add(body) {

      let result = await this.insert(this.tables.user, body)
   
      if (result.affectedRows == 0) {
         return false;
      }
      this.response = result;
  
      return true
   }
   async createLogin(body) {

      let result = await this.insert(this.tables.login, body)
      if (result.affectedRows == 0) {
         return false;
      }
      this.response = result;

      return true
   }
   async addNames(body) {

      let result = await this.insert(this.tables.names, body)
      if (result.affectedRows == 0) {
         return false;
      }
      this.response = result;
      console.log(result)
      return true
   }

   async remove(id) {




      let result = await this.get(`delete from ${this.tables.user} where id = ?`, [id])
      if (result.affectedRows == 0) {
         return false;
      }
      this.response = result;

      return true
   }

   async removeNames(id) {




      let result = await this.get(`delete from ${this.tables.names} where id = ?`, [id])
      if (result.affectedRows == 0) {
         return false;
      }
      this.response = result;

      return true
   }

   async removeLogin(id) {

      let result = await this.get(`delete from ${this.tables.login} where user_id = ?`, [id])
      if (result.affectedRows == 0) {
         return false;
      }
      this.response = result;

      return true
   }


   async isExist(id) {

      let result = await this.get(`select * from ${this.tables.login} where user_id = ? `, [id])
      if (result.length == 0) {
         return false;
      }
      [this.#user] = result;
      this.#id = id
      return true
   }
 
   async verifyPassword(password) {
      let match = await this.hash_verify(password, this.#user.password);

      if (match) {
         return true
      }
      return false
   }
   async getUserInfo() {
      var q = `select * from ${this.tables.user} as user
        
       join ${this.tables.account} as acc
      
       on acc.id = user.type_id
       join ${this.tables.names} as names
       on names.id = user.id
       
       where user.id = ? `
      let result = await this.get(q, [this.#id])
      if (result.length == 0) {
         return false;
      }
      [this.#user] = result;

      return true
   }


   async getUserStates() {
      let result = await this.get(`select * from ${this.tables.account_state}`, [])
      if (result.length == 0) {
         return [];
      }
      return result;

   }

   async changeStatus(body) {
      let result = await this.update(this.tables.user, body, { id: body.id }, [])
      if (result.affectedRows == 0) {
         return false;
      }
      this.response = result;

      return true
   }





   getuser() {
      return this.#user
   }

   isActive() {

      return this.#user['status'] == 1 ? true : false
   }

   canLogin() {

      return   [1,5].includes(parseInt(this.#user['status'])) 
   }

   async login(req, res) {
      req.session.user = this.#user
      // await req.session.save()
      res.redirect('/home')
   }
   async logout(req, res) {
      await req.session.destroy('user')
      res.redirect('/')

   }
   **/
}

module.exports = User