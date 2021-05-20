

import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { get, initget } from '../../src/flash'
import { applySession } from 'next-session'
import useToast from '../../src/toast'
import { options } from '../../src/session'
import { ToastContainer, toast } from 'react-toastify'
import { authUser } from '../../src/auth'
import Session from '../../src/models/session'
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Dashboard from '../../src/dashboard'
import { routes } from '../../src/account_type'
import { useRouter } from 'next/router'
import { Card, Chip, Divider, IconButton, MenuItem, Tooltip, Typography } from '@material-ui/core';
import { AEdit, ADelete, AAdd } from '../../src/actionbtn';
import { Dtable } from '../../src/dbtable'
import { Delete, Edit, FitnessCenterSharp, FormatAlignCenterSharp, PhonePausedSharp, Settings, SportsRugbySharp } from '@material-ui/icons';
import AlertDialog from '../../src/modal';
import { FormDialog } from '../../src/Backdrop';
import { Autocomplete } from '@material-ui/lab';
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












function Session_Settings({ user, sessions, info , current_sessions }) {
    let style = useStyles()
    let router = useRouter()


    const [open, setOpen] = React.useState(false)
    const [pop, setPop] = React.useState(false)
    const [action, setAction] = React.useState()
    const [id, setId] = React.useState('')
    const [message, setMessage] = React.useState('')
    const [title, setTitle] = React.useState('')
    const [session, setSession] = React.useState('');
    const [current_session, setCurrentSession] = React.useState('');
    const [current_session_json, setCSession] = React.useState(null);
    const [current_term, setCurrentTerm] = React.useState('');
    const [current_term_json, setCTerm] = React.useState(null);
    const [terms, setTerms] = React.useState([{term:'First Term', id:1},{term:'Second Term', id:2},{term:'Third Term', id:3}]);
  
    const [current, setCurrent] = React.useState(false);
    const [mess, setInfo, setToast] = useToast()
  
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
                setSession(temp.session)
             
            setCurrentSession(temp.current_session)
            setCurrentTerm(temp.current_term)
               setCSession(temp.current_session_json);
               setCTerm(temp.current_term_json);
             setCurrent(temp.current)

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
            name: "session",
            label: "Session",
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
        customToolbar: (a) => <> <AAdd action={() => {
            setPop(!pop); setTitle('Add Session');
            setMessage(''); setAction('/api/settings/session/add')
        }} />  <Tooltip title="set current"><IconButton onClick={() => {
            setCurrent(!current); setTitle('Set Current');
            setMessage(''); setAction('/api/settings/session/current')
        }} >
            <EventAvailableIcon />
        </IconButton>
            </Tooltip>
        </>
    }



    function Action({ id, all }) {

        return <>
            <AEdit

                action={() => {
                    setTitle('Update Session')
                    setMessage('')
                    setSession(all[1])

                    setAction('/api/settings/session/edit')
                    setId(id)
                    setPop(!pop);

                }}

            />


            <ADelete action={() => {

                setAction('/api/settings/session/delete');
                setId(id)
                setMessage('Are you sure you want to delete? This might have serious effect of exams already written on this session. We will sugest you edit if exams have been written already!. Do you want to Delete?')
                setOpen(!open);

            }} />

{Object.keys(current_sessions).length > 0 ? id==current_sessions.session_id ?  <Chip  label={`current ${(terms.filter(e=>e.id == current_sessions.term_id ))[0].term}`}  color={"primary"} />: null  : null}
        </>
    }



    function handleClose() {
        setSession('')
        setCurrentSession('')
        setCurrentTerm('')
        setCSession(null)
        setCTerm(null)
        setCurrent(false)
        setId('')
        setMessage(''),
            setTitle(''),
            setAction(''),
            setOpen(false)
        setPop(false)
    }





    return (
        <Dashboard  {...user} page_title="Session" crumb={[{ title: 'settings', to: '/settings' }]} >
            <Dtable col={col} data={sessions} option={option} />
            <AlertDialog open={open} message={message} setOpen={handleClose} handleAction={() => {
                if (action != undefined || id == '') {
                    form.current.submit()
                } else {
                    toast.error('Invaid Params');
                }


            }} />

            <FormDialog
                open={pop || current}
                setClose={handleClose}
                message={message}
                title={title}
            >
               
                    <form method="post" action={action}>
                    {pop ?  <TextField
                            variant="outlined"
                            margin="normal"
                            value={session}
                            type="text"
                            required
                            onChange={(e) => setSession(e.target.value)}
                            fullWidth
                            id="session"
                            label="Session"
                            name="session"
                            helperText={"Field is required"}

                        /> : null}
                    
                    {current ? <>
                    <Typography >
                        
                        {Object.keys(current_sessions).length > 0 ? `current : ${current_sessions.session} ${(terms.filter(e=>e.id == current_sessions.term_id ))[0].term} ` : 'No Current'}
                    </Typography>
                      <Divider />
                            <Autocomplete
                              value={current_session_json}
                            renderOption={(option) => <React.Fragment>{option.session}</React.Fragment>}
                            onChange={(event, newValue) => {
                                setCSession(newValue);
                                if (newValue) {
                                    setCurrentSession(newValue.id)
                                }
                            }}
                            fullWidth
                            
                            getOptionLabel={(option) => option.session}
                            options={sessions}
                            style={{ width:300, margin: 5 }}
                            renderInput={(params) => <><TextField required {...params} label="Session List" variant="outlined" /><input type="hidden" value={current_session} name="session_id" required />  </>}


                        />
                        <Autocomplete
                                value={current_term_json}
                                renderOption={(option) => <React.Fragment>{option.term}</React.Fragment>}
                                onChange={(event, newValue) => {
                                    setCTerm(newValue);
                                    if (newValue) {
                                        setCurrentTerm(newValue.id)
                                    }
                                }}
                                getOptionLabel={(option) => option.term}
                                options={terms}
                                style={{ width:300, margin: 5 }}
                                renderInput={(params) => <><TextField required {...params} label="Term" variant="outlined" /><input type="hidden" value={current_term} name="term_id" required />  </>}
    
                        />
                        </>
                        :null }
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"

                        >
                            {id ? 'Update' : 'ADD'}
                        </Button>
                        <input value={JSON.stringify({ open: open, pop: pop, action: action, id: id, message: message, title: title, session: session, current_session_json:current_session_json
                        , current_session:current_session, current_term_json:current_term_json , current_term: current_term , current:current})} name="state" type="hidden" />
                        {id ? <input name="id" type="hidden" value={id} /> : null}
                    </form>
               

              

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
    let session = new Session()

    let sess = await session.getSessions();

    if (sess) {

        data = session.session()

    }
     sess = await session.getCurrentSessions();
  let current_data  = []
     if (sess) {

        current_data = session.session()

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
            sessions: JSON.parse(JSON.stringify(data)),
            current_sessions: JSON.parse(JSON.stringify(current_data))
        },
    }
}
export default Session_Settings