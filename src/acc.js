var {db} = require('./mongoDB')
  var collection = 'account_type'


   exports.routes = async ()=>{
         let _d    =  await db(collection)

        
        var type = {}
        let t =  await (await _d.find().toArray()).forEach(e=>{
            type[e.type] = e._id.toString()
        })

     

         return {
            home:[type.Student,type.Parent,type.Teacher,type.Accountant,type.Admin,type.Super_Admin,type.Principal],
            student:[type.Teacher,type.Parent,type.Accountant,type.Admin,type.Super_Admin,type.Principal],
            studentAdmin:[type.Admin,type.Super_Admin,type.Principal],
            staff:[type.Admin,type.Super_Admin,type.Principal],
            parent:[type.Admin,type.Super_Admin,type.Principal],
            fees:[type.Student,type.Parent,type.Accountant,type.Admin,type.Super_Admin,type.Principal],
            idcard:[type.Admin,type.Super_Admin,type.Principal],
            attendance: [type.Student,type.Parent,type.Teacher,type.Admin,type.Super_Admin,type.Principal],
            result:[type.Teacher,type.Super_Admin,type.Principal],
            assignment:[type.Student,type.Teacher,type.Super_Admin],
            cbt:[type.Student,type.Parent,type.Teacher,type.Admin,type.Super_Admin,type.Principal],
            result_checker:[type.Student,type.Parent,type.Teacher,type.Admin,type.Super_Admin,type.Principal],
            resources:[type.Student,type.Teacher,type.Admin,type.Super_Admin,type.Principal],
            account_report:[type.Accountant,type.Super_Admin,type.Principal],
            time_table:[type.Student,type.Teacher,type.Admin,type.Super_Admin,type.Principal],
            performance:[type.Super_Admin,type.Principal],
            smart_analysis:[type.Accountant,type.Super_Admin,type.Principal],
            activities:[type.Parent,type.Teacher,type.Accountant,type.Student,type.Admin,type.Super_Admin,type.Principal],
            settings:[type.Super_Admin,type.Principal],
            hostel:[type.Admin,type.Super_Admin,type.Principal],
            transport:[type.Admin,type.Super_Admin,type.Principal],
        }
        

   }