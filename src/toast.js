
import React from 'react'
import {toast} from 'react-toastify'


export default function useToast(){
 const [t,setToast] = React.useState(false)
 const[info,setInfo] = React.useState()
 const options = {
     position:'top-right',
     autoClose:false,
     timeout:10000,
     duration: 50000

 }



 if(t){
    if(!info){
        setToast(false)
        setInfo()
     
    }else{
      
  switch(info.code){
     case 0: { 
       
        toast(info.message,{ type:'error',...options}); break;}
     case 1 : { toast(info.message,{ type:'success', ...options}); break;}
     case 2 : { toast(info.message,{ type:'warning', ...options}); break;}
     case 3: { toast(info.message,{ type:'info' , ...options}); break;}
     
 }
 setToast(false)
 setInfo()
}
}
return [info,setInfo,setToast]

}