import React from 'react';
import { emphasize, withStyles, makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Chip from '@material-ui/core/Chip';
import HomeIcon from '@material-ui/icons/Home';

import { Divider, Typography } from '@material-ui/core';
import {useRouter} from 'next/router'

const useStyle = makeStyles({
    bread_holder:{
        display:'flex',
        width:'100%',
        marginBottom: '20px',
        justifyContent: 'space-between',
      
        padding: 2
    }
})


const StyledBreadcrumb = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey[100],
    height: theme.spacing(3),
    color: theme.palette.grey[800],
    
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.grey[300],
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(theme.palette.grey[300], 0.12),
    },
  },
}))(Chip); // TypeScript only: need a type cast here because https://github.com/Microsoft/TypeScript/issues/26591



export default function Bread({page_title, crumb}) {
    let style = useStyle()
    let router = useRouter()

    function handleClick(event,to) {
      event.preventDefault();
      router.push(to)
    }
  return (
      <div  className={style.bread_holder}>
          <Typography variant="h5">
              {page_title}
          </Typography>
    <Breadcrumbs aria-label="breadcrumb" style={{marginLeft:'auto'}}>
      <StyledBreadcrumb
        component="a"
        href="/home"
        label="Home"
        icon={<HomeIcon fontSize="small" />}
        onClick={handleClick}
      />
      {crumb.map((c,i)=><StyledBreadcrumb key={i} component="a" href={c.to}  onClick={(e)=>handleClick(e,c.to)} label={c.title} />)}
      
   
    </Breadcrumbs>
   
    </div>
  );
}
