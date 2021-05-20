const Db = require('../db')

class Classes extends Db {
   #class_
   #id

   #variation_
   #v_id

   constructor() {

        super()
   }


   async findClassById(id) {

      let result = await this.get(`select cv.* , cl.name from ${this.tables.class_variation} as cv 
      join ${this.tables.class_list} as cl on cv.class_id = cl.id 
      where cv.id = ?
      
      `, [id])

      if (result.length == 0) {
         return false;
      }

      [this.#class_] = result;
      this.#id = id
      return true
   }

   async isExist(id) {

      let result = await this.get(`select * from ${this.tables.class_list}
      where id = ?
      
      `, [id])

      if (result.length == 0) {
         return false;
      }

      [this.#class_] = result;
      this.#id = id
      return true
   }


   async findClassByName(id){

      let result = await this.get(`select * from ${this.tables.class_list} where name = ? `, [id])

      if (result.length == 0) {
         return false;
      }

      [this.#class_] = result;
      this.#id = id
      return true
   }


   async findVariationById(id) {

      let result = await this.get(`select * from ${this.tables.variation} where id = ? `, [id])

      if (result.length == 0) {
         return false;
      }

      [this.#variation_] = result;
      this.#v_id = id
      return true
   }

   async getClassList() {
      var q = `select * from ${this.tables.class_list}`
      let result = await this.get(q, [])
      if (result.length == 0) {
         return false;
      }
      this.#class_ = result;

      return true
   }

   async getVariationList() {
      var q = `select * from ${this.tables.variation}`
      let result = await this.get(q, [])
      if (result.length == 0) {
         return false;
      }
      this.#variation_ = result;

      return true
   }

   async getClassVariation() {
      var q = `select * from ${this.tables.class_variation} as cv
       join ${this.tables.variation} as v on v.id = cv.variation_id 
      join ${this.tables.class_list} as cl on cl.id = cv.class_id  
      where cv.id = ?`
      let result = await this.get(q, [this.#id])
      if (result.length == 0) {
         return false;
      }
      this.#variation_ = result;

      return true
   }
   async getClassWithVariation() {
      var q = `select  cv.* , v.variation, cl.name from ${this.tables.class_variation} as cv
       join ${this.tables.variation} as v on v.id = cv.variation_id 
      join ${this.tables.class_list} as cl on cl.id = cv.class_id  
      `
      let result = await this.get(q, [])
      if (result.length == 0) {
         return false;
      }
      this.#class_ = result;

      return true
   }


   async getAllClassVariationWithSubjects() {
      var q = `select  cl.name as name, v.*, cv.id as class_id , s.id as subject_id, s.subject  from ${this.tables.class_variation} as cv   
      join ${this.tables.class_list} as cl on cl.id = cv.class_id  
      join ${this.tables.variation} as v on v.id = cv.variation_id 
      left join ${this.tables.class_subject} as cs on cs.class_id = cv.id
      left join ${this.tables.subject}  as s on  s.id = cs.subject_id
      `

    
      let result = await this.get(q, [])
 
      if (result.length == 0) {
         return false;
      }

     let b = [];


     result.forEach((e,i,array)=>{
        let key = e.name+e.variation;
        if(b[key] == null){
                b[key] = JSON.parse(JSON.stringify(e));
        }

      if(b[key]['subjects'] == null){
         b[key]['subjects']  = []
       }
       if(e.subject){
         b[key]['subjects'].push({
            "subject": e.subject,

            "subject_id": e.subject_id
         })
      }
      
       delete b[key].subject
   
       delete b[key].subject_id
     })



      this.#variation_ = Object.values(b);
     


      return true
   }

   async deleteClass() {
      var q = `delete  from ${this.tables.class_variation} 
             where id = ?
             `
      let result = await this.get(q, [this.#id])
      if (result.affectedRows == 0) {

         return false;

      }

      var q = `delete  from ${this.tables.class_subject} where class_id = ?`
      await this.get(q, [this.#id])

      this.response = result;

      return true
   }

   async deleteClassSubject(subject) {
      var q = `delete  from ${this.tables.class_subject} 
             where class_id = ? and subject_id = ?
             `
      let result = await this.get(q, [this.#id, subject])
      if (result.affectedRows == 0) {
         return false;
      }
      this.response = result;

      return true
   }

/** 

   async findByName(name) {
      var q = `select * from ${this.tables.subject} 
             where subject = ?
             `
      let result = await this.get(q, [name])
      if (result.length == 0) {
         return false;
      }
      [this.#subject] = result;

      return true
   }



   async edit(body) {

      let result = await this.update(this.tables.subject, body, { id: body.id }, [])
      if (result.affectedRows == 0) {
         return false;
      }
      this.response = result;

      return true
   }
*/
   async addClassVariation(body) {
   
      let result = await this.insert(this.tables.class_variation, body)
      if (result.affectedRows == 0) {
         return false;
      }
      this.response = result;

      return true
   }
async checkClassVariation(body){
   var q = `select max(variation_id) as variation from ${this.tables.class_variation} where class_id = ?  
   `
   
   let result = await this.get(q, [body.class_id])
   let [a] = result

   if(a['variation'] == null){
    
         return 1
   
   }

   return  parseInt(a['variation']) + 1


}
   async addClassVariation(body) {

      let result = await this.insert(this.tables.class_variation, body)
      if (result.affectedRows == 0) {
         return false;
      }
      this.response = result;

      return true
   }
   async addClassSubject(body) {

      let result = await this.insert(this.tables.class_subject, body)
      if (result.affectedRows == 0) {
         return false;
      }
      this.response = result;

      return true
   }





   class_list() {
      return this.#class_
   }
   variation() {
      return this.#variation_
   }

}

module.exports = Classes