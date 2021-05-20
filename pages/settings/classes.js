

import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';

import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { get, initget } from '../../src/flash'
import { applySession } from 'next-session'
import useToast from '../../src/toast'
import { options } from '../../src/session'
import { ToastContainer, toast } from 'react-toastify'
import { authUser } from '../../src/auth'
import Classes from '../../src/models/classes'
import Subject from '../../src/models/subject'
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Dashboard from '../../src/dashboard'
import { routes } from '../../src/account_type'
import { useRouter } from 'next/router'
import { Card, Divider, FormGroup, GridList, IconButton, MenuItem, Tooltip, Typography } from '@material-ui/core';
import { AEdit, ADelete, AAdd, ASave } from '../../src/actionbtn';
import { Dtable } from '../../src/dbtable'
import { Delete, Edit, FitnessCenterSharp, FormatAlignCenterSharp, PhonePausedSharp, SaveAlt, Settings, SportsRugbySharp } from '@material-ui/icons';
import AlertDialog from '../../src/modal';
import { FormDialog } from '../../src/Backdrop';
import AutoComplete from '../../src/autocomplete';
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












function Classes_Settings({ user, classes, info, variation_data, class_data, subjects }) {
  let style = useStyles()
  let router = useRouter()


  const [open, setOpen] = React.useState(false)
  const [pop, setPop] = React.useState(false)
  const [action, setAction] = React.useState()
  const [id, setId] = React.useState('')
  const [message, setMessage] = React.useState('')
  const [title, setTitle] = React.useState('')
  const [class_list, setClist] = React.useState('');
  const [class_id, setCId] = React.useState('');
  const [subject_id, setSId] = React.useState('');
  const [formRef, setRef] = React.useState();
  const [class_list_json, setClistJson] = React.useState(null);
  const [all_class, setSubjects] = React.useState(JSON.parse(classes))
  const [mess, setInfo, setToast] = useToast()
  const form = React.useRef()
  const form_subj = React.useRef()

  React.useEffect(() => {
    if (info) {
      setInfo(info)
      setToast(true)
      if (info.payload.body.state) {
        let temp = JSON.parse(info.payload.body.state)

        setOpen(temp.open)
        setPop(temp.pop)
        setAction(temp.action)
        setId(temp.id)
        setMessage(temp.message)
        setTitle(temp.title)
        setCId(temp.class_id)
        setSId(temp.subject_id)
        setRef(temp.formRef)
        setClist(temp.class_list)
        setClistJson(temp.class_list_json)

      }
    }
  }, [])






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
      name: "name",
      label: "Class",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "variation",
      label: "variation",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "subjects",
      label: "Subjects",
      options: {
        filter: false,
        sort: false,
        print: false,
        download: false,
        customBodyRender: (value, all, update) => (<Subjects item={value} id={all.rowData[4]} />),


      }
    },
    {
      name: "class_id",
      label: "Action",
      options: {
        filter: false,
        sort: false,
        print: false,
        download: false,
        customBodyRender: (value, all, update) => (<Action id={value} all={all.rowData} />),
        customHeadLabelRender: (data) => <ActionHeading />

      }
    },

  ];


  const option = {
    elevation: 2,
    filter: true,
    print: true,
    selectableRows: 'none',
    customToolbar: (a) => <AAdd action={() => {
      setPop(!pop); setTitle('Add Class/Variation');
      setMessage('Automatically add variatons to class e.g JSS1A'); setAction('/api/settings/classes/add')
    }} />
  }



  function Action({ id, all }) {

    return <>



      <ADelete action={() => {

        setAction('/api/settings/classes/delete');
        setId(id)
        setRef(form)
        setMessage('This might have serious effect on students previously in this class. Do you want to Delete?')
        setOpen(!open);

      }} />
    </>
  }



  function handleClose() {
    setClist('')
    setTitle('')
    setId('')
    setMessage(''),
      setTitle(''),
      setAction(''),
      setOpen(false)
    setPop(false)
  }


  function Subjects({ item, id }) {




    function AddSubject() {
      const inputRef = React.useRef()
      return <>
        <span>
          <Grid container spacing={2}>
            <Grid item xs={9} >
              <Autocomplete
                multiple
                limitTags={2}
                id="tags-outlined"
                options={subjects.filter(e => { return !item.some(k => (e.id == k.subject_id)) })}
                getOptionLabel={(option) => option.subject}
                style={{ marginBottom: 10 }}
                filterSelectedOptions
                onInputChange={(evt, input) => {
                  console.log(input)
                }}
                onChange={(event, newValue) => {
               
                  inputRef.current.value = JSON.stringify(([...JSON.parse(inputRef.current.value), { class_id: id, subject_id: newValue[newValue.length - 1].id }]))
                 
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Subject"
                    placeholder="Favorites"
                  />
                )}
              />
            </Grid>
            <Grid item xs={3} >

              <form action={'/api/settings/classes/subject/add'} method={'post'} onSubmit={(e)=> {if(JSON.parse(inputRef.current.value).length == 0 ) { toast.error('You must select Subject') ; e.preventDefault(); }}}>
                <input required ref={inputRef} name='class_subject' type="hidden" value={JSON.stringify([])}/>
                <Button type="submit"  color="inherit"  variant="outlined"  style={{color:'green'}} >
                  <SaveAlt fontSize="large" color="inherit" style={{color:'green'}}
                  />
                </Button>
              </form>
            </Grid>
          </Grid>
        </span>
        <Divider />


      </>
    }

    return <>
      <AddSubject />

      <Grid container spacing={1} style={{ marginBottom: 10 }} >
        <Grid item xs={8} >
          <Typography variant="caption" > Subject </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="caption" > Action </Typography>
        </Grid>

      </Grid>
      <Divider />
      <div  style={{ maxHeight: 500, overflowY: 'auto', overflowX: 'hidden' }}>



        {item.map((e, i) => (

          <Grid key={i} container spacing={1}>

            <Grid item xs={8}>
              <Typography> {e.subject} </Typography>
            </Grid>
            <Grid item xs={4}>
              <ADelete action={() => {

                setAction('/api/settings/classes/subject/delete');
                setCId(id)
                setRef(form_subj)
                setSId(e.subject_id)
                setMessage(' Do you want to Delete?')
                setOpen(!open);

              }} />
            </Grid>

          </Grid>
        ))
        }
      </div>
    </>


  }





  return (
    <Dashboard  {...user} page_title="Class List" crumb={[{ title: 'settings', to: '/settings' }]} >
      <Dtable col={col} data={all_class} option={option} />
      <AlertDialog open={open} message={message} setOpen={handleClose} handleAction={() => {
        if (action != undefined || id == '') {
          formRef.current.submit()
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

            <Autocomplete
              value={class_list_json}
              renderOption={(option) => <React.Fragment>{option.name}</React.Fragment>}
              onChange={(event, newValue) => {
                setClistJson(newValue);
                if (newValue) {
                  setClist(newValue.id)
                }
              }}
              getOptionLabel={(option) => option.name}
              options={class_data}
              style={{ marginBottom: 10 }}
              renderInput={(params) => <><TextField required {...params} label="Class List" variant="outlined" /><input type="hidden" value={class_list} name="class_id" required />  </>}
            />






            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"

            >
              {'Save'}
            </Button>

            <input value={JSON.stringify({ open: open, pop: pop, action: action, id: id, message: message, title: title, class_id: class_id, subject_id: subject_id, formRef: formRef, class_list: class_list, class_list_json: class_list_json })} name="state" type="hidden" />

            {id ? <input name="id" type="hidden" value={id} /> : null}
          </form>
          : null

        }

      </FormDialog>

      <form ref={form} action={action} method={'post'}>
        <input name='id' value={id} type="hidden" />
      </form>
      <form ref={form_subj} action={action} method={'post'}>
        <input name='class_id' value={class_id} type="hidden" />
        <input name='subject_id' value={subject_id} type="hidden" />
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
  let classes = new Classes()
  let subject = new Subject()
  let all = await classes.getAllClassVariationWithSubjects()


  if (all) {

    data = classes.variation()

  }

  let subjects = await subject.getSubjects()

  let s_data = []

  if (subjects) {

    s_data = subject.subjects()

  }



  let class_data = []
  let variation_data = []
  let class_list = await classes.getClassList()

  if (class_list) {
    class_data = classes.class_list()
  }
  let variation = await classes.getVariationList()

  if (variation) {
    variation_data = classes.variation()
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
      variation_data: JSON.parse(JSON.stringify(variation_data)),
      class_data: JSON.parse(JSON.stringify(class_data)),
      classes: JSON.stringify(data),
      subjects: JSON.parse(JSON.stringify(s_data)),
    },
  }
}
export default Classes_Settings