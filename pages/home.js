
  
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import {get, initget} from '../src/flash'
import {applySession} from 'next-session'
import flash from 'connect-flash'
import Message from '../src/alert'
import {options} from '../src/session'
import {ToastContainer,toast} from 'react-toastify'
import {authUser}  from '../src/auth'
import useToast from '../src/toast'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Dashboard from '../src/dashboard'
import {routes} from '../src/acc'
 



 function SuperHome({user , routes }) {
  
  return (
    <Dashboard  {...user} routes={routes} page_title="Home" crumb={[]} >
      hello
    </Dashboard>
    
   
  );
}

export const getServerSideProps = async ({req, res})=> {
    await applySession(req,res,options)
   

   let r =  await routes()


    let {code, message} =    await authUser(req,r.home)

    if(code == 0 ){
        return {
            redirect:{
                destination: '/',
                permanent: false
            }
        }
    }else if(code == 2){
        return {
           notFound: true
        }
    }
    return {
      props: {
      routes : r, 
      user : JSON.parse(message)
      }, 
    }

 
}
export default SuperHome