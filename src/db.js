
export  const tables={
  login : "login",
  user: "users",
  account:"account_type",
  status: "account_status",
  subject: "subjects",

  class_list: 'classes',
  class_variation: 'class_variations',
  variation:'variations',
  class_subject : 'class_subject',
  session: 'session',
  session_current: 'session_current',
  fees:'fees',
  student_class: "student_class",
  student_sport_house: "student_sport_house",
  student_hostel: "student_hostel",
  account_state:"account_state",
  student_parent: 'guardian_student',





  student_result: "student_result",
  student_result: "student_result",
  student_access_social : "student_social",
  student_access_work : "student_work",
  student_fees : 'student_fees',
  fees_type :'fees_type',
  student_status: 'student_status',
  staff_status:'staff_status',

  parent_state: 'parent_state',
  teacher_subject: 'teacher_subject',
  teacher_class: 'teacher_class',
  class_option: 'class_option',
  session: 'session',
  term: 'term',
  active_term_session: 'active_term_session',
  assignment:'assignment',
  student_attendance: 'student_attendance',
  staff_attendance:'staff_attendance'

}


/**

 class Db{
  con;
  tables={
    login : "login",
    user: "users",
    names: "names",
    account:"account_type",
    subject: "subjects",
    class_list: 'classes',
    class_variation: 'class_variations',
    variation:'variations',
    class_subject : 'class_subject',
    session: 'session',
    session_current: 'session_current',
    fees:'fees',
    student_class: "student_class",
    student_sport_house: "student_sport_house",
    student_hostel: "student_hostel",
    account_state:"account_state",
    student_parent: 'guardian_student',





    student_result: "student_result",
    student_result: "student_result",
    student_access_social : "student_social",
    student_access_work : "student_work",
    student_fees : 'student_fees',
    fees_type :'fees_type',
    student_status: 'student_status',
    staff_status:'staff_status',
  
    parent_state: 'parent_state',
    teacher_subject: 'teacher_subject',
    teacher_class: 'teacher_class',
    class_option: 'class_option',
    session: 'session',
    term: 'term',
    active_term_session: 'active_term_session',
    assignment:'assignment',
    student_attendance: 'student_attendance',
    staff_attendance:'staff_attendance'

}
 async connect(){
    this.con = mysql.createPool({
      connectionLimit : 100,
        host: "localhost",
        user: "root",
        password: "",
        database:'school_system'
      });

 
    
  }
    constructor(){
        
          this.connect()
     }
   
    async  get(query,params){
    return new Promise((resolve,reject)=>{
        this.con.query(query,params,(err,rows,fields)=>{
              if(err){
                  reject(err)
              }
           resolve(rows)
         })
    })
 

  

     }


     async  delete(query,params){
      return new Promise((resolve,reject)=>{
          this.con.query(query,params,(err,rows,fields)=>{
                if(err){
                    reject(err)
                }
             resolve(rows)
           })
      })
   
  
    
  
       }


getSQL(table,params){
  let col = Object.keys(params[0])
  let values = params.map(obj=>col.map(k=>obj[k]))
  col = "(" + col.join() + ")"
 return  [`insert into ${table} ${col}  values ?`, values];

}


     async  insert(table,params){

        return new Promise((resolve,reject)=>{
          let col = Object.keys(params[0])
          let values = params.map(obj=>col.map(k=>obj[k]))
          col = "(" + col.join() + ")"
          let a =  `insert into ${table} ${col}  values ?`;
   
     /**var  b = ' '
          Object.keys(params).forEach((e,idx,array)=>{
              if(idx === array.length - 1){
                b += e + '= ? '
              }else{
              b += e + '= ? , '
              }
          })
      
          
            this.con.query(a,[values],(err,rows,fields)=>{
                  if(err){
                      this.con.rollback()
                      reject(err)
                  }
               resolve(rows)
               
             })
        })
    }




getSQLUpdate(table,params,condition, connectives){
    
  let a =  "update "+table + " set";
  var  b = ' '
      Object.keys(params).forEach((e,idx,array)=>{
          if(idx === array.length - 1){
            b += e + '= ? '
          }else{
          b += e + '= ? , '
          }
      })
      
      var  c = ' where '
      
      Object.keys(condition).forEach((e,idx,array)=>{

          if(idx === array.length - 1){
            c += e + '= ? '
          }else{
          c += e + '= ? '.connectives[idx]
          }
      })
      return [a+b+c,[...Object.values(params),...Object.values(condition)]]
}


    async  update(table,params,condition, connectives){
      return new Promise((resolve,reject)=>{
        let a =  "update "+table + " set";
    var  b = ' '
        Object.keys(params).forEach((e,idx,array)=>{
            if(idx === array.length - 1){
              b += e + '= ? '
            }else{
            b += e + '= ? , '
            }
        })
        
        var  c = ' where '
        
        Object.keys(condition).forEach((e,idx,array)=>{

            if(idx === array.length - 1){
              c += e + '= ? '
            }else{
            c += e + '= ? '.connectives[idx]
            }
        })
      
          this.con.query(a + b + c,[...Object.values(params),...Object.values(condition)],(err,rows,fields)=>{
                if(err){
                    reject(err)
                }
             resolve(rows)
           })
      })
  }
 async transaction(body,context,params) {
try{
  return  await this.con.getConnection(async function(err, conn) {
      if (err) return Promise.reject(err);
     conn.beginTransaction( async function(err) {
        if (err) return Promise.reject(err);
  
        await body( params, context,  conn)
    });
  });
}catch(e){
  console.log(e)
}
}
 }
module.exports = Db
**/