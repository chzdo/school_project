const User = require('./user')

class Parent extends User {
   #students
   #parents
   #id

   constructor() {

      super()
   }
   async isExist(id) {

      let result = await this.get(`select * from ${this.tables.user} as u join
   ${this.tables.names} as n on n.id = u.id 
   join ${this.tables.account} as acc
      
   on acc.id = u.type_id and acc.code = 2
   join
   ${this.tables.student_parent} as sp on sp.parent_id = u.id
   where u.id = ? `, [id])
      if (result.length == 0) {
         return false;
      }
      [this.#parents] = result;
      this.#id = id
      return true
   }


   async getParents() {
      var q = `select distinct concat(names.surname,', ', names.firstname, ' ', names.othername) as name, accs.state, user.phone, user.email, user.id  from ${this.tables.user} as user
        
       join ${this.tables.account} as acc
      
       on acc.id = user.type_id and acc.type = 'Parents'

         join ${this.tables.names} as names
       on names.id = user.id

       join ${this.tables.account_state} as accs
       on accs.id = user.status

       join ${this.tables.student_parent} as sp
       on sp.parent_id = user.id


   

    

      `
      let result = await this.get(q, [])

      if (result.length == 0) {
         return false;
      }
      this.#parents = result;

      return true
   }


   async getParentsNumber() {
      var q = `select  distinct user.id  from ${this.tables.user} as user
             
            join ${this.tables.account} as acc
           
            on acc.id = user.type_id and acc.type = 'Parents'
     
              join ${this.tables.names} as names
            on names.id = user.id
     
            join ${this.tables.account_state} as accs
            on accs.id = user.status
     
            join ${this.tables.student_parent} as sp
            on sp.parent_id= user.id
     
     
        
     
         
     
           `
      let result = await this.get(q, [])

      

      let count = parseInt(result.length) + 1

      switch (count.toString().length) {
         case 1: return "0000" + count; break;
         case 2: return "000" + count; break;
         case 3: return "00" + count; break;
         case 4: return "0" + count; break;
         case 5: return count;
      }
   }
   async findStatusById(id) {
      let result = await this.get(`select * from ${this.tables.account_state} where id = ? and type < 2`, [id])
      if (result.length == 0) {
         return false;
      }
      this.response = result;

      return true
   }
   async findByPhone(phone) {
      let result = await this.get(`select * from ${this.tables.user} where phone = ? and type_id =  6`, [phone])
      if (result.length == 0) {
         return false;
      }
      this.response = result;

      return true
   }

   async findByEmail(email) {
      let result = await this.get(`select * from ${this.tables.user} where email = ? and type_id =  6`, [email])
      if (result.length == 0) {
         return false;
      }
      this.response = result;

      return true
   }


   async addStudent(body) {

      let result = await this.insert(this.tables.student_parent, body)
      if (result.affectedRows == 0) {
         return false;
      }
      this.response = result;
    
      return true
   }

   async removeStudent(pid, sid) {
      let result = await this.delete(`delete from ${this.tables.student_parent} where student_id = ? and parent_id = ? `, [pid, sid])
      if (result.affectedRows == 0) {
         return false;
      }
      this.response = result;

      return true
   }
   async create(body, context, conn) {
    
      try {
         
         let users = context.getSQL(context.tables.user, body.users)

         return new Promise((resolve, reject) => {
            conn.query(users[0], [users[1]], function (err, result) {
               if (err) {
                  console.log(err, result)
                  return conn.rollback(function () {
                     return reject(err.sqlMessage)
                  })

               }





               let names = context.getSQL(context.tables.names, body.names)
               conn.query(names[0], [names[1]], function (err, result) {
                  if (err) {
                     return conn.rollback(function () {
                        return Promise.reject(err.sqlMessage)
                     })

                  }




                        let login = context.getSQL(context.tables.login, body.login)

                        conn.query(login[0], [login[1]], function (err, result) {
                           if (err) {
                              return conn.rollback(function () {
                                 return Promise.reject(err.sqlMessage)
                              })

                           }
                           conn.commit(function (err) {
                              if (err) {
                                 conn.rollback(function () {
                                    throw err;
                                 });
                              }
                             
                              conn.release();
                              resolve('Transaction Complete.')


                           })
                        })

                
                  })
               })
            })
         } catch (e ) {
            console.log(e)
         }
      }

      async createParent(body) {
         try {
            await this.transaction(this.create, this, body)
            return true;
         } catch (e) {
            return e
         }

      }



   parents() {
      return this.#parents;
   }
}

module.exports = Parent