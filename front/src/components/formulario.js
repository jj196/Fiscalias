import React, { useState } from 'react';  
import FormControl from '@material-ui/core/FormControl';
import { createMuiTheme, ThemeProvider,makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { green } from '@material-ui/core/colors';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';

const theme = createMuiTheme({
    palette: {
      primary: green,
    },
  });
const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    }, paper: {
        position: 'absolute',
        width: 400,     
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
  })); 

  function getModalStyle() {
    const top = 50 ;
    const left = 50 ;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
const Formulario =(props) =>{
    const [modalStyle] = React.useState(getModalStyle); 
    const [data, setData] = useState( 
        {ubicacion: props.data.ubicacion, numero : props.data.telefono, id:props.data.id}
        )
    const classes = useStyles();

    const handleChange = event =>{
        const {name, value} = event.target;
        setData({...data,[name]:value})  
    }
    var boolId = false;
    var BtnOp = <Button
            variant="contained"
            color="primary"
            onClick={()=>{props.add(data.ubicacion, data.numero);
                props.data.ubicacion= data.ubicacion;
                props.data.telefono = data.numero;
            }} 
            className={classes.button}
            startIcon={<SaveIcon />}
        >
            Guardar
        </Button>
    if(props.data.id!=''){
        boolId = true;
         BtnOp = <Button
        variant="contained"
        color="primary"
        onClick={()=>{props.edit(data.id, data.ubicacion, data.numero);
            props.data.ubicacion= data.ubicacion;
                props.data.telefono = data.numero;
        }}
        className={classes.button}
        startIcon={<SaveIcon />}
    >
        Editar
    </Button>} 
    
    return(
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            style={modalStyle}
            className={classes.paper}
            >
            <FormControl className={classes.margin}>
                <ThemeProvider theme={theme}> 
                    {boolId?(
                        <TextField
                        className={classes.margin}
                        label="Id"
                        variant="outlined" 
                        name="id"
                        disabled = "true"
                        visible = "false"
                        value={data.id}
                        onChange={handleChange}
                        />
                    ):(
                        null
                    )
                    }
                    
                    <TextField
                    className={classes.margin}
                    label="Ubicacion"
                    variant="outlined"
                    name="ubicacion" 
                    required = "true"
                    value={data.ubicacion}
                    onChange={handleChange}
                    />
                    <TextField
                    className={classes.margin}
                    label="Telefono"
                    variant="outlined"
                    name="numero"
                    required = "true"
                    value={data.numero}
                    onChange={handleChange}
                    />
                </ThemeProvider>
                <Grid
                    container
                    direction="col"
                    justify="center"
                    alignItems="center"  
                    >
                {BtnOp}
                <Button
                    variant="contained"
                    color="secondary"
                    name = "cancelar"
                    className={classes.button}
                    startIcon={<DeleteIcon />}
                    onClick = {()=>{
                        setData({ubicacion: props.data.ubicacion, numero : props.data.telefono, id:props.data.id});
                    }}
                >
                    cancelar
                </Button>
                </Grid> 
                
                {/* <InputLabel htmlFor="numero">Numero: </InputLabel>
                <Input
                id="numero"
                startAdornment={
                    <InputAdornment position="end">
                    <ContactsSharpIcon />
                    </InputAdornment>
                }
                /> */}
            </FormControl> 
        </Grid>
    )

}
export default  Formulario;