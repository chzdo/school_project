
const User = require('./user')

class Student extends User {
   #students
   #id

   constructor() {

      super()
   }
   async isExist(id) {

      let result = await this.get(`select * from ${this.tables.user} as u join
   ${this.tables.names} as n on n.id = u.id 
   join ${this.tables.account} as acc
      
   on acc.id = u.type_id and acc.code = '1'
   join
   ${this.tables.student_class} as sc    
   where u.id = ? `, [id])
      if (result.length == 0) {
         return false;
      }
      [this.#students] = result;
      this.#id = id
      return true
   }


   async getStudents() {
      var q = `select concat(names.surname,', ', names.firstname, ' ', names.othername) as name, user.sex, user.dob, user.phone, user.email, accs.state, user.status,  user.avatar, user.id, v.variation, cl.name as class  from ${this.tables.user} as user
        
       join ${this.tables.account} as acc
      
       on acc.id = user.type_id and acc.code = '1'

         join ${this.tables.names} as names
       on names.id = user.id

       join ${this.tables.account_state} as accs
       on accs.id = user.status

       join ${this.tables.student_class} as sc
       on sc.student_id = user.id

       join ${this.tables.class_variation} as cv
       on cv.id = sc.class_id

       join ${this.tables.variation} as v
       on v.id = cv.variation_id

       join ${this.tables.class_list} as cl
       on cl.id = cv.class_id


      left join ${this.tables.student_sport_house} as ssh
       on ssh.student_id = user.id
      
      left join ${this.tables.student_hostel} as sh
       on sh.student_id = user.id

      `
      let result = await this.get(q, [])
      if (result.length == 0) {
         return false;
      }
      this.#students = result;

      return true
   }

   async getStudent(params) {

    params = Buffer.from(params, 'base64').toString()
      var q = `select user.*, names.* , sc.*, sp.*  , cl.name as class_name , v.variation 
   

    
      from ${this.tables.user} as user

     
      
  
       join ${this.tables.account} as acc
      
       on acc.id = user.type_id and acc.code = '1'

         join ${this.tables.names} as names
       on names.id = user.id

       join ${this.tables.account_state} as accs
       on accs.id = user.status

       join ${this.tables.student_class} as sc
       on sc.student_id = user.id
       join ${this.tables.class_variation} as cv
       on cv.id = sc.class_id


       join ${this.tables.class_list} as cl
       on cl.id = cv.class_id
       join ${this.tables.student_parent} as sp
       on sp.student_id = user.id

  


     join ${this.tables.variation} as v
     on v.id = cv.variation_id

  

       
     where user.id = ?

      `
      let result = await this.get(q, [params])
      if (result.length == 0) {
         return false;
      }
      [this.#students] = result;

      return true
   }







   async getStudentsNumber() {
      var q = `select count(*) as number  from ${this.tables.user} as user
             
            join ${this.tables.account} as acc
           
            on acc.id = user.type_id and acc.code = '1'
     
              join ${this.tables.names} as names
            on names.id = user.id
     
            join ${this.tables.account_state} as accs
            on accs.id = user.status
     
            join ${this.tables.student_class} as sc
            on sc.student_id = user.id
     
            join ${this.tables.class_variation} as cv
            on cv.id = sc.class_id
     
            join ${this.tables.variation} as v
            on v.id = cv.variation_id
     
            join ${this.tables.class_list} as cl
            on cl.id = cv.class_id
     
     
     
           `
      let result = await this.get(q, [])

      let [number] = result;

      let count = parseInt(number['number']) + 1

      switch (count.toString().length) {
         case 1: return "0000" + count; break;
         case 2: return "000" + count; break;
         case 3: return "00" + count; break;
         case 4: return "0" + count; break;
         case 5: return count;
      }
   }

   async changeClass(body) {
      let result = await this.update(this.tables.student_class, body, { student_id: body.student_id }, [])
      if (result.affectedRows == 0) {
         return false;
      }
      this.response = result;

      return true
   }
   async addClass(body) {
      let result = await this.insert(this.tables.student_class, body)
      if (result.affectedRows == 0) {
         return false;
      }
      this.response = result;

      return true
   }
   async removeClass(id) {
      let result = await this.delete(`delete from ${this.tables.student_class} where student_id = ? `, [id])
      if (result.affectedRows == 0) {
         return false;
      }
      this.response = result;

      return true
   }
   async findStatusById(id) {
      let result = await this.get(`select * from ${this.tables.account_state} where id = ? and type < 2`, [id])
      if (result.length == 0) {
         return false;
      }
      [this.account_status] = result;

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



              
                  let classes = context.getSQL(context.tables.student_class, body.class)
                  conn.query(classes[0], [classes[1]], function (err, result) {
                     if (err) {
                        return conn.rollback(function () {
                           return Promise.reject(err.sqlMessage)
                        })

                     }

                     let parent = context.getSQL(context.tables.student_parent, body.parent)

                     conn.query(parent[0], [parent[1]], function (err, result) {
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
               })
            })
         } catch (e ) {
            console.log(e)
         }
      }


      async edit(body, context, conn) {
        
         try {
               
            let users = context.getSQLUpdate(context.tables.user, body.users,{id:body.users.id},[])
               
              
            return new Promise((resolve, reject) => {
               conn.query(users[0], users[1], function (err, result) {
                  if (err) {
                     console.log(err, result)
                     return conn.rollback(function () {
                        return reject(err.sqlMessage)
                     })
   
                  }
               
   
                  let names = context.getSQLUpdate(context.tables.names, body.names,{id:body.users.id},[] )

               
                  conn.query(names[0], names[1], function (err, result) {
                     if (err) {
                        return conn.rollback(function () {
                           return Promise.reject(err.sqlMessage)
                        })
   
                     }
   
                
   
                 
                     let classes = context.getSQLUpdate(context.tables.student_class, body.class,{student_id:body.class.student_id},[])
                     
                     conn.query(classes[0], classes[1], function (err, result) {
                        if (err) {
                           return conn.rollback(function () {
                              return Promise.reject(err.sqlMessage)
                           })
   
                        }
                      
                        let parent = context.getSQLUpdate(context.tables.student_parent, body.parent, {student_id: body.parent.student_id},[])
                        
                        conn.query(parent[0], parent[1], function (err, result) {
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
               })
            } catch (e ) {
               console.log(e)
            }
         }
   

   async createStudent(body) {
         try {
            await this.transaction(this.create, this, body)
            return true;
         } catch (e) {
            return e
         }

      }

      async updateStudent(body) {
         try {
            await this.transaction(this.edit, this, body)
            return true;
         } catch (e) {
            return e
         }

      }

  
      

      students() {
         return this.#students;
      }
   }

module.exports = Student