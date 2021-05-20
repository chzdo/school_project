

import handler from '../../../src/handler';

const { initset } = require('../../../src/flash');
const Subject = require('../../../src/models/subject')
const {authUser} = require('../../../src/auth')
const { check, validationResult } = require('express-validator');

let subject = new Subject()
import {routes} from '../../../src/acc'




export default handler.use(async (req,res,next)=>{
   // console.log(req);

   let r = await routes()
   let response = await authUser(req,r.settings); 
   if(response.code != 1){
       await req.initset(response.code,response.message,'/settings/subjects')
       return;
   }

   next()

})