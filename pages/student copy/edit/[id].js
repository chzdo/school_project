

import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { get, initget } from '../../../src/flash'
import { applySession } from 'next-session'
import useToast from '../../../src/toast'
import { options } from '../../../src/session'
import { ToastContainer, toast } from 'react-toastify'
import { authUser } from '../../../src/auth'
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useStyles } from '../../../src/styles'
import Container from '@material-ui/core/Container';
import Dashboard from '../../../src/dashboard'

import { routes } from '../../../src/account_type'
import { useRouter } from 'next/router'
import { Backdrop, Card, CardContent, Checkbox, Chip, CircularProgress, Divider, FormControl, FormControlLabel, FormGroup, FormLabel, IconButton, InputAdornment, MenuItem, Tooltip, Typography } from '@material-ui/core';

import { CloudUpload, Delete, Edit, FitnessCenterSharp, FormatAlignCenterSharp, NearMe, PhonePausedSharp, Settings, SettingsInputAntennaTwoTone, SettingsSystemDaydreamRounded, SportsRugbySharp, TvRounded } from '@material-ui/icons';
import AlertDialog from '../../../src/modal';
import { FormDialog } from '../../../src/Backdrop';
import Student from '../../../src/models/student';
import Classes from '../../../src/models/classes';
import Parent from '../../../src/models/parent';
import Menus from '../../../src/menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { CardHeader } from '@material-ui/core';
import { List } from '@material-ui/core';
import { ListItem } from '@material-ui/core';
import { ListItemAvatar } from '@material-ui/core';
import { ListItemText } from '@material-ui/core';
import { CardActions } from '@material-ui/core';
import { faLastfmSquare } from '@fortawesome/free-brands-svg-icons';

var axios = require('axios')
let { studentAdmin } = routes



















function Student_Index({ user, students, student, info,  classes, Parents , countries, auth_token }) {
    let style = useStyles()
    let router = useRouter()
    let history = useRouter()
    let file = React.useRef()



  const [others , setOthers] = React.useState({
      
      states:[],
      cities:[],
      parents_json: Parents.filter(e=> e.id == student.parent_id)[0],
      Image:student.avatar,
      par: student.parent_id,
      matched: [],
      code:"",
      match:false,
      short:'',
      stateloading:false,
      cityloading:false,
      sameasparent: false,
      existingparent:true

  })
    const [formInput,setFormInput] = React.useState({
        surname: student.surname,
        othername:student.othername,
        firstname:student.firstname,
        sex:student.sex,
        dob: student.dob.split('T')[0],
        country:student.country,
        state:student.state,
        lga:student.lga,
        phone:student.phone,
        email:student.email,
        address:student.address,
        class_id:student.class_id,
        par_firstname:"",
        par_othername:"",
        par_surname:"",
        par_sex:"",
        par_email:"",
        par_address:"",
        par_phone:'',
        parent_id: student.parent_id,
        student_id: student.id,
        avatar:[]
    })

    
    const [mess, setInfo, setToast] = useToast()



let handleForm = (event)  =>{

    setFormInput({...formInput, [event.target.name]: event.target.value})
}
let handleOthers = (a,v)  =>{

    setOthers({...others, [a]: v})
}

    async function findState(event) {
      setOthers(r=>{return {...r, states:[],cities:[],stateloading:true,cityloading:false}})
      // setFormInput(r=>({...r,state:student.state, lga:student.lga}))
               console.log(event,`https://www.universal-tutorial.com/api/states/${event.target.value}`)

        let [countri] = countries.filter(e => e.country_name == event.target.value)



        let states = await axios.get(`https://www.universal-tutorial.com/api/states/${event.target.value}`,
            {
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${auth_token} `,

                }
            }
        )
    
        setOthers(r=>({...r, states:states.data,code:countri.country_phone_code,stateloading:false,short:countri.country_short_name}))
      
           }

    async function findCity(event) {

        setOthers(r=>({...r, cities:[],cityloading:true}))


        let url = formInput.country.includes('Nigeria') ? `http://locationsng-api.herokuapp.com/api/v1/states/${(event.target.value).toString().toLowerCase()}/details` : `https://www.universal-tutorial.com/api/cities/${event.target.value}`;
        try {
            let states = await axios.get(url,
                {
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${auth_token} `,

                    }
                }
            )

        let c =    formInput.country.includes('Nigeria') ? states.data.lgas : states.data
        let c_main = c ?  c: []
        setOthers(r=>({...r, cities:c_main,cityloading:false}))
           
        } catch (e) {
            toast.error(e.message)
        }
    }



    React.useEffect(() => {
             
console.log(student)
 
            findState({target:{ value: formInput.country}})
            findCity({target: {value : formInput.state}})
     
        
 

        if (info) {
         
            setInfo(info)
            setToast(true)
            if (info.payload) {
                let {body:{state_, ...rest}, files} = info.payload
               
             let temp =   state_ && JSON.parse(state_)
             if(info.code != 1){
               if(rest) {setFormInput(r=>({...r,...rest}))}
               if(state_) { setOthers(r=>({...r, ...temp}))}
             }
            }
        }
    }, [])




    const form = React.useRef()







function addStudent(e){
    e.preventDefault()
 let filteredP = Parents.filter(e=> e.phone.trim().toLowerCase() === (`${formInput.par_phone}`.toString().toLowerCase()) || e.email.trim().toLowerCase() ===(`${formInput.par_email}`.toString().toLowerCase()))
    console.log(filteredP)
   if(filteredP.length > 0){
       toast.error("Parent already exist! Please tick the existing parent checkbox!")
       return false
   }

 
  
     form.current.submit()

    return true

}






    return (
        <Dashboard  {...user} page_title="Edit Student" crumb={[{ title: 'Students', to: '/student' }]} >
            <form ref={form} method='post' action='/api/student/edit'  onSubmit={addStudent}    style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }} encType='multipart/form-data' >
               
               <input type="hidden" name="student_id" value={formInput.student_id} />
                <Grid container spacing={2} className={style.addContainer}>

                    <Grid item xs={12} md={4} lg={3}  >
                        <input 
                        
                         onFocus={(e)=> toast.error('select a passport!')} 
                         onError={(e)=> console.log(e)}
                          type='file' 
                          accept='image/*'
                          
                           name="avatar" 
                           onChange={(e) =>{
                            e.persist()

                            if(e.target.files[0].size/1024 < 501){
                            setFormInput(rest=>{return {...rest,[e.target.name]: e.target.files[0]}})
                            handleOthers('Image',URL.createObjectURL(e.target.files[0]))
                            }else{
                                toast.error('Image too big must be 500kb')
                            }
                         
                           }}
                           style={{height:0,width:0}} ref={file}  />

                        <Avatar className={style.addAvatar} variant={'square'} src={others.Image} />
                        <Button startIcon={<CloudUpload fontSize="large" style={{ color: 'black' }} />} onClick={() => { file.current.click() }}>
                            Select passport
                        </Button>
                    </Grid>

                    <Grid item xs={12} md={8} lg={9}>
                        <Typography variant="h6">
                            Bio Information
                     </Typography>
                        <Divider className={style.divider} />
                        <TextField
                            fullWidth
                            required
                            className={style.formInput}
                            label='Last name'
                            variant={'outlined'}
                            name={'surname'}

                            onChange={handleForm}
                             value = {formInput.surname}


                        />
                        <TextField
                            fullWidth
                            className={style.formInput}
                            label='Other name'
                            variant={'outlined'}
                            name={'othername'}
                            onChange={handleForm}
                            value = {formInput.othername}

                        />
                        <TextField
                            fullWidth
                            required
                            className={style.formInput}
                            label='First name'
                            variant={'outlined'}
                            name={'firstname'}
                            onChange={handleForm}
                            value = {formInput.firstname}

                        />
                        <TextField
                            fullWidth
                            required
                            className={style.formInput}
                            label='Sex'
                             select
                            variant={'outlined'}
                            name={'sex'}
                            onChange={handleForm}
                            value = {formInput.sex}


                        >
                            {
                                ['Male', 'Female'].map((e, i) => <MenuItem key={i} value={e}>{e}</MenuItem>)
                            }
                        </TextField>
                        <TextField
                            fullWidth
                            required
                            className={style.formInput}
                            label={'date of birth'}
                            variant={'outlined'}
                            name={'dob'}
                            type='date'
                            onChange={handleForm}
                            value = {formInput.dob}

                        />

                    </Grid>






                </Grid>
                <Grid container spacing={2} className={style.addContainer}>
                    <Grid item xs={12} md={6} lg={6}  >
                        <Typography variant="h6">
                            Contact Information
                     </Typography>
                        <Divider className={style.divider} />
                        <TextField
                            fullWidth
                            required
                            className={style.formInput}
                            label='Nationality'
                         
                            onChange={(e)=>{findState(e); handleForm(e)}}
                            select
                            InputProps={{
                                startAdornment: <InputAdornment position="start">{others.short} </InputAdornment>,
                            }}
                           
                            value = {formInput.country}
                            variant={'outlined'}
                            name={'country'}



                        >
                            {
                                countries.map((e, i) => <MenuItem key={i} value={e.country_name}>{e.country_name}</MenuItem>)
                            }
                        </TextField>

                        <TextField
                            fullWidth
                            required
                            className={style.formInput}
                            label='State of Origin'
                            InputProps={{
                                startAdornment: <InputAdornment position="start"> {others.stateloading && <CircularProgress /> }</InputAdornment>,
                            }}
                            select
                            onChange={(e)=>{ handleForm(e) ;findCity(e)}}
                            variant={'outlined'}
                            name={'state'}
                             value = {formInput.state}

                        >
                            {
                                others.states.map((e, i) => <MenuItem key={i} value={e.state_name}>{e.state_name}</MenuItem>)
                            }
                        </TextField>

                        <TextField
                            fullWidth
                            required
                            className={style.formInput}
                            label='LGA/City'
                            InputProps={{
                                startAdornment: <InputAdornment position="start"> {others.cityloading && <CircularProgress />}</InputAdornment>,
                            }}
                            select

                            variant={'outlined'}
                            name={'lga'}
                            onChange={handleForm}
                            value = {formInput.lga}


                        >
                            {
                               formInput.country.includes('Nigeria')?
                                others.cities.map((e, i) => <MenuItem key={i} value={e}>{e}</MenuItem>): others.cities.map((e, i) => <MenuItem key={i} value={e.city_name}>{e.city_name}</MenuItem>)
                            }
                        </TextField>
                        <Divider className={style.divider} />
                        <FormControl component="fieldset" style={{ width: '100%' }} >
                            <FormControlLabel   control={<Checkbox  checked={others.sameasparent} value={others.sameasparent} onChange={() => handleOthers('sameasparent',!others.sameasparent)} name="sameasparent" />


                            }
                                label="Same as Parent/Guardian"

                            />

                            <TextField
                                fullWidth
                                required
                                className={style.formInput}
                                label='Phone Number'
                                type="number"
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"> {others.code}</InputAdornment>,
                                }}


                                variant={'outlined'}
                                name={'phone'}
                                onChange={handleForm}
                                 value = {formInput.phone}
                                disabled={others.sameasparent}

                            />
                            <TextField
                                fullWidth
                                required
                                className={style.formInput}
                                label='Email'
                                type="email"
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"> @</InputAdornment>,
                                }}

                                disabled={!others.sameasparent}
                                variant={'outlined'}

                                name={'email'}
                                onChange={handleForm}
                                 value = {formInput.email}
                                disabled={others.sameasparent}

                            />
                            <TextField
                                fullWidth
                                required
                                className={style.formInput}
                                label='Address'

                                multiline
                                rows={2}
                              
                                variant={'outlined'}
                                name={'address'}
                                onChange={handleForm}
                                value = {formInput.address}
                                disabled={others.sameasparent}

                            ></TextField>

                        </FormControl>

                    </Grid>

                    <Grid item xs={12} md={6} lg={6}>
                        <Typography variant="h6">
                            School Information
                     </Typography>
                        <Divider className={style.divider} />

                        <TextField
                            fullWidth
                            required
                            className={style.formInput}
                            label='Class'
                            select
                            variant={'outlined'}
                            name={'class_id'}
                            onChange={handleForm}
                            value = {formInput.class_id}



                        >
                            {
                                classes.map((e, i) => <MenuItem key={i} value={e.id}>{e.name + e.variation}</MenuItem>)
                            }
                        </TextField>
                        <Typography variant="h6">
                            Parent/Guardian  Information
                     </Typography>
                     <Divider className={style.divider}  />
                     <FormControl component="fieldset" style={{ width: '100%' }} >
                            <FormControlLabel  control={<Checkbox  checked={others.existingparent} value={others.existingparent}  onChange={() => handleOthers('existingparent',!others.existingparent)} name="existingparent" />


                            }
                                label="Existing Parent"

                            />
                 {others.existingparent?
                        <Autocomplete
                            value={others.parents_json}
                            renderOption={(option) => <React.Fragment>{option.name +'-' + option.id}</React.Fragment>}
                            onChange={(event, newValue) => {
                              setOthers(r=>({...r,parents_json:newValue, par: newValue? newValue.id : ""}))
                                //handleOthers('parents_json', newValue);
                                if (newValue) {
                                  //  handleOthers('par', newValue.id);
                                }
                            }}

                            getOptionLabel={(option) => option.name}
                            options={Parents}
                            style={{ marginBottom: 10 }}
                            renderInput={(params) => <><TextField required {...params} label="Parents" variant="outlined" /><input type="hidden" readOnly value={others.par} name="parent_id" required />  </>}
                        />
                      :<>
                        <TextField
                            fullWidth
                            required
                            className={style.formInput}
                            label='Last name'
                            variant={'outlined'}
                            name={'par_surname'}
                            onChange={handleForm}
                            value = {formInput.par_surname}



                        />
                        <TextField
                            fullWidth
                            className={style.formInput}
                            label='Other name'
                            variant={'outlined'}
                            name={'par_othername'}
                            onChange={handleForm}
                            value = {formInput.par_othername}



                        />
                        <TextField
                            fullWidth
                            className={style.formInput}
                            label='First name'
                            variant={'outlined'}
                            name={'firstname'}
                            type='text'
                            name={'par_firstname'}
                            onChange={handleForm}
                            value = {formInput.par_firstname}

                        />
                        <TextField
                            fullWidth
                            required
                            className={style.formInput}
                            label='Sex'
                            select
                            variant={'outlined'}
                               name={'par_sex'}
                            onChange={handleForm}
                            value = {formInput.par_sex}


                        >
                            {
                                ['Male', 'Female'].map((e, i) => <MenuItem key={i} value={e}>{e}</MenuItem>)
                            }
                        </TextField>
                        <TextField
                            fullWidth
                            required
                            className={style.formInput}
                            label='Phone Number'
                            type="number"
                            InputProps={{
                                startAdornment: <InputAdornment position="start"> {others.code}</InputAdornment>,
                            }}


                            variant={'outlined'}
                            name={'par_phone'}
                            onChange={handleForm}
                            value = {formInput.par_phone}
                        />
                        <TextField
                            fullWidth
                            required
                            className={style.formInput}
                            label='Email'
                            type="email"
                            InputProps={{
                                startAdornment: <InputAdornment position="start"> @</InputAdornment>,
                            }}


                            variant={'outlined'}
                            name={'par_email'}
                            onChange={handleForm}
                            value = {formInput.par_email}


                        />
                        <TextField
                            fullWidth
                            required
                            className={style.formInput}
                            label='Address'

                            multiline
                            rows={2}

                            variant={'outlined'}
                            name={'par_address'}
                            onChange={handleForm}
                            value = {formInput.par_address}


                        ></TextField>
                        </>}
                        </FormControl>
                    </Grid>






                </Grid>
                <Grid container className={style.addContainer} >
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"

                            style={{ width: 200, marginLeft: 'auto' }}
                        >
                            Save
                        </Button>
                    </Grid>
                </Grid>
                <input hidden name="state_" value={JSON.stringify(others)} readOnly  />
            </form>



  <Backdrop open={others.match} className={style.backdrop}>

      <Card  elevation={4}  >
          <CardHeader 
          subheader="Data Matched!"
          title="Notice!!! confirm to avoid duplicate"
          />
         <CardContent >
             <Typography variant="body1">
                 Please verify that the user is different 
             </Typography>
         <List>
             {others.matched.map((e,i)=>{
                 return <React.Fragment key={i}> <ListItem > 
                     <ListItemAvatar src={e.avatar}   >
                     <Avatar alt={e.name} src={e.avatar}  />
                     </ListItemAvatar>
                     <ListItemText primary={e.name} secondary={e.id} />
                 </ListItem>
                  <Divider variant="inset" component="li" />
                  </React.Fragment>
             })}
         </List>
         </CardContent>

    <CardActions >
                <Button variant="contained" onClick={()=> form.current.submit()} color={'primary'} >
                    Continue
                </Button>
                <Button variant="contained" onClick={()=> setOthers(r=>({...r,match:false}))} color={'secondary'} >
                    Cancel
                </Button>
    </CardActions>

            
      </Card>
  </Backdrop>





        </Dashboard>


    );
}


































export const getServerSideProps = async ({ req, res ,params }) => {
    await applySession(req, res, options)
    let { code, message } = await authUser(req, studentAdmin)

    if (code == 0) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    } else if (code == 2) {
        return {
            notFound: true
        }
    }


    let data = []
    let students = new Student()

      let res_ = await students.getStudent(params.id)

      if(!res_){
        return {
            notFound: true
        }
      }
      data = students.students()

    let clx = new Classes()
    let p = new Parent()

    let response =  await p.getParents();

    let parents = response? p.parents(): []

    let resp = await students.getStudents();


     let students_data
    if (resp) {

        students_data = students.students()

    }
 

    let all = await clx.getClassWithVariation()
    let clx_data = []

    if (all) {
        clx_data = clx.class_list()

    }

    let info = ''

    let result = initget(req)
    if (result) {
        info = result

    }
    let country_resp
    let auth_token
    try {
        let country_auth = await axios.get("https://www.universal-tutorial.com/api/getaccesstoken",
            {
                headers: {
                    "Accept": "application/json",
                    "api-token": "obOZGasfpHu5XWQhAHHYwKyh5xKRN5mWkbWAr8BzncYfBaPD4_Fe86ObLS_xajDSVVM",
                    "user-email": 'chzdo92@gmail.com'
                }
            }
        )


        auth_token = await country_auth.data.auth_token
        country_resp = await axios.get("https://www.universal-tutorial.com/api/countries/",
            {
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${auth_token} `,

                }
            }
        )

    } catch (e) {

    }


    return {
        props: {
            user: JSON.parse(message),
            info: info,        
            student: JSON.parse(JSON.stringify(data)),
            students: JSON.parse(JSON.stringify(students_data)),
            classes: JSON.parse(JSON.stringify(clx_data)),
             Parents: JSON.parse(JSON.stringify(parents)),
            countries: country_resp && country_resp.data || [],
            auth_token: auth_token || ''
        },
    }
}
export default Student_Index