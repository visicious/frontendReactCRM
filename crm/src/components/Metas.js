// import React from 'react'
// import { makeStyles } from '@material-ui/core/styles';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';
// import { TableSortLabel } from '@material-ui/core';

// const useStyles = makeStyles({
//     table: {
//         minWidth: 100,
//     },
// });

// const rows = [
//     createData('ingreso Generado', 159, 1100, 10),
//     createData('Volumen de Ventas', 237, 1200, 50),
//     createData('Prospectos autogenerados', 262, 1300, 20),
//     createData('Prospectos Totales', 305, 1000, 30),
//     createData('Prospectos', 356, 900, 33),
// ];

// const headCells = [
//     {
//         id: 'objetivo', numeric: false, label: 'Objetivo'
//     },
//     {
//         id: 'valor', numeric: true, label: 'Valor'
//     },
//     {
//         id: 'alcance', numeric: true, label: 'Alcance'
//     },
//     {
//         id: 'porcentaje', numeric: true, label: 'Porcentaje'
//     }
// ]

// function createData(objetivo, valor, avance, porcentaje) {
//     return { objetivo, valor, avance, porcentaje };
// }

// function descendingComparator(a, b, orderBy) {
//     if (b[orderBy] < a[orderBy]) {
//         return -1;
//     }
//     if (b[orderBy] > a[orderBy]) {
//         return 1;
//     }
//     return 0;
// }

// function getComparator(order, orderBy) {
//     return order === 'desc'
//         ? (a, b) => descendingComparator(a, b, orderBy)
//         : (a, b) => -descendingComparator(a, b, orderBy);
// }

// function stableSort(array, comparator) {
//     const stabilizedThis = array.map((el, index) => [el, index]);
//     stabilizedThis.sort((a, b) => {
//         const order = comparator(a[0], b[0]);
//         if (order !== 0) return order;
//         return a[1] - b[1];
//     });
//     return stabilizedThis.map(el => el[0]);
// }

// const createSortHandler = property => event => {
//     onRequestSort(event, property);
// };

// export default function Metas() {
//     const classes = useStyles();

//     return (
//         <TableContainer component={Paper}>
//             <Table className={classes.table} size="medium" aria-label="a dense table">
//                 <TableHead>
//                     <TableRow>
//                         {headCells.map(headCell => (
//                             <TableCell
//                                 key={headCell.id}
//                                 align='center'
//                             >
//                                 <TableSortLabel
//                                     // active={orderBy === headCell.id}
//                                     // direction={orderBy === headCell.id ? 'desc' : 'asc'}
//                                     // onClick={createSortHandler(headCell.id)}
//                                 >
//                                     {headCell.label}
//                                 </TableSortLabel>
//                             </TableCell>
//                         ))}
//                     </TableRow>
//                 </TableHead>
//                 <TableBody>
//                     {rows.map(row => (
//                         <TableRow key={row.objetivo}>
//                             <TableCell component="th" scope="row">
//                                 {row.objetivo}
//                             </TableCell>
//                             <TableCell align="center">{row.valor}</TableCell>
//                             <TableCell align="center">{row.avance}</TableCell>
//                             <TableCell align="center">{row.porcentaje} %</TableCell>
//                         </TableRow>
//                     ))}
//                 </TableBody>
//             </Table>
//         </TableContainer>
//     )
// }


import React from 'react';
import PropTypes from 'prop-types';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add'
import { Button, Tooltip, IconButton } from '@material-ui/core';
import MetasCreate from './MetasCreate';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import { userLogged } from '../services/UserService';
import axios from 'axios'
import { BackUrl } from '../utilities/const';
import AvanceEdit from './AvanceEdit';
import DeleteIcon from '@material-ui/icons/Delete'
import { useConfirmation } from '../services/ConfimationService';

function createData(id, objetivo, valor, avance, progreso) {
    return { id, objetivo, valor, avance, progreso };
}

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (order === 'asc' ? (a, b) => -descendingComparator(a, b, orderBy) : null);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    if (comparator != null) {
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
    }
    return stabilizedThis.map(el => el[0]);
}

const headCells = [
    { id: 'objetivo', numeric: false, disablePadding: true, label: 'Objetivo' },
    { id: 'valor', numeric: true, disablePadding: false, label: 'Valor' },
    { id: 'avance', numeric: true, disablePadding: false, label: 'Avance' },
    { id: 'progreso', numeric: true, disablePadding: false, label: 'Progreso' },
    { id: 'acciones', numeric: false, disablePadding: false, label: 'Acciones', disableSorting: true },
];

function EnhancedTableHead(props) {
    const { classes, order, orderBy, onRequestSort } = props;
    const createSortHandler = property => event => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map(headCell => (
                    <TableCell
                        key={headCell.id}
                        align='center'
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >{
                            headCell.disableSorting ?
                                headCell.label :
                                <TableSortLabel
                                    active={orderBy === headCell.id}
                                    direction={orderBy === headCell.id ? order : 'asc'}
                                    onClick={createSortHandler(headCell.id)}
                                >
                                    {headCell.label}
                                    {orderBy === headCell.id ? (
                                        <span className={classes.visuallyHidden}>
                                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                        </span>
                                    ) : null}
                                </TableSortLabel>
                        }
                        {/* <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel> */}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    // numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    // order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    // orderBy: PropTypes.string.isRequired,
};


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 100,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
    caption: {
        padding: '0 !important'
    },
    captionButton: {
        width: '100%',
        backgroundColor: theme.palette.primary.dark,
        color: 'white',
        '&:hover': {
            backgroundColor: theme.palette.primary.main,
        }
    }
}));
const TableRowMetas = (props) => {
    const confirm = useConfirmation();
    const { updateData } = props
    const [openAvanceDialog, setOpenAvanceDialog] = React.useState(false)
    const handleOpenAvanceEdit = () => {
        setOpenAvanceDialog(true)
    }
    const handleCloseAvanceEdit = result => {
        setOpenAvanceDialog(false)
        let token = userLogged();
        if (result == 'OK') {
            updateData()
        }
    }
    const deleteRow = id => {
        let token = userLogged()
        confirm({
            variant: "danger",
            catchOnCancel: true,
            title: 'Seguro que quiere eliminar esta meta',
            description: 'Eliminando esta meta tendra menos progreso'
        })
            .then(() => {
                axios.post(BackUrl + 'estadisticas/eliminar/meta', { token, id }).then(res => {
                    console.log(res)
                    if (res.data.message == 'OK') {
                        updateData()
                    }
                }).catch(error => {
                    console.log(error)
                })
            })
            .catch(() => { console.log('nel prro') })
    }
    const { row, labelId } = props
    return (
        <TableRow
            hover
            role="checkbox"
            tabIndex={-1}
            key={row.objetivo}
        >
            <AvanceEdit open={openAvanceDialog} id={row.id} handleClose={handleCloseAvanceEdit} avance={row.avance} modalId={'avance'} />
            <TableCell component="th" id={labelId} scope="row">
                {row.objetivo}
            </TableCell>
            <TableCell align="center">{row.valor}</TableCell>
            <TableCell align="center">{row.avance}</TableCell>
            <TableCell align="center">{row.progreso} %</TableCell>
            <TableCell align="center" style={{ display: 'flex' }}>
                <Tooltip title="Editar Avance">
                    <IconButton onClick={handleOpenAvanceEdit}><TrendingUpIcon /></IconButton>
                </Tooltip>
                <Tooltip title="Eliminar Meta">
                    <IconButton onClick={() => { deleteRow(row.id) }}><DeleteIcon /></IconButton>
                </Tooltip>
            </TableCell>
        </TableRow>
    );
}
export default function Metas() {
    const [rows, setRows] = React.useState([
        createData(1, 'Vender 50% más', 15000, 15200, 100),
        createData(2, 'Incrementar contactos en un 30%', 16000, 12200, 50),
        createData(3, 'Añadir interacciones diarias', 14000, 13200, 60),
        createData(4, 'Incrementar acciones en un 80%', 16000, 12200, 40),
    ]);
    const updateData = () => {
        let token = userLogged()
        axios.post(BackUrl + 'estadisticas/obtener/metas', { token }).then(res => {
            console.log(res)
            if (res.data.message == 'OK') {
                let dataRows = res.data.content.map((data, index) => createData(data.id, data.nombre, data.valor, data.avance, data.progreso))
                setRows(dataRows)
            }
        }).catch(error => {
            console.log(error)
        })
    }
    React.useEffect(() => {
        updateData()
    }, []);
    const classes = useStyles();
    const [order, setOrder] = React.useState(null);
    const [orderBy, setOrderBy] = React.useState(null);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(4);
    const [openMetasDialog, setOpenMetasDialog] = React.useState(false)

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        if (order === 'desc' && orderBy === property) {
            setOrder(null);
            setOrderBy(null);
        } else {
            setOrder(isAsc ? 'desc' : 'asc');
            setOrderBy(property);
        }
    };
    const handleOpenMetasDialog = () => {
        setOpenMetasDialog(true)
    }
    const handleCloseMetasDialog = result => {
        if (result == 'OK') {
            const token = userLogged()
            axios.post(BackUrl + 'estadisticas/obtener/metas', { token }).then(res => {
                console.log(res)
                if (res.data.message == 'OK') {
                    let dataRows = res.data.content.map((data, index) => createData(data.id, data.nombre, data.valor, data.avance, data.progreso))
                    console.log(dataRows)
                    setRows(dataRows)
                }
            }).catch(error => {
                {
                    console.log(error)
                }
            })
        }
        setOpenMetasDialog(false)
    }

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
        <div className={classes.root}>
            <MetasCreate open={openMetasDialog} handleClose={handleCloseMetasDialog} modalId={'metas'} />
            <Paper className={classes.paper}>
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        aria-label="enhanced table"
                    >
                        <caption className={classes.caption}>
                            <Button onClick={handleOpenMetasDialog} className={classes.captionButton}>
                                <AddIcon />
                            </Button>
                        </caption>
                        <EnhancedTableHead
                            classes={classes}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                        />
                        <TableBody>
                            {stableSort(rows, getComparator(order, orderBy))
                                // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    return (<TableRowMetas key={`metas-row-${index}`} row={row} labelId={labelId} updateData={updateData} />)
                                    // <TableRow
                                    //     hover
                                    //     role="checkbox"
                                    //     tabIndex={-1}
                                    //     key={row.objetivo}
                                    // >
                                    //     <TableCell component="th" id={labelId} scope="row">
                                    //         {row.objetivo}
                                    //     </TableCell>
                                    //     <TableCell align="center">{row.valor}</TableCell>
                                    //     <TableCell align="center">{row.avance}</TableCell>
                                    //     <TableCell align="center">{row.progreso} %</TableCell>
                                    //     <TableCell align="center">
                                    //         <Tooltip title="Editar Avance">
                                    //             <Button onClick={() => { handleOpenAvanceEdit(row.id) }}><TrendingUpIcon /></Button>
                                    //         </Tooltip>
                                    //     </TableCell>
                                    // </TableRow>
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    );
}
