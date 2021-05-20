

import handler from '../index';
import { initValidation, Validate } from '../../../../src/validator';

const { initset } = require('../../../../src/flash');
const Classes = require('../../../../src/models/classes')
const Subject = require('../../../../src/models/subject')
const { check, validationResult } = require('express-validator');

let classes = new Classes()
let subject = new Subject()
export default handler.post('/api/settings/classes/delete', async (req, res) => {
    try {

        const validate = [
            check('id').isNumeric().withMessage('id must be a number').notEmpty().withMessage('Id must not be empty').trim().escape().
                custom(value => {
                    return classes.findClassById(value).then(e => !e && Promise.reject('Id not found'))
                })

        ]
        let validating = initValidation(Validate(validate, validationResult, '/settings/classes'))
        let { body: { id } } = req
        await validating(req, res);

        let response = await classes.deleteClass(id)
        if (response) {
            await initset(1, 'deleted', '/settings/classes')(req, res)
        } else {
            await initset(0, 'Could not delete', '/settings/classes')(req, res)
        }
        res.end()
    } catch (e) {

        await initset(0, e.message, '/settings/classes')(req, res)
    }
}).post('/api/settings/classes/subject/delete', async (req, res) => {
    try {
      
        const validate = [
            check('class_id').isNumeric().withMessage('class id must be a number').notEmpty().withMessage('class Id must not be empty').trim().escape().
                custom(value => {
                    return classes.findClassById(value).then(e => !e && Promise.reject('class Id not found'))
                }),
                check('subject_id').isNumeric().withMessage('Subject id must be a number').notEmpty().withMessage('Subject Id must not be empty').trim().escape().
                custom(value => {
                    return subject.isExist(value).then(e => !e && Promise.reject(' Subject Id not found'))
                })

        ]
        let validating = initValidation(Validate(validate, validationResult, '/settings/classes'))
        let {body} = req
        await validating(req, res);

        let response = await classes.deleteClassSubject(body.subject_id)
        if (response) {
            await initset(1, 'deleted', '/settings/classes')(req, res)
        } else {
            await initset(0, 'Could not delete', '/settings/classes')(req, res)
        }
        res.end()
    } catch (e) {

        await initset(0, e.message, '/settings/classes')(req, res)
    }
}).post("/api/settings/classes/subject/add", async (req, res) => {
    try {

     
        const validate = [
            check('class_subject').notEmpty().withMessage('Id must not be empty').
                custom(value => {
                    console.log(value,typeof(JSON.parse(value)))
                  return  new Promise ((res,rej)=>{if(!(typeof(JSON.parse(value))==='object')) { rej('Invalid input type')}else{res('valid')}
                
                
                })
                   
                })
      

        ]

       let validating = initValidation(Validate(validate, validationResult, '/settings/classes'))
        let { body } = req
       
       await validating(req, res);
        var t_body = Object.assign({},body)
         delete t_body.state
        let response = await classes.addClassSubject(JSON.parse(t_body.class_subject))
        if (response) {
            delete body.state
            await initset(1, 'Updated', '/settings/classes')(req, res)
        } else {
            await initset(0, 'Could not Update', '/settings/classes')(req, res)
        }
        res.end()
    } catch (e) {

        await initset(0, e.message, '/settings/classes')(req, res)
    }
}).post("/api/settings/classes/add", async (req, res) => {



    try {
        const validate = [
            check('class_id').notEmpty().withMessage('Class must not be empty').isNumeric().withMessage('Class ID should be Numeric').trim().escape().
                custom(value => {
                    return classes.isExist(value).then(e => !e && Promise.reject('Class does not exist'))
                })

        ]

      let validating = initValidation(Validate(validate, validationResult, '/settings/classes'))
        let { body } = req
     
        await validating(req, res);

           let count = await classes.checkClassVariation(body)
        
           if(count > 26){
            await initset(0, 'Z is the last variation for classes', '/settings/classes')(req, res)
             }


             body.variation_id = count;
      var t_body = Object.assign({},body)
      delete t_body.state
      

        let response = await classes.addClassVariation([t_body])
        if (response) {
            delete body.state
            await initset(1, 'Saved', '/settings/classes')(req, res)
        } else {
            await initset(0, 'Could not Save', '/settings/classes')(req, res)
        }
        res.end()
    } catch (e) {

        await initset(0, e.message, '/settings/classes')(req, res)
    }
})



