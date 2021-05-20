import nc from 'next-connect';
import {session} from 'next-session'
import cor from '../src/cors'
import {options} from '../src/session'
import { initset } from './flash';
const flash = require('connect-flash')


export default nc({
  async  onError(err,req,res){
     //console.log(res)
     throw new Error(err.message)
        //   res.status(500)
         //   res.end()
             // await initset(0,"Something went wrong", '/')(req,res)
    },
   async  onNoMatch(req,res){
            res.status(404)
            res.end()
      ///  await initset(0,`The method ${req.method } is not allowed!`, '/')(req,res)
       //  res.status(405).json({message:`The method ${req.method } is not allowed!`})
    }
}).use(session({...options}))
.use(async (req,res,next)=>{
   cor(req,res).then(e=> { next()}).catch(e=>{ res.end()})
   
}).use(flash()).use((req,res,next)=> { req['initset'] =initset(req,res); next()})