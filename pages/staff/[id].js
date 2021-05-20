

import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { get, initget } from '../../src/flash'
import { applySession } from 'next-session'

import { options } from '../../src/session'
import { ToastContainer, toast } from 'react-toastify'
import { authUser } from '../../src/auth'
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useStyles } from '../../src/styles'
import Container from '@material-ui/core/Container';
import Dashboard from '../../src/dashboard'

import { routes } from '../../src/account_type'
import { useRouter } from 'next/router'
import {  Divider, FormControl,  Typography } from '@material-ui/core';


import Student from '../../src/models/student';
import { Table } from 'react-bootstrap';
import Parent from '../../src/models/parent';


var axios = require('axios')
let { student } = routes



















function Student_Index({ user, student,parents , info }) {
    let style = useStyles()
    let router = useRouter()
    let history = useRouter()
 

React.useEffect(()=>{

    if(Object.keys(info).length > 0){
        toast.error('Parents Information not found')
    }

},[])


console.log(parents)
 
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
        class_id:student.class_name + student.variation,
        par_firstname:parents.firstname,
        par_othername:parents.othername,
        par_surname:parents.surname,
        par_sex:"",
        par_email:"",
        par_address:"",
        par_phone:parents.phone,
        parent_id: student.parent_id,
        student_id: student.id,
        avatar:[],
        Image: student.avatar
    })

    
 






    return (
        <Dashboard  {...user} page_title="Student Information" crumb={[{ title: 'Students', to: '/student' }]} >
           
                <Grid container spacing={2} className={style.addContainer}>

                    <Grid item xs={12} md={4} lg={3}  >
           

                        <Avatar className={style.addAvatar} variant={'square'} src={formInput.Image} />
                     
                    </Grid>

                    <Grid item xs={12} md={8} lg={9}>
                        <Typography variant="h6">
                            Bio Information
                     </Typography>
                        <Divider className={style.divider} />
                        <TextField
                            fullWidth                          
                            className={style.formInput}
                            label='Last name'
                            InputLabelProps={{
                                 color:'primary',
                                 variant:'filled'
                            }
                            }
                            variant={'filled'}                        
                            InputProps ={{
                                readOnly: true,
                            }}
                             value = {formInput.surname}


                        />
                        <TextField
                            fullWidth
                            className={style.formInput}
                            label='Other name'
                            InputLabelProps={{
                                color:'primary',
                                variant:'filled'
                           }
                           }
                           variant={'filled'}                        
                           InputProps ={{
                               readOnly: true,
                           }}
                            
                            value = {formInput.othername}

                        />
                        <TextField
                            fullWidth
                            required
                            className={style.formInput}
                            label='First name'
                            InputLabelProps={{
                                color:'primary',
                                variant:'filled'
                           }
                           }
                           variant={'filled'}                        
                           InputProps ={{
                               readOnly: true,
                           }}
                            
                            value = {formInput.firstname}

                        />
                        <TextField
                            fullWidth
                       
                            className={style.formInput}
                            label='Sex'
                            InputLabelProps={{
                                color:'primary',
                                variant:'filled'
                           }
                           }
                           variant={'filled'}                        
                           InputProps ={{
                               readOnly: true,
                           }}
                            value = {formInput.sex}


                        />
                        
                       
                        <TextField
                            fullWidth
                            required
                            className={style.formInput}
                            label={'date of birth'}
                            InputLabelProps={{
                                color:'primary',
                                variant:'filled'
                           }
                           }
                           variant={'filled'}                        
                           InputProps ={{
                               readOnly: true,
                           }}
                            
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
                           className={style.formInput}
                            label='Nationality'
                         
                           
                        
                           
                            value = {formInput.country}
                          
                            InputLabelProps={{
                                color:'primary',
                                variant:'filled'
                           }
                           }
                           variant={'filled'}                        
                           InputProps ={{
                               readOnly: true,
                           }}



                        />
                  

                        <TextField
                            fullWidth
                            required
                            className={style.formInput}
                            label='State of Origin'
                      
                           
                          
                            InputLabelProps={{
                                color:'primary',
                                variant:'filled'
                           }
                           }
                           variant={'filled'}                        
                           InputProps ={{
                               readOnly: true,
                           }}
                             value = {formInput.state}

                        />
                      
                      
                        <TextField
                            fullWidth
                            required
                            className={style.formInput}
                            label='LGA/City'
                       

                         
                            InputLabelProps={{
                                color:'primary',
                                variant:'filled'
                           }
                           }
                           variant={'filled'}                        
                           InputProps ={{
                               readOnly: true,
                           }}
                            
                            value = {formInput.lga}


                        />
                            
                   
                            <TextField
                                fullWidth
                            
                                className={style.formInput}
                                label='Phone Number'
                                type="number"
                           

                              
                                InputLabelProps={{
                                    color:'primary',
                                    variant:'filled'
                               }
                               }
                               variant={'filled'}                        
                               InputProps ={{
                                   readOnly: true,
                               }}
                                
                                 value = {formInput.phone}
                             

                            />
                            <TextField
                                fullWidth
                                required
                                className={style.formInput}
                                label='Email'
                             

                          
                               

                                InputLabelProps={{
                                    color:'primary',
                                    variant:'filled'
                               }
                               }
                               variant={'filled'}                        
                               InputProps ={{
                                   readOnly: true,
                               }}
                                
                                 value = {formInput.email}
                             

                            />
                            <TextField
                                fullWidth
                          
                                className={style.formInput}
                                label='Address'

                                multiline
                                rows={4}
                              
                                InputLabelProps={{
                                    color:'primary',
                                    variant:'filled'
                               }
                               }
                               variant={'filled'}                        
                               InputProps ={{
                                   readOnly: true,
                               }}
                                value = {formInput.address}
               

                            ></TextField>

                  

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
                            InputLabelProps={{
                                color:'primary',
                                variant:'filled'
                           }
                           }
                           variant={'filled'}                        
                           InputProps ={{
                               readOnly: true,
                           }}
                            
                            value = {formInput.class_id}



                        />
                      
                   
                        <Typography variant="h6">
                            Parent/Guardian  Information
                     </Typography>
                     <Divider className={style.divider}  />
                     <FormControl component="fieldset" style={{ width: '100%' }} >
                        
              
                 
                  
                        <TextField
                            fullWidth
                      
                            className={style.formInput}
                            label='Last name'
                            InputLabelProps={{
                                color:'primary',
                                variant:'filled'
                           }
                           }
                           variant={'filled'}                        
                           InputProps ={{
                               readOnly: true,
                           }}
                            
                            value = {formInput.par_surname}



                        />
                        <TextField
                            fullWidth
                            className={style.formInput}
                            label='Other name'
                            InputLabelProps={{
                                color:'primary',
                                variant:'filled'
                           }
                           }
                           variant={'filled'}                        
                           InputProps ={{
                               readOnly: true,
                           }}
                            
                            value = {formInput.par_othername}



                        />
                        <TextField
                            fullWidth
                            className={style.formInput}
                            label='First name'
                            variant={'outlined'}
                            InputLabelProps={{
                                color:'primary',
                                variant:'filled'
                           }
                           }
                           variant={'filled'}                        
                           InputProps ={{
                               readOnly: true,
                           }}
                            
                            value = {formInput.par_firstname}

                        />
                    
                        <TextField
                            fullWidth
                            required
                            className={style.formInput}
                            label='Phone Number'
                            type="number"
                        


                            InputLabelProps={{
                                color:'primary',
                                variant:'filled'
                           }
                           }
                           variant={'filled'}                        
                           InputProps ={{
                               readOnly: true,
                           }}
                            
                            value = {formInput.par_phone}
                        />
                        
                    
                        </FormControl>
                    </Grid>






                </Grid>
                <Grid container className={style.addContainer} >
                    <Grid item xs={12}>
                        <Typography variant="h6">
                            Record and History
                        </Typography>
                        <Divider className={style.divider} />
                       <Table  responsive hover bordered striped>
                           <thead>
                               <tr>
                              <th>
                                  S/N
                                  </th>
                                  <th>
                                  Action
                                  </th>
                                  <th>
                                  Description
                                  </th>
                                  <th>
                                  Date
                                  </th>
                                  <th>
                                  Remark
                                  </th>
                                  </tr>
                           </thead>
                           <tbody>
                               <tr>
                                   <td>
                                       1
                                   </td>
                                   <td>
                                       1
                                   </td>
                                   <td>
                                       1
                                   </td>
                                   <td>
                                       1
                                   </td>
                                   <td>
                                       1
                                   </td>
                               </tr>
                              
                           </tbody>
                       </Table>
                    </Grid>
                </Grid>
              






        </Dashboard>


    );
}


































export const getServerSideProps = async ({ req, res ,params }) => {
    await applySession(req, res, options)
    let { code, message } = await authUser(req, student)

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

var p = new Parent();
console.log(data.parent_id)
 var p_ = await p.isExist(data.parent_id)?  p.parents() : []

 var info =  p_  ?  {} : {code:0, 'message':'Parent Information not found'} ;



    return {
        props: {
            user: JSON.parse(message),
            info : JSON.parse(JSON.stringify(info)),
            parents: JSON.parse(JSON.stringify(p_)),
            student: JSON.parse(JSON.stringify(data)),
         
       
        },
    }
}
export default Student_Index