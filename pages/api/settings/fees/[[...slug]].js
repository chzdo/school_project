

import handler from '../index';
import { initValidation, Validate } from '../../../../src/validator';
import { InputGroup } from 'react-bootstrap';

const { initset } = require('../../../../src/flash');
const Fees = require('../../../../src/models/fees')
const { check, validationResult } = require('express-validator');

let fees = new Fees()

export default handler.post("/api/settings/fees/status", async (req, res) => {
    try {
        const validate = [
            check('id').isNumeric().withMessage('id must be a number').notEmpty().withMessage('Id must not be empty').trim().escape().
                custom(value => {
                    return fees.isExist(value).then(e => !e && Promise.reject('Id not found'))
                }),
                check('status').notEmpty().withMessage('status must not be empty').isNumeric().withMessage('status should be a numeric').trim().escape().
                custom(value => {
                    return new Promise((res,rej)=>{
                        if([0,1].includes(parseInt(value))){
                            res('valid')
                        }else{
                            rej('Invalid Status')
                        }
                    })
                }),
                
        ]

       let validating = initValidation(Validate(validate, validationResult, '/settings/fees'))
        let { body } = req
       
       await validating(req, res);
        let {state, ...t_body} = body
        let response = await fees.updateStatus(t_body)
        if (response) {
            delete body.state
            await initset(1, 'Updated', '/settings/fees')(req, res)
        } else {
            await initset(0, 'Could not Update', '/settings/fees')(req, res)
        }
        res.end()
    } catch (e) {

        await initset(0, e.message, '/settings/fees')(req, res)
    }
}).post("/api/settings/fees/edit", async (req, res) => {
    try {
        const validate = [
            check('id').isNumeric().withMessage('id must be a number').notEmpty().withMessage('Id must not be empty').trim().escape().
                custom(value => {
                    return fees.isExist(value).then(e => !e && Promise.reject('Id not found'))
                }),
                check('name').notEmpty().withMessage('payment name must not be empty').isString().withMessage('payment name should be a string').trim().escape().
                custom(value => {
                    return fees.findByName(value).then(e => e && Promise.reject('Payment already exist'))
                }),
                check('amount').notEmpty().withMessage('amount  must not be empty').isNumeric().withMessage('amount should be numeric').trim().escape()
                ,check('merchant_id').notEmpty().withMessage('Merchant ID  must not be empty').isNumeric().withMessage('merchant ID should be numeric').trim().escape()
                ,check('api_key').notEmpty().withMessage('API Key  must not be empty').isNumeric().withMessage('API Key should be numeric').trim().escape()
                ,check('service_id').notEmpty().withMessage('service ID  must not be empty').isNumeric().withMessage('service ID should be numeric').trim().escape()
     
        ]

       let validating = initValidation(Validate(validate, validationResult, '/settings/fees'))
        let { body } = req
       
       await validating(req, res);
        let {state, ...t_body} = body
        let response = await fees.edit(t_body)
        if (response) {
            delete body.state
            await initset(1, 'Updated', '/settings/fees')(req, res)
        } else {
            await initset(0, 'Could not Update', '/settings/fees')(req, res)
        }
        res.end()
    } catch (e) {

        await initset(0, e.message, '/settings/fees')(req, res)
    }
}).post("/api/settings/fees/add", async (req, res) => {

    
    try {
        const validate = [
            check('name').notEmpty().withMessage('payment name must not be empty').isString().withMessage('payment name should be a string').trim().escape().
                custom(value => {
                    return fees.findByName(value).then(e => e && Promise.reject('Payment already exist'))
                }),
                check('amount').notEmpty().withMessage('amount  must not be empty').isNumeric().withMessage('amount should be numeric').trim().escape()
                ,check('merchant_id').notEmpty().withMessage('Merchant ID  must not be empty').isNumeric().withMessage('merchant ID should be numeric').trim().escape()
                ,check('api_key').notEmpty().withMessage('API Key  must not be empty').isNumeric().withMessage('API Key should be numeric').trim().escape()
                ,check('service_id').notEmpty().withMessage('service ID  must not be empty').isNumeric().withMessage('service ID should be numeric').trim().escape()
     
 
        ]

      let validating = initValidation(Validate(validate, validationResult, '/settings/fees'))
        let { body } = req
      
        await validating(req, res);
   

   let {state, ...t_body} = body
      

      //  res.end();
    
        let response = await fees.add([t_body])
   
        if (response) {
            delete body.state
            await initset(1, 'Saved', '/settings/fees')(req, res)
        } else {
            await initset(0, 'Could not Save', '/settings/fees')(req, res)
        }
        res.end()
    } catch (e) {

        await initset(0, e.message, '/settings/fees')(req, res)
    }
})



/*post('/delete',async (req, res) => {
  try {





  } catch (e) {

    await initset(0, e.message, '/')(req, res)
  }

})**/
