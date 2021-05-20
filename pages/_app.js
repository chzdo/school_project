import React from 'react'

import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css'
import { makeStyles, useTheme, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
function MyApp({ Component, pageProps }) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  return  <ThemeProvider theme={theme}><Component {...pageProps} /></ThemeProvider>
}
const font =  "'Yusei Magic', sans-serif;";

 const theme = createMuiTheme({
 

});
export default MyApp
