
  
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import {get, initget} from '../../src/flash'
import {applySession} from 'next-session'

import {options} from '../../src/session'
import {ToastContainer,toast} from 'react-toastify'
import {authUser}  from '../../src/auth'

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Dashboard from '../../src/dashboard'
import { Router } from 'next/router';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import BookIcon from '@material-ui/icons/Book';
import GroupIcon from '@material-ui/icons/Group';
import ScheduleIcon from '@material-ui/icons/Schedule';
import PaymentIcon from '@material-ui/icons/Payment';
import {useRouter} from 'next/router'
import { Card , Typography } from '@material-ui/core';
import { House, Sports } from '@material-ui/icons';
import { routes } from '../../src/acc';


 const useStyles = makeStyles({
    card: {
      minWidth: 500,
    },
    container: {
      display: 'flex',
      width:'100%',
      justifyContent:'center',
      alignItems:'center'
    },
    heading:{
      fontWeight:'900',
      padding:'13px'
    }
  });

 function Settings({user ,routes }) {
   let style = useStyles()
   let router = useRouter()
    return (
    <Dashboard  {...user} routes={routes} page_title="Settings" crumb={[]} >
    
       <Card elevation={3} className={style.card}>
       <Typography component="h1" pl={4} className={style.heading} id="nested-list-subheader">
         School Settings
        </Typography>
        <Divider />
      <List component="nav" 
      aria-label="settings"
      
      
      >
        <ListItem button onClick={()=> router.push(`${router.pathname}/subjects`)}>
          <ListItemIcon>
            <BookIcon />
          </ListItemIcon>
          <ListItemText primary="Subjects" secondary='Add,Edit and remove' />
        </ListItem>
        <ListItem button onClick={()=> router.push(`${router.pathname}/sports-house`)}>
          <ListItemIcon>
            <Sports />
          </ListItemIcon>
          <ListItemText primary="Sports House" secondary='Add,Edit and remove' />
        </ListItem>
        <ListItem button onClick={()=> router.push(`${router.pathname}/hostels`)}>
          <ListItemIcon>
            <House  />
          </ListItemIcon>
          <ListItemText primary="Hostels" secondary='Add,Edit and remove' />
        </ListItem>
        <ListItem button onClick={()=> router.push(`${router.pathname}/classes`)}>
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText primary="Classes" secondary='Add Variant,Edit and Add Subject' />
        </ListItem>
        <ListItem button onClick={()=> router.push(`${router.pathname}/sessions`)}>
          <ListItemIcon>
            <ScheduleIcon />
          </ListItemIcon>
          <ListItemText primary="Session" secondary='Add,Edit and Set Current' />
        </ListItem>
        <ListItem button onClick={()=> router.push(`${router.pathname}/fees`)}>
          <ListItemIcon>
            <PaymentIcon />
          </ListItemIcon>
          <ListItemText primary="Fees" secondary='Add Fees,edit, set and override' />
        </ListItem>
        </List>
        </Card>
     
    </Dashboard>
    
   
  );
}

export const getServerSideProps = async ({req, res})=> {
    await applySession(req,res,options)

    let r = await routes()
    let {code, message} =    await authUser(req,r.settings)

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
export default Settings