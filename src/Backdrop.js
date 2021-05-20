import { Card } from '@material-ui/core'
import Backdrop from '@material-ui/core/Backdrop'
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle'
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider, useTheme } from '@material-ui/core/styles';
import { Close, Info } from '@material-ui/icons';
export function FormDialog({ open, title, message, setClose, children, state }) {
   
    const useStyles = makeStyles((theme) => ({
      main: {
        minWidth: '400px',
  
        
      
  
      },
      logout: {
        display: 'flex',
        float: 'right',
        marginLeft: 'auto',
      },
      content: {
        display: 'flex',
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column'
      }
      ,
      contentText: {
       marginBottom: '10px'
      }
    }))
  
 
    let classes = useStyles()
    const handleClose = (event, reason) => {
  
      if (reason == 'clickaway') {
        return
      }
      if (reason == 'backdropClick') {
        return
      }
      setClose(false);
    };
  
    return (
      <div>
  
        <Dialog className={classes.main} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          {setClose != undefined ?
            <div style={{ display: "flex", width: "100%", zIndex: "1000", justifyContent: "flex-end" }} >
              <IconButton onClick={()=> setClose()}> <span className="badge bg-danger" > <Close style={{color:'white'}} /> </span></IconButton>
            </div> : null}
          <DialogTitle id="form-dialog-title">  {title} </DialogTitle>
          <Divider />
          <DialogContent className={classes.content}>
            {message != undefined ?
              <><DialogContentText className={classes.contentText}>
                {message}
              </DialogContentText>
                <Divider /> </> : null
            }
            {children}
          </DialogContent>
  
        </Dialog>
  
      </div>
    );
  }
  
  
  
  