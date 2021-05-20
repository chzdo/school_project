import Cors from 'cors'

const cors = Cors({
    methods:['GET','POST'],
    origin:['https://www.facebook.com']
})

export default function cor(req,res){
    return new Promise((reso,rej)=>{
        cors(req,res,(result)=>{
            if(result instanceof Error){
                return rej(error)
            }
            return reso(result)
        })
    })
}