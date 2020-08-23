import { Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Grid, IconButton } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Edit, Delete, Add } from '@material-ui/icons' 
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import Formulario from './formulario';
import { Modal } from '@material-ui/core';
import { connect, useSelector, useDispatch } from 'react-redux'
import { addFiscalia, delFiscalia, getData, updateFiscalia } from '../actions/actions'


const useStyles = makeStyles((theme) => ({
    fab: {
        margin: theme.spacing(2),
    },
    absolute: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(3),
    },
}));

const  StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);
  

function Tabla3(props) {
    const [open, setOpen] = React.useState(false);
    const [data, setData] = React.useState(props.fiscalias);
    const [datos, setDatos] = useState({ telefono: '', id: '', ubicacion: '' });

    const handleClose = () => {
        setOpen(false);
    };

    // const store  = useSelector(state => ({
    //     fiscalias: state.data.fiscalias
    // }))
    
    // const distPatch = useDispatch();
    const classes = useStyles();


    useEffect( () => {
        props.getData();
        // getData();
    },[] )
    console.log(props.fiscalias); 
    return (
        <div>
            <Grid item container alignItems="flex-end" direction="column">
                <Tooltip title="Add" aria-label="add" onClick={() => {
                    setOpen(true);
                    setDatos({ ubicacion: '', telefono: '', id: '' })
                }}>
                    <Fab color="primary">
                        <AddIcon />
                    </Fab>
                </Tooltip>
            </Grid>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell> Id </StyledTableCell>
                            <StyledTableCell> Ubicacion </StyledTableCell>
                            <StyledTableCell> Telefono </StyledTableCell>
                            <StyledTableCell> Acciones </StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {
                            props.fiscalias.map(row => (
                                <StyledTableRow key={row.id}>
                                    <StyledTableCell>{row.id}</StyledTableCell>
                                    <StyledTableCell>{row.ubicacion}</StyledTableCell>
                                    <StyledTableCell>{row.telefono}</StyledTableCell>
                                    <StyledTableCell>
                                        <Tooltip title="Edit">
                                            <IconButton aria-label="Edit" onClick={() => {
                                                setDatos(row);
                                                setOpen(true);
                                            }}>
                                                <Edit />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete">
                                            <IconButton aria-label="delete" onClick={()=>{props.delFiscalia(row.id)}}>
                                                <Delete />
                                            </IconButton>
                                        </Tooltip>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <Modal open={open} onClose={handleClose}>
                <Formulario data={datos} add={props.addFiscalia} edit={props.updateFiscalia} />
            </Modal>
        </div>
    )
}
const mapStateToProps = state => ({
    fiscalias: state.data.fiscalias
})
// export default Tabla3
export default connect(
    mapStateToProps, { delFiscalia, addFiscalia, getData, updateFiscalia }
)(Tabla3)