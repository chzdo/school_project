
import { Card , IconButton, Tooltip, Typography } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import { Add, AddBox, Delete, Edit, FitnessCenterSharp, SportsRugbySharp, Settings, Visibility  } from '@material-ui/icons';

import {useStyles} from './styles'


export  const  AEdit = ({action})=>(<Tooltip title="edit" >

<IconButton onClick={()=>action()} >
    <Edit  style={{color:'green'}}    />
</IconButton>
</Tooltip>   )

export  const  AView = ({action})=>(
    <Tooltip title="view" >
    <IconButton onClick={()=>action()} >
        <Visibility  style={{color:'brown'}}  />
    </IconButton>
    </Tooltip>)

export  const  ADelete = ({action})=>(
<Tooltip title="delete" >
<IconButton onClick={()=>action()} >
    <Delete style={{color:'red'}}  />
</IconButton>
</Tooltip>)


export function ActionHeading() {
    let style = useStyles()
    return <Typography variant="body1" className={style.action} >Actions <Settings /></Typography>
}
export  const  AAdd = ({action})=>(
    <Tooltip title="Add" >
    <IconButton  onClick={()=>action()}>
        <AddBox style={{color:'black'}}  />
    </IconButton>
    </Tooltip>)

export  const  ASave = ({action})=>(
    <Tooltip title="Save" >
    <IconButton  onClick={()=>action()}>
        <SaveIcon style={{color:'green'}}  />
    </IconButton>
    </Tooltip>)