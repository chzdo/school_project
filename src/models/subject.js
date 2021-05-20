const { db } = require('../mongoDB')
const { tables } = require('../db')
const collection = tables.subject

class Subject {
   #subject
   #id

   constructor() {

   }

   async find(value) {
      return this.#subject = await (await db(collection)).findOne({ _id: value })
   }
   async create(value) {
      return this.#subject = await (await db(collection)).insertOne(value)
   }

   async edit(editPost) {
      let _db = await db(collection)
      return await _db.updateOne({ _id: this.#subject._id }, { "$set": { ...editPost } })
   }
   async getSubjects() {
      return await (await db(collection)).find().toArray()

   }
}


/**
async  findByName(name){
   var q = `select * from ${this.tables.subject} 
    where subject = ?
    `
    let result =  await  this.get(q,[name])
    if(result.length == 0){
         return false;
       }
    [this.#subject] = result;
    
    return true
     }



async  isExist(id){
 
let result =  await  this.get(`select * from ${this.tables.subject} where id = ? `,[id])
if(result.length == 0){
   return false;
 }
[this.#subject] = result;
this.#id = id
return true
}

 
async  getSubjects(){
     let _d = await db(collection)

    }
    async  findByName(name){
       var q = `select * from ${this.tables.subject} 
        where subject = ?
        `
        let result =  await  this.get(q,[name])
        if(result.length == 0){
             return false;
           }
        [this.#subject] = result;
        
        return true
         }

    async  delete(){
       var q = `delete  from ${this.tables.subject} 
        where id = ?
        `
        let result =  await  this.get(q,[this.#id])
        if(result.affectedRows == 0){
             return false;
           }
        this.response = result;
        
        return true
         }

         async  edit(body){
         
           let result =  await  this.update(this.tables.subject,body,{id:body.id},[])
           if(result.affectedRows == 0){
                return false;
              }
           this.response = result;
           
           return true
            }

            async  add(body){
       
             let result =  await  this.insert(this.tables.subject,body)
             if(result.affectedRows == 0){
                  return false;
                }
             this.response = result;
             
             return true
              }

    subjects(){
          return this.#subject
    }

  
}
**/
module.exports = Subject