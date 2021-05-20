

import handler from '../index';
import { initValidation, Validate } from '../../../../src/validator';
import { InputGroup } from 'react-bootstrap';
import { ObjectId } from 'bson';

const { initset } = require('../../../../src/flash');
const Subject = require('../../../../src/models/subject')
const { check, validationResult } = require('express-validator');

let subject = new Subject()

export default handler.post('/api/settings/subject/delete', async (req, res) => {
    try {

        const validate = [
            check('id').isNumeric().withMessage('id must be a number').notEmpty().withMessage('Id must not be empty').trim().escape().
                custom(value => {
                    return subject.isExist(value).then(e => !e && Promise.reject('Id not found'))
                })

        ]
        let validating = initValidation(Validate(validate, validationResult, '/settings/subjects'))
        let { body: { _id } } = req
        await validating(req, res);

        let response = await subject.delete(id)
        if (response) {
            await req.initset(1, 'deleted', '/settings/subjects')
        } else {
            await initset(0, 'Could not delete', '/settings/subjects')(req, res)
        }
        res.end()
    } catch (e) {

        await initset(0, e.message, '/settings/subjects')(req, res)
    }
}).post("/api/settings/subject/edit", async (req, res) => {
    try {
        const validate = [
            check('_id').notEmpty().withMessage('Id must not be empty').trim().escape().customSanitizer(e=>(ObjectId(e))).
                custom(value => {
                 
                    return subject.find(value).then(e => !e && Promise.reject('Id not found'))
                }),
            check('name').notEmpty().withMessage('Subject must not be empty').trim().escape(),
                
            check('category').notEmpty().withMessage('Category must not be empty').trim().escape()

        ]
 
       let validating = initValidation(Validate(validate, validationResult, '/settings/subjects'))
        let { body } = req
       
       await validating(req, res);
      let {state, ...t_body} = body
         
        let response = await subject.edit(t_body)

        if (response) {
            delete body.state
            await req.initset(1, 'Updated', '/settings/subjects')
        } else {
            await req.initset(0, 'Could not Update', '/settings/subjects')
        }
        res.end()
    } catch (e) {

        await req.initset(0, e.message, '/settings/subjects')
    }
}).post("/api/settings/subject/add", async (req, res) => {

    
    try {
        const validate = [
            check('name').notEmpty().withMessage('Subject must not be empty').isString().withMessage('Subject should be a string').trim().escape(),
              
         check('category').notEmpty().withMessage('Category must not be empty').trim().escape().custom(value=>{
                return new Promise((resolve,reject)=> {
                   var a = (['Science','Art'].find((e)=> (e == value)));
                   if(!a){
                    reject('Invalid Category')
                   }
                   resolve('valid')
            })
          
        })
 
        ]

      let validating = initValidation(Validate(validate, validationResult, '/settings/subjects'))
        let { body } = req
      
        await validating(req, res);
   

     let {state, ...tbody} = body
      

      //  res.end();
    
        let response = await subject.create(tbody)
   
        if (response) {
            delete body.state
            await req.initset(1, 'Saved', '/settings/subjects')
        } else {
            await req.initset(0, 'Could not Save', '/settings/subjects')
        }
        res.end()
    } catch (e) {

        await req.initset(0, e.message, '/settings/subjects')
    }
})



/*post('/delete',async (req, res) => {
  try {





  } catch (e) {

    await initset(0, e.message, '/')(req, res)
  }

})**/
