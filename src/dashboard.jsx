import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { ToastContainer, toast } from 'react-toastify'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { ListItem, ListItemIcon, ListItemText, MenuItem , Tooltip } from '@material-ui/core'
import Icon from '@material-ui/core/Icon';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import DashboardIcon from '@material-ui/icons/Dashboard'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookReader, faCalendarDay, faChartBar, faChartLine, faCog, faDatabase, faFileImport, faHome, faIdBadge, faIdCard, faMoneyCheck, faTable, faTv, faUserShield } from "@fortawesome/free-solid-svg-icons";

import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import ListSubheader from '@material-ui/core/ListSubheader';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import {faUserGraduate, faUserTie}   from '@fortawesome/free-solid-svg-icons'
import LongMenu from './threedot'
import Link from 'next/link'
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import {useRouter} from 'next/router'
//import { mainListItems, secondaryListItems } from './listItems';
//import Chart from './Chart';
//import Deposits from './Deposits';
//import Orders from './Orders';

import Bread from './bread'
import { AssignmentTurnedInOutlined } from '@material-ui/icons';




function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: 0,//theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
  //  height: '100vh',
  //  overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    display: 'flex',
    justifyContent:'center',
   
    alignItems:'center',
    flexDirection: 'column',
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Dashboard({ children, page_title,crumb, firstname, surname,  routes, id, avatar, type }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

 
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
const logout = React.useRef()


let  {
  home,
  student,
  staff,
  parent,
  fees,
  idcard,
  attendance,
  result,
  assignment,
  cbt,
  result_checker,
  resources,
  account_report,
  time_table,
  performance,
  smart_analysis,
  activities,
  settings,
  hostel,
  transport
  
} = routes




  let AppNav = () => (
    <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
      <ToastContainer style={{zIndex:200000000}} />
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
        >
          <MenuIcon />
        </IconButton>
        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
          {`${firstname} ${surname}`}
        </Typography>
        <IconButton color="inherit">
          <Badge badgeContent={4} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <LongMenu color={'white'}>
          <MenuItem >
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <Typography noWrap>
              Profile
                        </Typography>
          </MenuItem>
          <MenuItem  onClick={()=> logout.current.submit()} >
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <Typography noWrap>
              Log out
                        </Typography>
          </MenuItem>
        </LongMenu>


      </Toolbar>
      <form ref={logout} method="post"  action='/api/logout'></form>
    </AppBar>
  )


  let AppDrawer = () => (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
      }}
      open={open}
    >
      <div className={classes.toolbarIcon}>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List><AppMenu list={list} type_id={type[0]._id.toString()} /></List>
    </Drawer>
  )








  const list = [
    {
      type: home,
      to: '/home',
      icon: <FontAwesomeIcon icon={faHome} style={{fontSize:'20px', color:'#000012'}} />,
      title: 'Dashboard'
  
    },
    {
      type: student,
      to: '/student',
      icon: <FontAwesomeIcon icon={faUserGraduate} style={{fontSize:'20px', color:'#000012'}} />,
      title: 'Students'
  
    },
    {
      type: staff,
      to: '/staff',
      icon: <FontAwesomeIcon icon={faUserTie} style={{fontSize:'20px', color:'#000012'}} />,
      title: 'Staffs'
  
    },
    {
      type: parent,
      to: '/parent',
      icon: <FontAwesomeIcon icon={faUserShield} style={{fontSize:'20px', color:'#000012'}} />,
      title: 'Parents'
  
    },
    {
      type: fees,
      to: '/fees',
      icon: <FontAwesomeIcon icon={faMoneyCheck} style={{fontSize:'20px', color:'#000012'}}  />,
      title: 'Fees Payment'
  
    },
    {
      type: idcard,
      to: '/idcard',
      icon: <FontAwesomeIcon icon={faIdCard} style={{fontSize:'20px', color:'#000012'}} />,
      title: 'Id Card'
  
    },
    {
      type: attendance,
      to: '/attendance',
      icon: <PlaylistAddCheckIcon style={{fontSize:'28px', color:'#000012'}} />,
      title: 'Attendance'
  
    },
    {
      type: result,
      to: '/result',
      icon: <FontAwesomeIcon icon={faFileImport} style={{fontSize:'20px', color:'#000012'}} />,
      title: 'Results'
  
    },
    {
      type: assignment,
      to: '/assignment',
      icon: <AssignmentIcon style={{ color:'#000012'}} />,
      title: 'Assignment'
  
    },
    {
      type: cbt,
      to: '/cbt',
      icon: <FontAwesomeIcon icon={faTv} style={{fontSize:'20px', color:'#000012'}} />,
      title: 'CBT'
  
    },
    {
      type: hostel,
      to: '/hostel',
      icon: <FontAwesomeIcon icon={faTv} style={{fontSize:'20px', color:'#000012'}} />,
      title: 'Hostel'
  
    },
    {
      type: transport,
      to: '/transport',
      icon: <FontAwesomeIcon icon={faTv} style={{fontSize:'20px', color:'#000012'}} />,
      title: 'Hostel'
  
    },
  
    {
      type: result_checker,
      to: '/result-checker',
      icon: <LibraryAddCheckIcon  style={{fontSize:'25px', color:'#000012'}}/>,
      title: 'Result Checker'
  
    },
    {
      type: resources,
      to: '/resources',
      icon: <FontAwesomeIcon icon={faBookReader} style={{fontSize:'20px', color:'#000012'}} />,
      title: 'Resources'
  
    },
    {
      type: account_report,
      to: '/account-report',
      icon: <FontAwesomeIcon icon={faChartLine} style={{fontSize:'20px', color:'#000012'}} />,
      title: 'Account Report'
  
    },
    {
      type: time_table,
      to: '/time-table',
      icon: <FontAwesomeIcon icon={faTable} style={{fontSize:'20px', color:'#000012'}} />,
      title: 'Time table'
  
    },
    {
      type: performance,
      to: '/performance',
      icon: <FontAwesomeIcon icon={faChartBar} style={{fontSize:'20px', color:'#000012'}} />,
      title: 'Student Performamce'
  
    },
    {
      type: smart_analysis,
      to: '/smart-analysis',
      icon: <FontAwesomeIcon icon={faDatabase} style={{fontSize:'20px', color:'#000012'}} />,
      title: 'Smart Analysis'
  
    },
    {
      type: activities,
      to: '/activities',
      icon: <FontAwesomeIcon icon={faCalendarDay} style={{fontSize:'20px', color:'#000012'}} />,
      title: 'Events and Activities'
  
    },
    {
      type: settings,
      to: '/settings',
      icon: <FontAwesomeIcon icon={faCog} style={{fontSize:'20px', color:'#000012'}} />,
      title: 'Settings'
  
    },
  ]

  const AppMenu = ({list, type_id}) => (list.map((data, i) => {

    const router = useRouter()
      if (data.type.includes(type_id)) {
        return <div key={i}>
          
          <ListItem button onClick={(e)=> {e.preventDefault(); router.push(data.to)}}    > 
          <Tooltip title={data.title}     >
            <ListItemIcon>
              {data.icon}
            </ListItemIcon>
            </Tooltip>
            <ListItemText primary={data.title} />         
          </ListItem>
         
        </div>
      }else{
       return  null
      }
    }
  )
  );



  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppNav />
      <AppDrawer />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Bread page_title ={page_title}  crumb={crumb} />
          
          <Divider style={{width:'100%'}} />
          <div style={{'marginTop':'20px', width:'100%'}} >
            {children}
         
          <Box pt={4}>
            <Copyright />
          </Box>
          </div>
        </Container>
      </main>
    </div>
  );

}













