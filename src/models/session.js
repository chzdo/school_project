const Db = require('../db')

class Session extends Db {
   #session
   #id

   constructor() {

      super()
   }
   async isExist(id) {

      let result = await this.get(`select * from ${this.tables.session} where id = ? `, [id])
      if (result.length == 0) {
         return false;
      }
      [this.#session] = result;
      this.#id = id
      return true
   }


   async getSessions() {
      var q = `select * from ${this.tables.session}`
      let result = await this.get(q, [])
      if (result.length == 0) {
         return false;
      }
      this.#session = result;

      return true
   }

   async getCurrentSessions() {
      var q = `select * from ${this.tables.session_current} as sc join ${this.tables.session} as s on s.id = sc.session_id `
      let result = await this.get(q, [])
      if (result.length == 0) {
         return false;
      }
      [this.#session] = result;

      return true
   }



   async findByName(name) {
      var q = `select * from ${this.tables.session} 
             where session = ?
             `
      let result = await this.get(q, [name])
      if (result.length == 0) {
         return false;
      }
      [this.#session] = result;

      return true
   }

   async delete() {
      var q = `delete  from ${this.tables.session} 
             where id = ?
             `
      let result = await this.get(q, [this.#id])
      if (result.affectedRows == 0) {
         return false;
      }
      this.response = result;

      return true
   }

   async edit(body) {

      let result = await this.update(this.tables.session, body, { id: body.id }, [])
      if (result.affectedRows == 0) {
         return false;
      }
      this.response = result;

      return true
   }

   async add(body) {

      let result = await this.insert(this.tables.session, body)
      if (result.affectedRows == 0) {
         return false;
      }
      this.response = result;

      return true
   }

   async addCurrent(body) {

      var q = `delete from  ${this.tables.session_current} `

      let  result = await this.get(q, [])
       let response  = await this.insert(this.tables.session_current, body)
      if (response.affectedRows == 0) {
         return false;
      }
      this.response = response;

      return true
   }

   session() {
      return this.#session
   }


}

module.exports = Session