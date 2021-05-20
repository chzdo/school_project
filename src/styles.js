

import { faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { makeStyles } from '@material-ui/core/styles';
import { ImportantDevices } from '@material-ui/icons';

export const useStyles = makeStyles({
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
    },
    popGrid:{
        margin:3
    },
    popItem:{
        display:'flex',
        justifyContent:'center',
        alignItems : 'center'
    },
    divider:{
        marginTop:5,
        marginBottom:5
    },
    formInput:{
       marginTop:10
    },
    addContainer:{
      display:'flex',
      width:'90%',
      justifySelf:'center',
      msAlignSelf:'center',
      alignSelf:'center',
     margin:5,
    
  
    
    },

    addAvatar:{
        width:200,
        display:'relative',
        height:200,
        margin: 10,
    
    }
    ,
  backdrop:{
      zIndex : '10 !important',
  }
});