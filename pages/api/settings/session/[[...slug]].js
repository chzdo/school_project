

import handler from '../index';
import { initValidation, Validate } from '../../../../src/validator';
import { InputGroup } from 'react-bootstrap';

const { initset } = require('../../../../src/flash');
const Session = require('../../../../src/models/session')
const { check, validationResult } = require('express-validator');

let session = new Session()

export default handler.post('/api/settings/session/delete', async (req, res) => {
    try {

        const validate = [
            check('id').isNumeric().withMessage('id must be a number').notEmpty().withMessage('Id must not be empty').trim().escape().
                custom(value => {
                    return session.isExist(value).then(e => !e && Promise.reject('Id not found'))
                })

        ]
        let validating = initValidation(Validate(validate, validationResult, '/settings/sessions'))
        let { body: { id } } = req
        await validating(req, res);

        let response = await session.delete(id)
        if (response) {
            await initset(1, 'deleted', '/settings/sessions')(req, res)
        } else {
            await initset(0, 'Could not delete', '/settings/sessions')(req, res)
        }
        res.end()
    } catch (e) {

        await initset(0, e.message, '/settings/subjects')(req, res)
    }
}).post("/api/settings/session/edit", async (req, res) => {
    try {
        const validate = [
            check('id').isNumeric().withMessage('id must be a number').notEmpty().withMessage('Id must not be empty').trim().
                custom(value => {
                    return session.isExist(value).then(e => !e && Promise.reject('Id not found'))
                }),
            check('session').notEmpty().withMessage('Subject must not be empty').trim().
                custom(value => {
                    return session.findByName(value).then(e => (e && (session.session()).id != req.body.id ) && Promise.reject('Subject Already exist'))
                }),
           

        ]

       let validating = initValidation(Validate(validate, validationResult, '/settings/sessions'))
        let { body } = req
       
       await validating(req, res);
        var t_body = Object.assign({},body)
         delete t_body.state
        let response = await session.edit(t_body)
        if (response) {
            delete body.state
            await initset(1, 'Updated', '/settings/sessions')(req, res)
        } else {
            await initset(0, 'Could not Update', '/settings/sessions')(req, res)
        }
        res.end()
    } catch (e) {

        await initset(0, e.message, '/settings/sessions')(req, res)
    }
}).post("/api/settings/session/add", async (req, res) => {

    console.log(req.body)
    try {
        const validate = [
            check('session').notEmpty().withMessage('Session must not be empty').isString().withMessage('session should be a string').
                custom(value => {
                    return session.findByName(value).then(e => e && Promise.reject('Session Already exist'))
                }).custom(value=> new Promise((res,rej)=>  
                                {

               if((/^[0-9]{4}\/[0-9]{4}$/).test(value)){
                   res('valid')
                   return;
               }

               rej('Invalid Format: session must be like 2012/2013')
            
            
            })).trim(),
                                
 
        ]

      let validating = initValidation(Validate(validate, validationResult, '/settings/sessions'))
        let { body } = req
      
        await validating(req, res);
 
      var t_body = Object.assign({},body)
      delete t_body.state
      

      //  res.end();
    
        let response = await session.add([t_body])
    
       
        if (response) {
            delete body.state
            await initset(1, 'Saved', '/settings/sessions')(req, res)
        } else {
            await initset(0, 'Could not Save', '/settings/sessions')(req, res)
        }
        res.end()
    } catch (e) {

        await initset(0, e.message, '/settings/sessions')(req, res)
    }
}).post("/api/settings/session/current", async (req, res) => {
   

  
  
    try {
        const validate = [
            check('session_id').notEmpty().withMessage('Session must not be empty').isNumeric().withMessage('session should be anumber').
                custom(value => {
                    return session.isExist(value).then(e => !e && Promise.reject('Session doesnt not exist'))
                }).trim(),
                check('term_id').notEmpty().withMessage('term must not be empty').isNumeric().withMessage('term should be anumber').
                custom(value => {
                       return   new Promise((res,rej)=>{
                           console.log(value)
                              if([1,2,3].includes(parseInt(value))){
                                  res('valid')
                              }else{
                                  rej('Invalid term')
                              }
                          })
                }).trim()
                                
 
        ]

      let validating = initValidation(Validate(validate, validationResult, '/settings/sessions'))
        let { body } = req
      
        await validating(req, res);
 
      var {state , ...t_body} =    body            // Object.assign({},body)
    
 
        let response = await session.addCurrent([t_body])
    
       
        if (response) {
            delete body.state
            await initset(1, 'Saved', '/settings/sessions')(req, res)
        } else {
            await initset(0, 'Could not Save', '/settings/sessions')(req, res)
        }
        res.end()
    } catch (e) {

        await initset(0, e.message, '/settings/sessions')(req, res)
    }
})



/*post('/delete',async (req, res) => {
  try {





  } catch (e) {

    await initset(0, e.message, '/')(req, res)
  }

})**/
