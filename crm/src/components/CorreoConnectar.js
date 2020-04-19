import React from 'react'
import { Dialog, useTheme, useMediaQuery, DialogTitle, DialogContent, Button, Typography, IconButton } from '@material-ui/core'
import useStyles from '../styles/CorreoConectar';
import CloseIcon from '@material-ui/icons/Close';
import SmtpConnection from './smtpConnection';
import axios from 'axios';
import { BackUrl } from '../utilities/const';

export default function CorreoConnectar(props) {
    const { handleClose, open, modalId } = props
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const classes = useStyles();
    const [openSmtpConnection, setOpenSmtpConnection] = React.useState(false);
    const handleCloseSmtp = result => {
        setOpenSmtpConnection(false);
        if (result == 'OK') {
            handleClose()
        }
    }
    const handleOpenSmtp = () => {
        setOpenSmtpConnection(true);
    }
    const exchangeConnection = () => {
        axios.get(BackUrl+'usuarios/exchange_registrar').then(res=>{
            console.log(res)
            if(res.data.message=='OK'){
                window.open(res.data.content);
            }
        }).catch(error=>{
            console.log(error)
        })
    }
    return (
        <Dialog fullWidth
            maxWidth={'xs'}
            fullScreen={fullScreen}
            onClose={handleClose}
            aria-labelledby={"dialog-" + modalId}
            open={open}
            scroll="paper">
            <SmtpConnection modalId="smtpConecction" handleClose={handleCloseSmtp} open={openSmtpConnection} />
            <DialogTitle id={"dialog-" + modalId} disableTypography className={classes.root} >
                <Typography variant="h6">Conectar Correo</Typography>
                {handleClose ? (
                    <IconButton aria-label="close" className={classes.closeButton} type="button" onClick={() => { handleClose() }}>
                        <CloseIcon />
                    </IconButton>
                ) : null}
            </DialogTitle>
            <DialogContent dividers>
                <div className={classes.form}>
                    <div style={{ marginBottom: 7 }}>
                        <Typography variant="body1">
                            Parece que no estas conectado, sincroniza tu correo
                        </Typography>
                    </div>
                    <div>
                        <Button variant="outlined" className={classes.successButton} onClick={exchangeConnection} style={{ marginBottom: 5 }}>Conectar con exchange</Button>
                        <Button variant="outlined" className={classes.successButton} onClick={handleOpenSmtp}>Conectar con smtp</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
