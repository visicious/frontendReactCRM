import React from 'react'
import { TableContainer, Paper, Table, makeStyles, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core'
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import PhoneIcon from '@material-ui/icons/Phone';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
const useStyles = makeStyles({
    table: {
        minWidth: 100,
    },
    cell: {
    },
    tableTitle: {
    },
    headingCell:{
    }
});

function createData(indicadores, whatsapp, telefono, email) {
    return { indicadores, whatsapp, telefono, email };
}

const rows = [
    createData('Volumen', 15000, 15200, 12200),
    createData('Convensiones', 16000, 12200, 12050),
    createData('Prospecto', 14000, 13200, 61300),
    createData('Contactado', 16000, 12200, 13040),
    createData('Negociacion', 16000, 12200, 11040),
    createData('Pendientes Cerrar', 16000, 12200, 12240),
    createData('Cierres', 16000, 12200, 12240),
];

export default function InteraccionesEstadisticasTable() {
    const classes = useStyles();
    return (
        <TableContainer component={Paper} style={{ marginLeft: 25, marginRight: 25, marginBottom: 10, width: 'auto' }}>
            <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Indicadores</TableCell>
                        <TableCell align="center"><WhatsAppIcon/></TableCell>
                        <TableCell align="center"><PhoneIcon/></TableCell>
                        <TableCell align="center"><MailOutlineIcon/></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, i) => (
                        <TableRow key={row.indicadores}>
                            <TableCell className={`${classes.cell} ${classes.headingCell}`} component="th"  scope="row">
                                {row.indicadores}
                            </TableCell>
                            <TableCell className={classes.cell} align="center">{row.whatsapp}</TableCell>
                            <TableCell className={classes.cell} align="center">{row.telefono}</TableCell>
                            <TableCell className={classes.cell} align="center">{row.email}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
