import React from 'react'
import Alert from '@material-ui/lab/Alert'
import { CancelOutlined , Check} from '@material-ui/icons'



export default function  Message({error, onClose}){
if(!error){
    return null
}
   return <Alert
       onClose = {onClose}
      
       role ='alert'
       iconMapping ={ error.code == 0? <CancelOutlined />:error.code == 1?  <Check /> : error.code == 2? null :null}
        color = { error.code == 0? 'error': error.code == 1? 'success':error.code == 2? null : null}
        severity = { error.code == 0? 'error': error.code == 1? 'success':error.code == 2? null : null}
>
   {error.message}
</Alert>
}