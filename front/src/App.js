import React from 'react';
import { Container, AppBar, Toolbar } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Tabla3 from './components/tabla3';
import { Provider } from "react-redux";
import store from "./store";


const useStyles = makeStyles((theme) => ({
  root: {
    width: '75%',
    maxWidth: '75%',
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  section1: {
    margin: theme.spacing(3, 2),
  },
  section2: {
    margin: theme.spacing(2),
  },
  section33: {
    margin: theme.spacing(3, 1, 1),
  },
  encabezado:{
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,

  }

}));



function App() {
  const classes = useStyles();

  return (
    <div  >
       
        <Toolbar variant="dense">
          {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
          {/* <Typography variant="h6" className={classes.title}>
            News
          </Typography>  */}
          <img src="../logoMP.png"  /> 
          
          <Typography gutterBottom variant="h2" className={classes.title} align='center' color="primary">
            <b>
            Fiscalias
            </b>
        </Typography> 
        </Toolbar> 
    <Provider store={store}> 
      <Container fixed className={classes.root}>
        
        <Tabla3 />
      </Container>
    </Provider>
    </div>
  );
}

export default App;