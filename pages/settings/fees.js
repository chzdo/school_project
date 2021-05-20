

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
import Fees from '../../src/models/fees'
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Dashboard from '../../src/dashboard'
import { routes } from '../../src/account_type'
import { useRouter } from 'next/router'
import { Card, Chip, IconButton, MenuItem, Tooltip, Typography } from '@material-ui/core';
import { AEdit, ADelete, AAdd } from '../../src/actionbtn';
import { Dtable } from '../../src/dbtable'
import { Delete, Edit, FitnessCenterSharp, FormatAlignCenterSharp, NearMe, PhonePausedSharp, Settings, SportsRugbySharp } from '@material-ui/icons';
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












function Fees_Settings({ user, fees, info }) {
    let style = useStyles()
    let router = useRouter()
    console.log(fees)

    const [open, setOpen] = React.useState(false)
    const [pop, setPop] = React.useState(false)
    const [action, setAction] = React.useState()
    const [id, setId] = React.useState('')
    const [message, setMessage] = React.useState('')
    const [title, setTitle] = React.useState('')
    const [name, setName] = React.useState('')
    const [amount, setAmount] = React.useState('')
    const [merchant_id, setMId] = React.useState('')
    const [api_key, setAKey] = React.useState('')
    const [status, setStatus] = React.useState('')
    const [service_id, setSId] = React.useState('')
    const [mess, setInfo, setToast] = useToast()

    React.useEffect(() => {
        if (info) {
            setInfo(info)
            setToast(true)
            if (info.payload.body.state) {
                let temp = JSON.parse(info.payload.body.state)
                console.log(temp)
                setOpen(temp.open)
                setPop(temp.pop)
                setAction(temp.action)
                setId(temp.id)
                setMessage(temp.message)
                setTitle(temp.title)
                setName(temp.name)
                setAmount(temp.amount)
                setMId(temp.merchant_id)
                setAKey(temp.api_key)
                setSId(temp.service_id)
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
            name: "name",
            label: "Fee Type",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "amount",
            label: "Amount",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "merchant_id",
            label: "Merchant ID",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "api_key",
            label: "Merchant ID",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "service_id",
            label: "service ID",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "status",
            label: "Status",
            options: {
                filter: false,
                sort: true,
                customBodyRender: (value, all, update) => (<Chip 
                    style={{ color:'white' ,background: value==0?'red':'green'}} color={'inherit'} label={value == 0? 'Not Active': 'Active'}
                     deleteIcon={value == 0 ? <PlayArrowIcon color={'inherit'} style={{color:'white'}} />  : <PauseIcon style={{color:'white'}} /> }
                      onDelete={()=>{ setOpen(!open);
                         setMessage(`You are about to ${value==0? 'Activate this payment': 'Deactivate this payment'}! Do you want to continue?`)
                         setId(all.rowData[0])
                         setStatus(value==0 ? 1 : 0)
                         setAction('/api/settings/fees/status')
                        
                        }}/>),
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
        customToolbar: (a) => <AAdd action={() => {
            setPop(!pop); setTitle('Add Payment');
            setMessage(''); setAction('/api/settings/fees/add')
        }} />
    }



    function Action({ id, all }) {

        return <>
            <AEdit

                action={() => {
                    setTitle('Update Payment')
                    setMessage('')
                    setName(all[1])
                    setAmount(all[2])
                    setMId(all[3])
                    setAKey(all[4])
                    setSId(all[5])
                    setAction('/api/settings/fees/edit')
                    setId(id)
                    setPop(!pop);

                }}

            />


                 </>
    }



    function handleClose() {
        setName('')
        setAmount('')
        setMId('')
        setAKey('')
        setSId('')
        setId('')
        setMessage(''),
            setTitle(''),
            setAction(''),
            setOpen(false)
        setPop(false)
    }





    return (
        <Dashboard  {...user} page_title="Fees" crumb={[{ title: 'settings', to: '/settings' }]} >
            <Dtable col={col} data={fees} option={option} />
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
                            value={name}
                            type="text"
                            required
                            onChange={(e) => setName(e.target.value)}
                            fullWidth
                            id="name"
                            label="Payment Name"
                            name="name"
                            helperText={"Field is required"}

                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            value={amount}
                            type="number"
                            required
                            onChange={(e) => setAmount(e.target.value)}
                            fullWidth
                            id="amount"
                            label="Amount"
                            name="amount"
                            helperText={"Field is required"}

                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            value={merchant_id}
                            type="number"
                            required
                            onChange={(e) => setMId(e.target.value)}
                            fullWidth
                            id="merchant_id"
                            label="MERCHANT ID"
                            name="merchant_id"
                            helperText={"Field is required"}

                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            value={api_key}
                            type="number"
                            required
                            onChange={(e) => setAKey(e.target.value)}
                            fullWidth
                            id="api_key"
                            label="API Key"
                            name="api_key"
                            helperText={"Field is required"}

                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            value={service_id}
                            type="number"
                            required
                            onChange={(e) => setSId(e.target.value)}
                            fullWidth
                            id="service_id"
                            label="Service ID"
                            name="service_id"
                            helperText={"Field is required"}

                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"

                        >
                            {id ? 'Update' : 'Save'}
                        </Button>
                        <input value={JSON.stringify({ open: open, pop: pop, action: action, id: id, message: message, title: title, name: name, amount: amount, merchant_id: merchant_id, api_key: api_key, service_id: service_id })} name="state" type="hidden" />
                        {id ? <input name="id" type="hidden" value={id} /> : null}
                    </form>
                    : null

                }

            </FormDialog>

            <form ref={form} action={action} method={'post'}>
                <input name='id' value={id} type="hidden" />
                <input name='status' value={status} type="hidden" />
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
    let fees = new Fees()
    //console.log(Subject)
    let subj = await fees.getFees();

    if (subj) {

        data = fees.fees()

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
            fees: JSON.parse(JSON.stringify(data))
        },
    }
}
export default Fees_Settings