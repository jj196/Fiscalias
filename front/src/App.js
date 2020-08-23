import React from 'react'; 
import Tabla from './components/tabla' ;
import Formulario from './components/formulario';
import Tabla2 from './components/tabla2'
import {Container, Modal} from '@material-ui/core'; 
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Tabla3 from './components/tabla3';
import { Provider } from "react-redux";
import store from "./store";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";



const useStyles = makeStyles((theme) => ({
  root: {
    width: '75%',
    maxWidth: '75%',
    backgroundColor: theme.palette.background.paper,
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
  section3: {
    margin: theme.spacing(3, 1, 1),
  },
   
}));

 

function App() {
  const classes = useStyles();  

  return ( 
    <Provider store={store}>
    <Container fixed className={classes.root}>  
      <div className={classes.section1}>
      <Grid container justify="center">
          <Grid item xs>
            <Typography gutterBottom variant="h3" align='center'>
              Juan Jose Lima Ramirez
            </Typography>
            <Typography gutterBottom variant="h3">
              Prueba CRUD Fiscalias 
            </Typography>
          </Grid> 
        </Grid> 
      </div>
      <Tabla3/>
      {/* <Switch>
        <Route exact path="/" component={Tabla3}/>
        <Route path="/Editar"  ><Formulario /></Route>
        <Route exact path="/tab" component={Tabla2}/>
        <Route exact path="/tab2" >
             
        </Route>
      </Switch>  */}
      </Container>  
      </Provider>
  );
}

export default App;