
  
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
//import {authUser}  from '../src/auth'
import {options} from '../src/session'
import {ToastContainer,toast} from 'react-toastify'
import useToast from '../src/toast'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

 function SignIn({info }) {

   function getInitialProps(ctx){
     console.log(ctx)
   }
   

  const classes = useStyles();
  const [error,setError] = React.useState(info)
  const [idvalue,setIdValue] = React.useState('')
  const [passwordvalue,setPasswordValue] = React.useState('')
  const [iderror,setIdError] = React.useState(false)
  const [idhelper,setIdHelper] = React.useState('')
  const [passerror,setPassError] = React.useState(false)
  const [passhelper,setPassHelper] = React.useState('')
  const [mess, setInfo, setToast] = useToast()
  const id = React.useRef()
  const password = React.useRef()
  const form = React.useRef()

   React.useEffect(()=>{
     
   if(info){
     let { payload:{ body}} = info
if(body){
     setIdValue(body._id && body._id)
     setPasswordValue(body.password &&  body.password)
     setInfo(info)
     setToast(true)
}
   }

   },[info])



   let submit = (e)=>{
        e.preventDefault()
      
        if(id.current.value.length < 10){
           setIdError(true)
           setIdHelper('Invalid ID')
           return;
        }

        if(password.current.value.length < 1){
          setPassError(true)
          setPassHelper('Password cannot be empty')
          return;
       }
       form.current.submit()
      
   }
  return (
    <Container component="main" maxWidth="xs">
     <ToastContainer />
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        
         
       
        <form className={classes.form}  ref={form} method="post" action="/api/login" onSubmit={submit} noValidate>
          <TextField
            error={iderror}
            variant="outlined"
            margin="normal"
            inputRef={id}
            value ={idvalue}
            type="text"
            required
            onChange={(e)=> setIdValue(e.target.value)}
            onClick={()=> setIdError(false)}
            fullWidth
            id="id"
            label="(staff/student/parent) ID"
            name="_id"
            helperText={idhelper}
            autoFocus
          />
          <TextField
          error={passerror}
            variant="outlined"
            margin="normal"
            required
            onChange={(e)=> setPasswordValue(e.target.value)}
            value ={passwordvalue}
            onClick={()=> setPassError(false)}
            inputRef={password}
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            helperText={passhelper}
            autoComplete="current-password"
          />
         
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
           
          </Grid>
        </form>
      </div>
      <Box mt={12}>
        <Copyright />
      </Box>
    </Container>
  );
}

export const getServerSideProps = async ({req, res})=> {
    await applySession(req,res,options)

  //  let  user = await authUser(req,[...Array(8).keys()])

  //  if(user.code == 1){

   //   return {
      //  redirect:{
      //    destination: '/home',
       //   permanent: true
     //   }
     // }
  // }

    
  let  info = '' 
  
 let result = initget(req)
if(result){
  info = result

}
  

  return {
    props: {
       info : info
    }, 
  }
}
export default SignIn