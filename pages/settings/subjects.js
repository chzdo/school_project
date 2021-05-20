

import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { get, initget } from '../../src/flash'
import { applySession } from 'next-session'
import useToast from '../../src/toast'
import { options } from '../../src/session'
import { ToastContainer, toast } from 'react-toastify'
import { authUser } from '../../src/auth'
import Subject from '../../src/models/subject'
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Dashboard from '../../src/dashboard'
import { useRouter } from 'next/router'
import { Card, IconButton, MenuItem, Tooltip, Typography } from '@material-ui/core';
import { AEdit, ADelete, AAdd } from '../../src/actionbtn';
import { Dtable } from '../../src/dbtable'
import { Delete, Edit, FitnessCenterSharp, FormatAlignCenterSharp, PhonePausedSharp, Settings, SportsRugbySharp } from '@material-ui/icons';
import AlertDialog from '../../src/modal';
import { FormDialog } from '../../src/Backdrop';
import { routes } from '../../src/acc';






const useStyles = makeStyles({
  card: {
    minWidth: 500,
  },
  container: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  heading: {
    fontWeight: '900',
    padding: '13px'
  },
  action: {
    background: '#ccccc',
    padding: '5px',
    fontWeight: '900'
  }
});




function ActionHeading() {
  let style = useStyles()
  return <Typography variant="body1" className={style.action} >Actions <Settings /></Typography>
}












function Subject_Settings({ user, subjects, info, routes }) {
  let style = useStyles()
  let router = useRouter()
  const [state,setState] = React.useState({
    open:false,
    pop:false,
    action:undefined,
    id:'',
    message:'',
    title:'',
    f_subj:'',
    f_category:''
  })

function handleState(state){
  setState(r=>({...r,state}))
}
  const [mess, setInfo, setToast] = useToast()

  React.useEffect(() => {
    if (info) {
      setInfo(info)
      setToast(true)
      if(info.payload.body.state){
        let {state , ...rest} = info.payload.body
        let temp = JSON.parse(state)
           setState(r=>({...r,...temp}))
    
      }
    }
  }, [])




  const form = React.useRef()

  const col = [

    {
      name: "_id",
      label: "S/N",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, data, update) => data.rowIndex + 1
      }
    },
    {
      name: "name",
      label: "Subject",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "category",
      label: "Category",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "_id",
      label: "Actions",
      options: {
        filter: false,
        sort: false,
        print: false,
        download: false,
        customBodyRender: (value, all, update) => (<Action id={value}  all={all.rowData} />),
        customHeadLabelRender: (data) => <ActionHeading />

      }
    },

  ];


  const option = {
    elevation: 2,
    filter: true,
    print: true,
    selectableRows: 'none',
    customToolbar: (a) => <AAdd action={() => { setState(r=>({...r,...{title:'Add Subject',message:'',action:'/api/settings/subject/add',pop: !state.pop}}));   }} />
  }



  function Action({ id ,all}) {
  console.log(id)
    return <>
      <AEdit

        action={() => {
          setState(r=>({...r,...{title:'Update Subject',message:'',
           f_subj:all[1], f_category:all[2], action:'/api/settings/subject/edit', id:id, pop: !state.pop}}));
        
       

        }}

      />


      <ADelete action={() => {
   setState(r=>({...r,...{title:'',message:'Are you sure you want to delete? This might have serious effect of exams already written on this subject. We will sugest you edit if exams have been written already!. Do you want to Delete?',
   f_subj:all[1], f_category:all[2], action:'/api/settings/subject/delete', id:id, open: !state.open}}));

   

      }} />
    </>
  }



  function handleClose() {
     setState(r=>({...r, 
    ...{
      open:false,
      pop:false,
      action:undefined,
      id:'',
      message:'',
      title:'',
      f_subj:'',
      f_category:''
    }
    
    })
     )
  }





  return (
    <Dashboard  {...user} routes={routes} page_title="Subjects" crumb={[{ title: 'settings', to: '/settings' }]} >
      <Dtable col={col} data={subjects} option={option} />
      <AlertDialog open={state.open} message={state.message} setOpen={handleClose} handleAction={() => {
        if (state.action != undefined || id == '') {
          form.current.submit()
        } else {
          toast.error('Invaid Params');
        }


      }} />

      <FormDialog
        open={state.pop}
        setClose={handleClose}
        message={state.message}
        title={state.title}
      >
        {state.pop ?
          <form method="post" action={state.action}>
            <TextField
              variant="outlined"
              margin="normal"
              value={state.f_subj}
              type="text"
              required
              onChange={(e) =>  setState(r=>({...r,f_subj:e.target.value}))}
              fullWidth
              id="name"
              label="Subject"
              name="name"
              helperText={"Field is required"}

            />
            <TextField
              select
              variant="outlined"
              margin="normal"
              value={state.f_category}
              type="text"
              required
              onChange={(e) =>  setState(r=>({...r,f_category:e.target.value}))}
              fullWidth
              id="category"
              label="Category"
              name="category"
              helperText={"Field is required"}

            >
              <MenuItem value="Science" >
                Science
                </MenuItem>
              <MenuItem value="Art" >
                Art
                </MenuItem>
            </TextField>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"

            >
              {state.id ? 'Update' : 'Save'}
            </Button>
            <input value={JSON.stringify(state)} name="state" type="hidden" />
            {state.id ? <input name="_id" type="hidden" value={state.id} /> : null}
          </form>
          : null

        }

      </FormDialog>

      <form ref={form} action={state.action} method={'post'}>
        <input name='_id' value={state.id} type="hidden" />
      </form>
    </Dashboard>


  );
}





































export const getServerSideProps = async ({ req, res }) => {
  await applySession(req, res, options)

   let r = await routes()
  let { code, message } = await authUser(req, r.settings)

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
 
  let subjects = new Subject()
  //console.log(Subject)
  let data = await subjects.getSubjects();

 

  let info = ''

  let result = initget(req)
  if (result) {
    info = result

  }


  return {
    props: {
      user: JSON.parse(message),
      info: info,
      routes: r,
      subjects: JSON.parse(JSON.stringify(data))
    },
  }
}
export default Subject_Settings