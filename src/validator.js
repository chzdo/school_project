
const {initset} = require('./flash');
export function initValidation(validator){
    return (req,res)=>
         new Promise((resolve,reject)=>{
                validator(req,res,(result)=>{
                    if(result instanceof Error){
                        return reject(result)
                    }
                    return resolve(result)
                })
         })
}


export function Validate(validations,validationResult,url){
    return async (req,res,next)=>{
       await   Promise.all(validations.map((validation)=> validation.run(req)))

       const errors = validationResult(req)
        if(errors.errors.length == 0){
            next()
            return;
        }
        
        let [current] = errors.errors
       // res.status(422).send(current)
       await req.initset(0,current.msg,url)
       // res.end()
}
}