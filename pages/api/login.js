


import { verify } from '../../src/crypt';
import handler from '../../src/handler';
import { initValidation, Validate } from '../../src/validator';
const { check, validationResult , body} = require('express-validator');
const  Login = require('../../src/models/user')
const { initset } = require('../../src/flash');


let logger = new Login()


const validate = [
  body('_id').notEmpty().withMessage('id cannot be empty').trim().custom(value=> {
    return logger.findLogger({_id:value}).then(e=>{ return !e  && Promise.reject('User not found') })
  }).bail(),
  body('password').notEmpty().withMessage('Password cannot be empty')
]



let validating = initValidation(Validate(validate, validationResult, '/'))



export default handler.post(async (req, res) => {
  try {
   
   
    await validating(req, res)



    let match = await   verify(req.body.password,logger.logger.password);

 
    if (!match) {
      //res.status(419).send('Invalid Password')
      await req.initset(0, 'Invalid Password', '/')
      return
    }

    let info = await logger.confirmUser()

   
  
    if (!info) {
     
      await req.initset(0, logger.message, '/')
      return
    }
  
    req.session.user = info
  
    res.redirect('/home')
 



  } catch (e) {
    

   await req.initset(0, e.message, '/')
  }

})
