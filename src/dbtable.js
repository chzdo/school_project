
import MUIDataTable from "mui-datatables";
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles'

const getMuiTheme = () => createMuiTheme({
    overrides:{
      MUIDataTableBodyCell:{
        root:{
         // backgroundColor: "#eee"
        }
      }
    }
  })



  export const Dtable = ({col,option,data})=>{
    return <MuiThemeProvider
    theme={getMuiTheme()}
  >
     <MUIDataTable
     
       columns = {col}
       data ={data}
       options = {option}
       />
  </MuiThemeProvider>
  }