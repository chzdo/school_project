


import handler from '../../../src/handler';
import { initValidation, Validate } from '../../../src/validator';
const { authUser } = require('../../../src/auth')
const { hash } = require('../../../src/crypt')
const { initset } = require('../../../src/flash');
const Classes = require('../../../src/models/classes')
const Subject = require('../../../src/models/subject')
const Student = require('../../../src/models/student')
const { sendMail, Template } = require('../../../src/mails')
const Parent = require('../../../src/models/parent')
const fileUpload = require('express-fileupload');
const path = require('path')
const fs = require('fs')

const { check, validationResult, body } = require('express-validator');
import { routes } from '../../../src/account_type'
import { TrainOutlined } from '@material-ui/icons';



let { studentAdmin } = routes

let classes = new Classes()
let subject = new Subject()

let stud = new Student()
let par = new Parent()

export default handler.use(async (req, res, next) => {
    // console.log(req);
    let response = await authUser(req, studentAdmin);
    if (response.code != 1) {
        await initset(response.code, response.message, '/student/add')(req, res)
        return;
    }

    next()

}).use(fileUpload({
    //debug: true
    useTempFiles: true,
})).post('/api/student/change/class', async (req, res) => {
    try {

        const validate = [
            check('student_id').notEmpty().withMessage('Student Id must not be empty').trim().escape().
                custom(value => {
                    return stud.isExist(value).then(e => !e && Promise.reject('Id not found'))
                }),
            check('class_id').isNumeric().withMessage('id must be a number').notEmpty().withMessage('Id must not be empty').trim().escape().
                custom(value => {
                    return classes.findClassById(value).then(e => !e && Promise.reject('Id not found'))
                })

        ]

        let validating = initValidation(Validate(validate, validationResult, '/student'))

        await validating(req, res);
        let { state, ...tbody } = req.body
        let response = await stud.changeClass(tbody)
        if (response) {
            await sendMail({
                from: process.env.EMAIL_ADDRESS,
                to: stud.students().email,
                subject: 'Class Changed',
                html: '',
                url: './public/emails/change_class.html',
                info: { name: `${stud.students().surname}, ${stud.students().firstname}`, class_name: classes.class_list().name }

            })
            delete req.body.state
            await initset(1, 'Updated', '/student')(req, res)
        } else {
            await initset(0, 'Could not Update', '/student')(req, res)
        }
        res.end()
    } catch (e) {

        await initset(0, e.message, '/student')(req, res)
    }
}).post('/api/student/change/status', async (req, res) => {
    try {

        const validate = [
            check('student_id').notEmpty().withMessage('Student Id must not be empty').trim().escape().
                custom(value => {
                    return stud.isExist(value).then(e => !e && Promise.reject('Id not found'))
                }),
            check('status').isNumeric().withMessage('id must be a number').notEmpty().withMessage('Id must not be empty').trim().escape().
                custom(value => {
                    return stud.findStatusById(value).then(e => !e && Promise.reject('Id not found'))
                })

        ]

        let validating = initValidation(Validate(validate, validationResult, '/student'))

        await validating(req, res);
        let { state, student_id, ...tbody } = req.body
        tbody.id = student_id
        let response = await stud.changeStatus(tbody)
        if (response) {
            await sendMail({
                from: process.env.EMAIL_ADDRESS,
                to: stud.students().email,
                subject: 'Account Status Changed',
                html: '',
                url: './public/emails/account_status.html',
                info: { name: `${stud.students().surname}, ${stud.students().firstname}`, account_status: stud.account_status.state }

            })
            delete req.body.state
            await initset(1, 'Updated', '/student')(req, res)
        } else {
            await initset(0, 'Could not Update', '/student')(req, res)
        }
        res.end()
    } catch (e) {

        await initset(0, e.message, '/student')(req, res)
    }
}).post('/api/student/add', async (req, res) => {
    try {


        if (!req.files || Object.keys(req.files).length === 0) {
            await initset(0, "No passport selected", '/student/add')(req, res)
            return;
        }
        // console.log(req.files, req.body)

        let { avatar } = req.files;


        if ((avatar.size / 1024) > 500) {
            fs.unlinkSync(avatar.tempFilePath)
            await initset(0, `Passport size too big! Must be less than 501kb current size is ${parseInt((avatar.size / 1024))} kb`, '/student/add')(req, res)
            return;
        }

        // res.end()
        let validate = [
            check('surname').notEmpty().withMessage('Surname must not be empty').trim().escape().customSanitizer(value => SentenceCase(value)),
            check('othername').notEmpty().withMessage('Othername must not be empty').trim().escape().customSanitizer(value => SentenceCase(value)),
            check('firstname').notEmpty().withMessage('firstname must not be empty').trim().escape().customSanitizer(value => SentenceCase(value)),
            check('sex').notEmpty().withMessage('sex must not be empty').custom(isSex).withMessage('Invalid Sex').trim().customSanitizer(SentenceCase),
            check('dob').notEmpty().withMessage('date of birth must not be empty').isDate().withMessage('Invalid Date').trim().customSanitizer(SentenceCase),
            check('country').notEmpty().withMessage('country must not be empty').trim().escape().customSanitizer(SentenceCase),
            check('state').notEmpty().withMessage('state must not be empty').trim().escape().customSanitizer(SentenceCase),
            check('lga').notEmpty().withMessage('LGA must not be empty').trim().escape().customSanitizer(SentenceCase),
            check('class_id').notEmpty().withMessage('Invalid class id').trim().escape().custom(value => {
                return classes.findClassById(value).then(e => !e && Promise.reject('Id not found'))
            })

            /**  check('email').if(!check('sameasparent').exists()).notEmpty().isEmail().withMessage('Invalid email address').trim().escape(),
              /**  check('address').if(!check('sameasparent').exists()).notEmpty().isString().withMessage('Invalid Address').trim().escape(),
               **/
        ]


     

        if (!req.body['sameasparent']) {

            validate.push(check('phone').notEmpty().withMessage('You must add a phone number! or tick same as parent').isNumeric().withMessage('Phone Number must be number').trim())
            validate.push(check('email').notEmpty().withMessage('You must add an email! or tick same as parent').isEmail().withMessage('Invalid email address').trim().escape())
            validate.push(check('address').notEmpty().withMessage('You must add an address! or tick same as parent').isString().withMessage('Invalid address').trim().escape())

        }

        if (!req.body['existingparent'] || req.body.existingparent === 'false') {

            validate.push(check('par_surname').notEmpty().withMessage('parents surname must not be empty').trim().customSanitizer(value => SentenceCase(value)))
            validate.push(check('par_othername').notEmpty().withMessage('parents othername must not be empty').trim().customSanitizer(value => SentenceCase(value)))
            validate.push(check('par_firstname').notEmpty().withMessage('parents firstname must not be empty').trim().customSanitizer(value => SentenceCase(value)))
            validate.push(check('par_phone').isNumeric().withMessage('Phone Number must be number').trim().custom(value => {
                return par.findByPhone(value).then(e => e && Promise.reject('This Parent already exist with this phone:' + value))
            }))
            validate.push(check('par_email').isEmail().withMessage('Invalid email address').trim().custom(value => {
                return par.findByEmail(value).then(e => e && Promise.reject('This Parent already exist with this email:' + value))
            }))
            validate.push(check('par_address').isString().withMessage('Invalid Address').trim())
        } else {

            validate.push(check('parent_id').notEmpty().withMessage('Invalid Parent id').trim().custom(value => {
                return par.isExist(value).then(e => !e && Promise.reject('Id not found'))
            }))
        }



        let validating = initValidation(Validate(validate, validationResult, '/student/add'))

        await validating(req, res);


        let { body } = req;


        let student_number = await stud.getStudentsNumber()

        let student_id = process.env.SCHOOL_STUDENT_PREFIX + student_number

        let AvatarPath = `${process.env.IMG_PATH}${student_id}${path.extname(avatar.name)}`
        avatar.mv(AvatarPath, async (err) => {
            if (err) {
                fs.unlinkSync(avatar.tempFilePath)
                await initset(0, err, '/student/add')(req, res)
                return;
            }
        })


        let student = {
            names: {
                surname: body.surname,
                othername: body.othername,
                firstname: body.firstname,
                id: student_id,

            },
            users: {
                sex: body.sex,
                dob: body.dob,
                country: body.country,
                state: body.state,
                lga: body.lga,
                phone: body.sameasparent == 'true' ? !body['existingparent'] || body.existingparent != 'true' ? body.par_phone : par.parents().phone : body.phone,
                email: body.sameasparent == 'true' ? !body['existingparent'] || body.existingparent != 'true' ? body.par_email : par.parents().email : body.email,
                address: body.sameasparent == 'true' ? !body['existingparent'] || body.existingparent != 'true' ? body.par_address : par.parents().address : body.address,
                id: student_id,
                type_id: 1,
                avatar: process.env.DB_IMG_PATH + student_id + path.extname(avatar.name)
            },
            class: {
                class_id: body.class_id,
                student_id: student_id,
            },
            login: {
                user_id: student_id,
                password: await hash(student_id)
            }

        }
        let parents = {}
        if (!body['existingparent'] || body.existingparent === 'false') {
            let parents_number = await par.getParentsNumber()


            let parents_id = process.env.SCHOOL_PARENT_PREFIX + parents_number

            parents = {
                names: {
                    surname: body.par_surname,
                    othername: body.par_othername,
                    firstname: body.par_firstname,
                    id: parents_id,

                },
                users: {
                    id: parents_id,
                    sex: body.par_sex,
                    dob: null,
                    country: null,
                    state: null,
                    lga: null,
                    phone: body.par_phone,
                    email: body.par_email,
                    address: body.par_address,
                    type_id: 6,
                    avatar: null
                },

                login: {
                    user_id: parents_id,
                    password: await hash(parents_id)
                }
               
            }
        }


        let final = {}
        let userToAdd = body.existingparent == 'true' ? [student.users] : [student.users, parents.users]

        final['users'] = userToAdd;





        let namesToAdd = body.existingparent == 'true' ? [student.names] : [student.names, parents.names]
        let studToAdd = body.existingparent == 'true' ? [{ parent_id: body.parent_id, student_id: student.users.id }] : [{ student_id: student.names.id, parent_id: parents.names.id }]

        final['names'] = namesToAdd;



        final['class'] = [student.class]
        final['parent'] = studToAdd

        let loginToAdd = body.existingparent  == 'true' ? [student.login] : [student.login, parents.login]
        final['login'] = loginToAdd
        let response_user = await stud.createStudent(final)
        let emailSend = []

        if (response_user == true) {
            final.users.forEach((e,i) => {
                emailSend.push(sendMail({
                    from: process.env.EMAIL_ADDRESS,
                    to: `${e.email}`,
                    subject: 'Account Created',
                    html: '',
                    url: './public/emails/account_created.html',
                    info: { name: `${final.names[i].surname}, ${final.names[i].firstname}`, id: e.id }

                })
                )
            }
            )
            Promise.all(emailSend).then((result) => {
                console.log('all mail completed');
            }).catch((error) => {
                console.log(error);
            })
            await initset(1, "Saved", '/student/add')(req, res)
        } else {
            await initset(1, "Someting went wrong", '/student/add')(req, res)
        }
        return;


    } catch (e) {

        await initset(0, e.message, '/student/add')(req, res)
    }
}).post('/api/student/edit', async (req, res) => {
    try {
                
               
        var      id =   Buffer.from(req.body.student_id).toString('base64')
        // res.end()
        let validate = [
            check('student_id').notEmpty().withMessage('Invalid student id').trim().escape().custom(value => {
                return stud.isExist(value).then(e => !e && Promise.reject('Id not found'))
            }),
            check('surname').notEmpty().withMessage('Surname must not be empty').trim().escape().customSanitizer(value => SentenceCase(value)),
            check('othername').notEmpty().withMessage('Othername must not be empty').trim().escape().customSanitizer(value => SentenceCase(value)),
            check('firstname').notEmpty().withMessage('firstname must not be empty').trim().escape().customSanitizer(value => SentenceCase(value)),
            check('sex').notEmpty().withMessage('sex must not be empty').custom(isSex).withMessage('Invalid Sex').trim().customSanitizer(SentenceCase),
            check('dob').notEmpty().withMessage('date of birth must not be empty').isDate().withMessage('Invalid Date').trim().customSanitizer(SentenceCase),
            check('country').notEmpty().withMessage('country must not be empty').trim().escape().customSanitizer(SentenceCase),
            check('state').notEmpty().withMessage('state must not be empty').trim().escape().customSanitizer(SentenceCase),
            check('lga').notEmpty().withMessage('LGA must not be empty').trim(),
            check('class_id').notEmpty().withMessage('Invalid class id').trim().escape().custom(value => {
                return classes.findClassById(value).then(e => !e && Promise.reject('Id not found'))
            })

      
        ]

        if (req.body.sameasparent !== 'true') {

            validate.push(check('phone').notEmpty().withMessage('You must add a phone number! or tick same as parent').isNumeric().withMessage('Phone Number must be number').trim())
            validate.push(check('email').notEmpty().withMessage('You must add an email! or tick same as parent').isEmail().withMessage('Invalid email address').trim().escape())
            validate.push(check('address').notEmpty().withMessage('You must add an address! or tick same as parent').isString().withMessage('Invalid address').trim().escape())

        }

        if (!req.body.existingparent || req.body.existingparent === 'false') {

            validate.push(check('par_surname').notEmpty().withMessage('parents surname must not be empty').trim().customSanitizer(value => SentenceCase(value)))
            validate.push(check('par_othername').notEmpty().withMessage('parents othername must not be empty').trim().customSanitizer(value => SentenceCase(value)))
            validate.push(check('par_firstname').notEmpty().withMessage('parents firstname must not be empty').trim().customSanitizer(value => SentenceCase(value)))
            validate.push(check('par_phone').isNumeric().withMessage('Phone Number must be number').trim().custom(value => {
                return par.findByPhone(value).then(e => e && Promise.reject('This Parent already exist with this phone:' + value))
            }))
            validate.push(check('par_email').isEmail().withMessage('Invalid email address').trim().custom(value => {
                return par.findByEmail(value).then(e => e && Promise.reject('This Parent already exist with this email:' + value))
            }))
            validate.push(check('par_address').isString().withMessage('Invalid Address').trim())
        } else {

            validate.push(check('parent_id').notEmpty().withMessage('Invalid Parent id').trim().custom(value => {
                return par.isExist(value).then(e => !e && Promise.reject('Id not found'))
            }))
        }



        let validating = initValidation(Validate(validate, validationResult, '/student/edit/'+id))

        await validating(req, res);
        let AvatarPath;

        let { body } = req;
        if (req.files && Object.keys(req.files).length > 0) {
         
       
            let { avatar } = req.files;
    
    
            if ((avatar.size / 1024) > 500) {
                fs.unlinkSync(avatar.tempFilePath)
                await initset(0, `Passport size too big! Must be less than 501kb current size is ${parseInt((avatar.size / 1024))} kb`, '/student/add')(req, res)
                return;
            }
    
            AvatarPath = `${process.env.IMG_PATH}${body.student_id}${path.extname(avatar.name)}`
            avatar.mv(AvatarPath, async (err) => {
                if (err) {
                    fs.unlinkSync(avatar.tempFilePath)
                    await initset(0, err, '/student/edit/'+id)(req, res)
                    return;
                }
            })
        }





        let student = {
            names: {
                surname: body.surname,
                othername: body.othername,
                firstname: body.firstname,
                id: body.student_id,

            },
            users: {
                sex: body.sex,
                dob: body.dob,
                country: body.country,
                state: body.state,
                lga: body.lga,
                phone: body.sameasparent == 'true' ? !body.existingparent || body.existingparent != 'true' ? body.par_phone : par.parents().phone : body.phone,
                email: body.sameasparent == 'true' ? !body.existingparent || body.existingparent != 'true' ? body.par_email : par.parents().email : body.email,
                address: body.sameasparent == 'true' ? !body.existingparent || body.existingparent != 'true' ? body.par_address : par.parents().address : body.address,
                id: body.student_id,
                type_id: 1,
                avatar:  AvatarPath === undefined? stud.students().avatar : process.env.DB_IMG_PATH + body.student_id + path.extname(AvatarPath)
            },
            class: {
                class_id: body.class_id,
                student_id: body.student_id,
            },
         

        }
        let parents = {}
        if (!body['existingparent'] || body.existingparent === 'false') {
            let parents_number = await par.getParentsNumber()


            let parents_id = process.env.SCHOOL_PARENT_PREFIX + parents_number

            parents = {
                names: {
                    surname: body.par_surname,
                    othername: body.par_othername,
                    firstname: body.par_firstname,
                    id: parents_id,

                },
                users: {
                    id: parents_id,
                    sex: body.par_sex,
                    dob: null,
                    country: null,
                    state: null,
                    lga: null,
                    phone: body.par_phone,
                    email: body.par_email,
                    address: body.par_address,
                    type_id: 6,
                    avatar: null
                },

                login: {
                    user_id: parents_id,
                    password: await hash(parents_id)
                }
               
            }
        }


        let final = {}
      if(!body['existingparent'] || body['existingparent'] == 'false' ){

           
            final['users'] =[parents.users] 
            final['names'] = [parents.names]
            final['login'] = [parents.login]
            let response_user = await par.createParent(final)

            if(!(response_user === true)){
                await initset(0, "Someting went wrong", '/student/edit/'+id)(req, res)
            }
        } 
  


        final = {}

        final['users'] = student.users
        final['names'] = student.names
        final['class'] = student.class
        final['parent'] = body.existingparent == 'true' ? { parent_id: body.parent_id, student_id: student.users.id } :  { student_id: student.names.id, parent_id: parents.names.id }
       
 
       
        let response_user2 = await stud.updateStudent(final)

      
        let emailSend = []

        if (response_user2 == true) {
            if (!body['existingparent']){
           
                emailSend.push(sendMail({
                    from: process.env.EMAIL_ADDRESS,
                    to: `${parents.users.email}`,
                    subject: 'Account Created',
                    html: '',
                    url: './public/emails/account_created.html',
                    info: { name: `${parents.names.surname}, ${parents.names.firstname}`, id: parents.users.id }

                })
                )
         
        }
            await initset(1, "Saved", '/student/edit/'+id)(req, res)
        } else {
            await initset(0, "Someting went wrong", '/student/edit/'+id)(req, res)
        }
        return;


    } catch (e) {

        await initset(0, e.message, '/student/edit/'+id)(req, res)
    }
})




function SentenceCase(string) {

    var a = string[0].toUpperCase() + string.split('').splice(1).join("").toLowerCase()
    return a;
}
function isSex(string) {
    return ['Male', 'Female'].includes(string)
}


export const config = {
    api: {
        externalResolver: true,

        bodyParser: false
    },
}