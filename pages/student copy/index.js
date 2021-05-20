

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
import useToast from '../../src/toast'
import { options } from '../../src/session'
import { ToastContainer, toast } from 'react-toastify'
import { authUser } from '../../src/auth'
import Autocomplete from '@material-ui/lab/Autocomplete';
import Container from '@material-ui/core/Container';
import Dashboard from '../../src/dashboard'
import { routes } from '../../src/account_type'
import { useStyles } from '../../src/styles'
import { useRouter } from 'next/router'
import { Card, Chip, IconButton, MenuItem, Tooltip, Typography } from '@material-ui/core';
import { AEdit, ADelete, AAdd ,ActionHeading, AView} from '../../src/actionbtn';
import { Dtable } from '../../src/dbtable'
import { Settings } from '@material-ui/icons';
import AlertDialog from '../../src/modal';
import { FormDialog } from '../../src/Backdrop';
import Student from '../../src/models/student';
import Classes from '../../src/models/classes';
import Menus from '../../src/menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
let { student } = routes






















function Student_Index({ user, students, info, classes , Status}) {
    let style = useStyles()
    let router = useRouter()
    let history = useRouter()

    const [open, setOpen] = React.useState(false)
    const [pop, setPop] = React.useState(false)
    const [classMode, setCMode] = React.useState(false)
    const [statusMode, setSMode] = React.useState(false)
    const [class_list, setClist] = React.useState('')
    const [status, setStatus] = React.useState('')
    const [action, setAction] = React.useState()
    const [id, setId] = React.useState('')
    const [message, setMessage] = React.useState('')
    const [title, setTitle] = React.useState('')
    const [avatar, setAvatar] = React.useState('')
    const [name, setName] = React.useState('')
    const [mess, setInfo, setToast] = useToast()

    React.useEffect(() => {
        if (info) {
            setInfo(info)
            setToast(true)
            console.log(info)
            if (info.payload.body.state) {
                let temp = JSON.parse(info.payload.body.state)
                setOpen(temp.open)
                setPop(temp.pop)
                setAction(temp.action)
                setId(temp.id)
                setTitle(temp.title)
                setMessage(temp.message)
                setClist(temp.class_list)
                setStatus(temp.status)
                setCMode(temp.classMode)
                setSMode(temp.statusMode)
                setAvatar(temp.avatar)
                setName(temp.name)
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
            name: "id",
            label: "Student ID",
            options: {
                filter: false,
                sort: true
            }
        },
        {
            name: "avatar",
            label: "Passport",
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, all, update) => (<Avatar src={value} alt={all.rowData[4]} />)
            }
        },
        {
            name: "name",
            label: "Name",
            options: {
                filter: false,
                sort: true,
            }
        },
        {
            name: "class",
            label: "Class",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "sex",
            label: "Sex",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "variation",
            label: "Variation",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "hostel",
            label: "Hostel",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, all, update) => { if (value) { return value } else { return 'N/A' } }
            }
        },
        {
            name: "house",
            label: "Sport House",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, all, update) => { if (value) { return value } else { return 'N/A' } }
            }
        },

        {
            name: "status",
            label: "Status",
            options: {
                filter: false,
                sort: true,
                customBodyRender: (value, all, update) => (<Chip  style={{ color: 'white', background: value == 1 ? 'green' :  value == 5 ? 'blue':'red' }} label={all.rowData[10]}
                />
                ),
            }
        },
        {
            name: "state",
            label: "",
            options: {
                filter: false,
                sort: false,
                display: 'excluded'
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
        customToolbar: () => <AAdd action={() => {
          
            history.push('/student/add')
        }} />
    }



    function Action({ id, all }) {

        return <>
            <AEdit

                action={() => {
                    router.push(`student/edit/${btoa(id)}`)

                }}

            />

<AView

action={() => {
    router.push(`student/${btoa(id)}`)

}}

/>

            <Menus Element={<Settings />}
                title={'Change'}
                list={[
                    { icon: <FontAwesomeIcon icon={faGraduationCap} />, 'title': "class", action: () => {  setAvatar(all[2]) ;  setName(all[3]); setAction('/api/student/change/class'); setId(id); setCMode(true); setTitle('Change class'); setMessage('Do this only if you want to change the class of this student'); setPop(true) } },
                    { icon: <FontAwesomeIcon icon={faInfoCircle} />, 'title': "Status", action: () => { setAvatar(all[2]) ;  setName(all[3]); setAction('/api/student/change/status'); setId(id); setSMode(true); setTitle('Change Status'); setMessage('Do this only if you want to change the status of this student'); setPop(true) } }
                ]}
            />





        </>
    }



    function handleClose() {

        setId('')
        setMessage('')
            setTitle('')
            setAction('')
            setClist('')
            setStatus('')
            setOpen(false)
            setCMode(false)
            setSMode(false)
        setPop(false)
    }





    return (
        <Dashboard  {...user} page_title="Student List" crumb={[]} >
            <Dtable col={col} data={students} option={option} />
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
                {pop ?<>
                      <Grid container className={style.popGrid}  >
                          <Grid item xs={3} className={style.popItem}>
                            <Avatar  src={avatar}   />
                          </Grid>
                          <Grid item xs={9} className={style.popItem} >
                            <Typography    > {name} </Typography>
                         </Grid>
                      </Grid>



                    <form method="post" action={action} style={{ width: '100%', minWidth: '400px' }} encType="multipart/form-data">
                        {classMode ?
                            <>
                                <TextField
                                    select
                                    label={'class list'}
                                    required
                                    id="class_id"
                                    name="class_id"
                                    value={class_list}
                                    fullWidth
                                    onChange={(e) => { setClist(e.target.value) }}
                                    helperText={'you must choose'}
                                    variant={'outlined'}

                                >
                                    {
                                        classes.map((data, i) => <MenuItem value={data.id} >{data.name + data.variation}</MenuItem>)
                                    }
                                </TextField>


                            </>







                            : null}
                              {statusMode ?
                            <>
                                <TextField
                                    select
                                    label={'Status'}
                                    required
                                  
                                    name="status"
                                    value={status}
                                    fullWidth
                                    onChange={(e) => { setStatus(e.target.value) }}
                                    helperText={'you must choose'}
                                    variant={'outlined'}

                                >
                                    {
                                        Status.filter(e=> e.type != 2).map((data, i) => <MenuItem value={data.id} >{data.state}</MenuItem>)
                                    }
                                </TextField>


                            </>







                            : null}
                        <Button
                            type="submit"
                           
                            variant="contained"
                            color="primary"

                        >
                            {'Save'}
                        </Button>
                        <input value={JSON.stringify({ open: open, pop: pop, action: action, id: id, message: message, title: title, classMode:classMode, class_list:class_list, status:status, statusMode:statusMode, avatar:avatar, name:name })} name="state" type="hidden" />
                        {id ? <input name="student_id" type="hidden" value={id} /> : null}
                    </form>
                    </>: null

                }

            </FormDialog>

            <form ref={form} action={action} method={'post'}>
                <input name='id' value={id} type="hidden" />
                <input name='status'  type="hidden" />
            </form>
        </Dashboard>


    );
}





































export const getServerSideProps = async ({ req, res }) => {
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
    let clx = new Classes()
    //console.log(Subject)
    let resp = await students.getStudents();

    if (resp) {

        data = students.students()

    }
    let stat = await students.getUserStates();

  
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


    return {
        props: {
            user: JSON.parse(message),
            info: info,
            students: JSON.parse(JSON.stringify(data)),
            classes: JSON.parse(JSON.stringify(clx_data)),
            Status: JSON.parse(JSON.stringify(stat))
        },
    }
}
export default Student_Index