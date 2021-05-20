
import { CompareArrowsOutlined } from '@material-ui/icons';
import  User from './models/user'

  let user_x = new User()
export  const authUser = async (req,users)=>{
     try{
           if(!req.session.user){
              
               return {code:0, "message":'no authentication'}
           }

         
         let  {user} = req.session;
        
           await  user_x.findLogger({'_id':user._id})

       
         let response = await user_x.confirmUser()
    
          if(!response){
              await user_x.logout(req)
            return {code:0, "message":'User cannot be found'}
              }
       
    
        if(!users.includes(response.type[0]._id.toString())){
            return {code:2, "message":'Access Denied!'}
         }

      
         return {code:1, message:JSON.stringify(response)};
        }catch(e){
          console.log(e)
            return {code:2, message:'Something went wrong'}; 
        }
}