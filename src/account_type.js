
  const  student=1
   const  teacher=2
   const   account=3
    const admin=4
    const principal=5
    const  parent=6
    const sup=7



export const routes = {
    home:[student,parent,teacher,account,admin,sup,principal],
    student:[teacher,parent,account,admin,sup,principal],
    studentAdmin:[admin,sup,principal],
    staff:[admin,sup,principal],
    parent:[admin,sup,principal],
    fees:[student,parent,account,admin,sup,principal],
    idcard:[admin,sup,principal],
    attendance: [student,parent,teacher,admin,sup,principal],
    result:[teacher,sup,principal],
    assignment:[student,teacher,sup],
    cbt:[student,parent,teacher,admin,sup,principal],
    result_checker:[student,parent,teacher,admin,sup,principal],
    resources:[student,teacher,admin,sup,principal],
    account_report:[account,sup,principal],
    time_table:[student,teacher,admin,sup,principal],
    performance:[sup,principal],
    smart_analysis:[account,sup,principal],
    activities:[parent,teacher,account,student,admin,sup,principal],
    settings:[sup,principal],
    hostel:[admin,sup,principal],
    transport:[admin,sup,principal],
}
module.exports.routes = routes

