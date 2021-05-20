

import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';


import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
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
import { routes } from '../../src/account_type'
import { useRouter } from 'next/router'
import { Card, IconButton, MenuItem, Tooltip, Typography } from '@material-ui/core';
import { AEdit, ADelete, AAdd } from '../../src/actionbtn';
import { Dtable } from '../../src/dbtable'
import { Delete, Edit, FitnessCenterSharp, FormatAlignCenterSharp, PhonePausedSharp, Settings, SportsRugbySharp } from '@material-ui/icons';
import AlertDialog from '../../src/modal';
import { FormDialog } from '../../src/Backdrop';
let { settings } = routes





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












function Subject_Settings({ user, subjects, info }) {
  let style = useStyles()
  let router = useRouter()
  

  const [open, setOpen] = React.useState(false)
  const [pop, setPop] = React.useState(false)
  const [action, setAction] = React.useState()
  const [id, setId] = React.useState('')
  const [message, setMessage] = React.useState('')
  const [title, setTitle] = React.useState('')
  const [f_subj, setSubj] = React.useState('');
  const [f_category, setCat] = React.useState('');
  const [subject, setSubjects] = React.useState(JSON.parse(subjects))
  const [mess, setInfo, setToast] = useToast()

  React.useEffect(() => {
    if (info) {
      setInfo(info)
      setToast(true)
      if(info.payload.body.state){
        let temp = JSON.parse(info.payload.body.state)
        console.log(temp)
        setOpen(temp.open)
        setPop(temp.pop)
        setAction(temp.action)
        setId(temp.id)
        setMessage(temp.message)
        setTitle(temp.title)
        setSubj(temp.f_subj)
        setCat(temp.f_category)
      }
    }
  }, [])




  const form = React.useRef()

  const col = [

    {
      name: "id",
      label: "S/N",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, data, update) => data.rowIndex + 1
      }
    },
    {
      name: "subject",
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
      name: "id",
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
    customToolbar: (a) => <AAdd action={() => { setPop(!pop);  setTitle('Add Subject');
    setMessage(''); setAction('/api/settings/subject/add') }} />
  }



  function Action({ id ,all}) {

    return <>
      <AEdit

        action={() => {
           setTitle('Update Subject')
           setMessage('')
           setSubj(all[1])
           setCat(all[2])
          setAction('/api/settings/subject/edit')
          setId(id)
          setPop(!pop);

        }}

      />


      <ADelete action={() => {

        setAction('/api/settings/subject/delete');
        setId(id)
        setMessage('Are you sure you want to delete? This might have serious effect of exams already written on this subject. We will sugest you edit if exams have been written already!. Do you want to Delete?')
        setOpen(!open);

      }} />
    </>
  }



  function handleClose() {
      setSubj('')
      setCat('')
      setId('')
      setMessage(''),
      setTitle(''),
      setAction(''),
      setOpen(false)
      setPop(false)
  }





  return (
    <Dashboard  {...user} page_title="Subjects" crumb={[{ title: 'settings', to: '/settings' }]} >
      <Dtable col={col} data={subject} option={option} />
      <AlertDialog open={open} message={message} setOpen={handleClose} handleAction={() => {
        if (action != undefined || id == '') {
          form.current.submit()
        } else {
          toast.error('Invaid Params');
        }


      }} />

      <FormDialog
        open={pop}
        setClose={handleClose}
        message={message}
        title={title}
      >
        {pop ?
          <form method="post" action={action}>
            <TextField
              variant="outlined"
              margin="normal"
              value={f_subj}
              type="text"
              required
              onChange={(e) => setSubj(e.target.value)}
              fullWidth
              id="subject"
              label="Subject"
              name="subject"
              helperText={"Field is required"}

            />
            <TextField
              select
              variant="outlined"
              margin="normal"
              value={f_category}
              type="text"
              required
              onChange={(e) => setCat(e.target.value)}
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
              {id ? 'Update' : 'Save'}
            </Button>
            <input value={JSON.stringify({open:open,pop:pop,action:action,id:id,message:message,title:title,f_subj:f_subj,f_category:f_category})} name="state" type="hidden" />
            {id ? <input name="id" type="hidden" value={id} /> : null}
          </form>
          : null

        }

      </FormDialog>

      <form ref={form} action={action} method={'post'}>
        <input name='id' value={id} type="hidden" />
      </form>
    </Dashboard>


  );
}





































export const getServerSideProps = async ({ req, res }) => {
  await applySession(req, res, options)
  let { code, message } = await authUser(req, settings)

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
  let subjects = new Subject()
  //console.log(Subject)
  let subj = await subjects.getSubjects();

  if (subj) {

    data = subjects.subjects()

  }

  let info = ''

  let result = initget(req)
  if (result) {
    info = result

  }


  return {
    props: {
      user: JSON.parse(message),
      info: info,
      subjects: JSON.stringify(data)
    },
  }
}
export default Subject_Settings