import { Table, TableContainer, TablePagination, TableFooter, TableHead, TableCell, TableBody, TableRow, Grid, IconButton } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Edit, Delete, KeyboardArrowLeft, KeyboardArrowRight, FirstPage, LastPage  } from '@material-ui/icons'
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import Formulario from './formulario';
import { Modal } from '@material-ui/core';
import { connect } from 'react-redux'
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

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: "#3f51b5",
        color: "#ffff",
        fontSize: 24,
    },
    body: {
        fontSize: 20,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles1 = makeStyles((theme) => ({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    },
  }));

function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;
  
    const handleFirstPageButtonClick = (event) => {
      onChangePage(event, 0);
    };
  
    const handleBackButtonClick = (event) => {
      onChangePage(event, page - 1);
    };
  
    const handleNextButtonClick = (event) => {
      onChangePage(event, page + 1);
    };
  
    const handleLastPageButtonClick = (event) => {
      onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
  
    return (
      <div className={classes.root}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPage  /> : <FirstPage  />}
        </IconButton>
        <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPage /> : <LastPage  />}
        </IconButton>
      </div>
    );
  }
  TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  };
  
function Tabla3(props) {
    const [open, setOpen] = React.useState(false);
    const [datos, setDatos] = useState({ telefono: '', id: '', ubicacion: '' });
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5); 
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.fiscalias.length - page * rowsPerPage);


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };

    const handleClose = () => {
        setOpen(false);
    };

    const classes = useStyles();


    useEffect(() => {
        props.getData();
    }, [])
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
                            (rowsPerPage > 0 ?
                            props.fiscalias.slice(page*rowsPerPage, page * rowsPerPage+rowsPerPage)
                            :props.fiscalias).map(row => (
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
                                            <IconButton aria-label="delete" onClick={() => { props.delFiscalia(row.id) }}>
                                                <Delete />
                                            </IconButton>
                                        </Tooltip>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))
                        }
                        {
                            emptyRows > 0 && (
                                <StyledTableRow style={{ height: 53 * emptyRows }}>
                                    <StyledTableCell colSpan={6} />
                                </StyledTableRow>
                            )
                        }
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                colSpan={3}
                                count={props.fiscalias.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: { 'aria-label': 'rows per page' },
                                    native: true,
                                }}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
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