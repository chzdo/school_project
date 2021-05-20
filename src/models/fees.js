const Db = require('../db')

 class Fees extends Db{
#fees
#id

     constructor(){
        
         super()
     }
  async  isExist(id){
 
   let result =  await  this.get(`select * from ${this.tables.fees} where id = ? `,[id])
   if(result.length == 0){
        return false;
      }
   [this.#fees] = result;
   this.#id = id
   return true
    }

 
    async  getFees(){
       var q = `select * from ${this.tables.fees} 
        
        `
        let result =  await  this.get(q,[])
        if(result.length == 0){
             return false;
           }
        this.#fees = result;
        
        return true
         }

         async  findByName(name){
            var q = `select * from ${this.tables.fees} 
             where name = ?
             `
             let result =  await  this.get(q,[name])
             if(result.length == 0){
                  return false;
                }
             [this.#fees] = result;
             
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
            
                let result =  await  this.update(this.tables.fees,body,{id:body.id},[])
                if(result.affectedRows == 0){
                     return false;
                   }
                this.response = result;
                
                return true
                 }
                 async  updateStatus(body){
                  console.log(body)
                  let result =  await  this.update(this.tables.fees,body,{id:body.id},[])
                  if(result.affectedRows == 0){
                       return false;
                     }
                  this.response = result;
                  
                  return true
                   }

                 async  add(body){
            
                  let result =  await  this.insert(this.tables.fees,body)
                  if(result.affectedRows == 0){
                       return false;
                     }
                  this.response = result;
                  
                  return true
                   }

         fees(){
               return this.#fees
         }

       
}

module.exports = Fees