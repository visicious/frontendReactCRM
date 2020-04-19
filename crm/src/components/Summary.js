import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
        minWidth: 100,
    },
});

function createData(name, sales) {
    return { name, sales };
}

const rows = [
    createData('ingreso Generado', 159),
    createData('Volumen de Ventas', 237),
    createData('Prospectos autogenerados', 262),
    createData('Prospectos Totales', 305),
    createData('Prospectos', 356),
    createData('Contactados', 356),
    createData('Negociacion Iniciada', 356),
    createData('Pendientes de Cierre', 356),
    createData('Interacciones Positivas', 356),
    createData('Interacciones Neutras', 356),
    createData('Interacciones Negativas', 356),
];

export default function Summary(props) {
    const { timeType } = props
    const classes = useStyles();

    return (
        <TableContainer component={Paper} style={{ marginLeft: 25, marginRight: 25, width: 'auto' }}>
            <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center" style={{ fontSize: 23, paddingTop: 15, paddingBottom: 15 }} colSpan={2}>
                            <b>Resumen {timeType}</b></TableCell>
                    </TableRow>

                </TableHead>
                <TableBody>
                    {rows.map(row => (
                        <TableRow key={row.name}>
                            <TableCell style={{ paddingTop: 3, paddingBottom: 3, paddingLeft: row.name == 'Prospectos' || row.name == 'Contactados' || row.name == 'Negociacion Iniciada' || row.name == 'Pendientes de Cierre' ? 45 : 16 }} component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell style={{ padding: 0, paddingRight: 16 }} align="right">{row.sales}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
