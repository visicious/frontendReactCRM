import React from 'react'
import { Button } from '@material-ui/core';
import useStyles from '../styles/Table';
import DescriptionIcon from '@material-ui/icons/Description';
import AddIcon from '@material-ui/icons/Add';
import AddInteraccion from './AddInteraccion';
import CorreoInteraccion from './CorreoInteraccion';
import { useConfirmation } from '../services/ConfimationService';
import WhatsappInteraccion from './WhatsappInteraccion'
export default function ToolbarTitle(props) {
    const confirm = useConfirmation()
    const { idUltimoPropsecto, canal, correo, telefono } = props
    const classes = useStyles();
    const [openDialogAdd, setOpenDialogAdd] = React.useState(false)
    const [openDialogCorreoInteraccion, setOpenDialogCorreoInteraccion] = React.useState(false)
    const [openDialogWhatsappInteraccion, setOpenDialogWhatsappInteraccion] = React.useState(false)
    const handleOpenAddInteraccion = () => {
        setOpenDialogAdd(true)
    }
    const handleCloseAddInteraccion = result => {
        console.log(result);
        if (result == 'OK') {
            props.refreshData()
        }
        setOpenDialogAdd(false)
    }
    const handleOpenInteraccion = () => {
        if (canal == 'correo') {
            if (correo && correo.length == 0) {
                confirm({
                    variant: "info",
                    catchOnCancel: true,
                    title: 'No hay correo',
                    description: 'no puede interactuar porque el cliente no tiene correo',
                }).then(() => { })
            } else {
                setOpenDialogCorreoInteraccion(true)
            }
        } else if (canal == 'whatsapp') {
            if (telefono && telefono.length == 0) {
                confirm({
                    variant: "info",
                    catchOnCancel: true,
                    title: 'No hay telefono',
                    description: 'no puede interactuar porque el cliente no tiene un numero de telefono',
                }).then(() => { })
            } else {
                setOpenDialogWhatsappInteraccion(true)
            }
        }
    }
    const handleCloseInteraccion = result => {
        if (result == 'OK') {
            props.refreshData()
        }
        setOpenDialogWhatsappInteraccion(false)
        setOpenDialogCorreoInteraccion(false)
    }
    return (<div>
        <CorreoInteraccion correo={correo} id={idUltimoPropsecto} open={openDialogCorreoInteraccion} handleClose={handleCloseInteraccion} />
        <WhatsappInteraccion telefono={telefono} id={idUltimoPropsecto} open={openDialogWhatsappInteraccion} handleClose={handleCloseInteraccion} />
        <AddInteraccion canal={canal} id={idUltimoPropsecto} open={openDialogAdd} handleClose={handleCloseAddInteraccion} />
        <Button variant={'outlined'} onClick={() => { handleOpenAddInteraccion() }} className={`${classes.interaccionesTableTitleButton} ${classes.interaccionesTableAgregar}`}
            startIcon={<DescriptionIcon />}>Agregar</Button> <Button variant={'outlined'} onClick={() => { handleOpenInteraccion() }} className={`${classes.interaccionesTableTitleButton} ${classes.interaccionesTableGenerar}`}
                startIcon={<AddIcon />}>Interactuar</Button>
    </div>)
}
