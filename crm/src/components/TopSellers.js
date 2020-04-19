import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import { BackUrl } from '../utilities/const';
import { userLogged } from '../services/UserService';

const useStyles = makeStyles({
    table: {
        minWidth: 100,
        backgroundColor: '#020e0e',
        color: 'yellow'
    },
    cell: {
        color: 'yellow',
        fontWeight: 'bold'
    },
    tableTitle: {
        backgroundColor: 'yellow',
        color: '#020e0e',
        paddingTop: 15,
        paddingBottom: 15
    }
});

function createData(name, sales) {
    return { name, sales };
}

const rows = [
    createData('1500 ventas', 'Marzo 19'),
    createData('1200 ventas', 'Noviembre 25'),
    createData('1000 ventas', 'Noviembre 14'),
    createData('800 ventas', 'Agosto 10'),
    createData('500 ventas', 'Febrero 13'),
];

export default function TopSellers() {
    React.useEffect(() => {
        let token = userLogged()
        axios.post(BackUrl + 'estadisticas/obtener/top', { token }).then(res => {
            console.log(res)
        }).catch(error => {
            console.log(error)
        })
    }, []);
    const classes = useStyles();

    return (
        <TableContainer component={Paper} style={{ marginLeft: 25, marginRight: 25, marginBottom: 10, width: 'auto' }}>
            <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell className={`${classes.cell} ${classes.tableTitle}`} style={{ fontSize: 23 }} align="center" colSpan={2}><b>Top vendedores</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, i) => (
                        <TableRow key={row.name}>
                            <TableCell className={classes.cell} style={{ fontSize: 23 / (parseFloat('1.' + i)) }} component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell className={classes.cell} align="right">{row.sales}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
