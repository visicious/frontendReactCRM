import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import useStyles from '../styles/Card';
import { List, ListItem, ListItemIcon, Divider, Grid, Button, CircularProgress } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import Link from 'next/link'
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import PhoneIcon from '@material-ui/icons/Phone';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import EditCard from './EditCard';
import GavelIcon from '@material-ui/icons/Gavel';
import DeleteCloseCard from './DeleteCloseCard';
import CorreoInteraccion from './CorreoInteraccion';
import { useConfirmation } from '../services/ConfimationService';
import WhatsappInteraccion from './WhatsappInteraccion';
import { colorPrioridad, colorPorcentaje } from '../utilities/Color';
import CorreoConnectar from './CorreoConnectar';
import axios from 'axios';
import { BackUrl } from '../utilities/const';
import { userLogged } from '../services/UserService';

function Card(props) {
  const confirm = useConfirmation()
  const classes = useStyles();
  const isDragDisabled = props.card.id === 'asd';
  const correo = props.card.content.correo
  const telefono = props.card.content.telefono
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openDialogDelete, setOpenDialogDelete] = React.useState(false);
  const [openDialogCorreoInteraccion, setOpenDialogCorreoInteraccion] = React.useState(false)
  const [openDialogWhatsappInteraccion, setOpenDialogWhatsappInteraccion] = React.useState(false)
  const [openDialogConnect, setOpenDialogConnect] = React.useState(false);
  const handleClickOpen = () => {
    setOpenDialog(true);
  };
  const handleClose = result => {
    if (result.message === 'OK') {
      props.renderChange(result.content)
    }
    setOpenDialog(false);
  };
  const handleClickOpenDelete = () => {
    setOpenDialogDelete(true);
  };
  const handleCloseDelete = result => {
    if (result == 'deleted') {
      props.deleteCard(props.card.id)
    }
    setOpenDialogDelete(false);
  };
  const handleOpenInteraccion = value => {
    if (value == 'correo') {
      if (correo.length == 0) {
        confirm({
          variant: "info",
          catchOnCancel: true,
          title: 'No hay correo',
          description: 'no puede interactuar porque el cliente no tiene correo',
        }).then(() => {
        })
      } else {
        let token = userLogged()
        axios.post(BackUrl + 'usuarios/verificar_credenciales', { token }).then(res => {
          console.log(res)
          if (res.data.message == 'OK' && res.data.content == false) {
            setOpenDialogConnect(true)
          } else {
            setOpenDialogCorreoInteraccion(true)
          }
        }).catch(error => {
          console.log(error)
        })
      }
    } else if (value == 'whatsapp') {
      if (telefono.length == 0) {
        confirm({
          variant: "info",
          catchOnCancel: true,
          title: 'No hay telefono',
          description: 'no puede interactuar porque el cliente no tiene un numero de telefono',
        }).then(() => {
        })
      } else {
        setOpenDialogWhatsappInteraccion(true)
      }
    }
  }
  const handleCloseCorreoInteraccion = result => {
    setOpenDialogWhatsappInteraccion(false)
    setOpenDialogCorreoInteraccion(false)
  }
  const handleCloseConnect = result => {
    setOpenDialogConnect(false)
  }
  function tiempoSinContacto() {
    if (props.card.content.tiempoSinContactoNumber != null) {
      return (
        <div style={{ color: ((props.card.content.tiempoSinContactoNumber <= 2) ? 'green' : (props.card.content.tiempoSinContactoNumber <= 6 ? 'orange' : 'red')) }}>
          {props.card.content.tiempoSinContacto}
        </div>
      )
    } else {
      return <div style={{ height: 20 }}></div>
    }
  }
  return (
    <Draggable draggableId={props.card.id}
      index={props.index}
      isDragDisabled={isDragDisabled}
    >
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={`${snapshot.isDragging ? classes.dragging : ''} ${classes.card} ${isDragDisabled ? classes.dragDisabled : ''}`}
        >
          {/* <div className={classes.handle} {...provided.dragHandleProps}>
          </div> */}
          <EditCard open={openDialog} handleClose={handleClose} data={props.card} modalId={props.card.id} />
          <CorreoInteraccion id={props.card.content.id} open={openDialogCorreoInteraccion} handleClose={handleCloseCorreoInteraccion} correo={correo} />
          <WhatsappInteraccion id={props.card.content.id} open={openDialogWhatsappInteraccion} handleClose={handleCloseCorreoInteraccion} telefono={telefono} />
          <CorreoConnectar id={props.card.content.id} open={openDialogConnect} handleClose={handleCloseConnect} modalId={'conectarEmail'} />
          <DeleteCloseCard open={openDialogDelete} handleClose={handleCloseDelete} data={props.card} modalId={props.card.id} />
          <div className={classes.container}>
            <List className={classes.leftList}>
              <ListItem className={classes.leftListItem}>
                <ListItemIcon className={classes.leftListItemIcon}>
                  <Button variant="outlined" className={`${classes.leftListButton} ${classes.darkButton}`} onClick={handleClickOpen}>
                    <EditIcon className={classes.leftListIcon} />
                  </Button>
                </ListItemIcon>
              </ListItem>
              <ListItem className={classes.leftListItem}>
                <ListItemIcon className={classes.leftListItemIcon}>
                  <Button variant="outlined" className={`${classes.leftListButton} ${classes.darkButton}`} onClick={handleClickOpenDelete}>
                    <GavelIcon className={classes.leftListIcon} />
                  </Button>
                </ListItemIcon>
              </ListItem>
            </List>
            <div className={classes.cardInfo}>
              <div className={classes.title}>
                <Link href="/usuario/[props.card.content.idCliente]" as={`/usuario/${props.card.content.idCliente}`}>
                  <a className={classes.linkUsuario}>
                    {props.card.content.titulo}
                  </a>
                </Link>
                <div>
                  <div className={classes.prioridad} style={{ backgroundColor: colorPrioridad(parseInt(props.card.content.prioridad)), color: props.card.content.prioridadColorText }}>
                    <div>
                      {props.card.content.prioridad}
                    </div>
                  </div>
                </div>
              </div>
              <div className={classes.porcentajeWrapper}>
                {tiempoSinContacto()}
                <div className={classes.porcentajeCierre}>{props.card.content.porcentajeCierre}</div>
                <CircularProgress variant="static" value={props.card.content.porcentajeCierre ? parseInt(props.card.content.porcentajeCierre) : 0} style={{ color: colorPorcentaje(parseInt(props.card.content.porcentajeCierre)) }} className={classes.porcentaje} size={24} thickness={8} />
              </div>
            </div>
          </div>
          <div className={classes.interacciones}>
            <div className={classes.interaccionesButtons}>
              <Button variant="outlined" onClick={() => { handleOpenInteraccion('whatsapp') }} className={`${classes.interaccionesButton} ${classes.darkButton}`}>
                {props.card.content.interacciones.whatsapp} &nbsp;<WhatsAppIcon />
              </Button>
            </div>
            <div className={classes.interaccionesButtons}>
              <Button variant="outlined" className={`${classes.interaccionesButton} ${classes.darkButton}`}>
                {props.card.content.interacciones.telefono} &nbsp;<PhoneIcon />
              </Button>
            </div>
            <div className={classes.interaccionesButtons}>
              <Button variant="outlined" onClick={() => { handleOpenInteraccion('correo') }} className={`${classes.interaccionesButton} ${classes.darkButton}`}>
                {props.card.content.interacciones.correo} &nbsp;<MailOutlineIcon />
              </Button>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  )
}

export default Card
