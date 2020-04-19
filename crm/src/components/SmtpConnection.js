import React from 'react'
import { DialogContent, DialogTitle, Typography, IconButton, Dialog, Grid, useTheme, useMediaQuery, TextField, DialogActions, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import useStyles from '../styles/SmtpConnection';
import axios from 'axios';
import { userLogged } from '../services/UserService';
import { BackUrl } from '../utilities/const';

export default function SmtpConnection(props) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const { modalId, handleClose, open } = props;
    const classes = useStyles()
    const submit = event => {
        setValidate(true)
        event.preventDefault();
        const token = userLogged();
        axios.post(BackUrl + 'usuarios/smtp_registrar', { ...form, token }).then(res => {
            console.log(res)
            if (res.data.message == 'OK') {
                restartValidation();
                handleClose('OK');
            }
        }).catch(error => {
            console.log(error)
        })
    }

    const restartValidation = () => {
        setValidate(false)
        setFormValidation({
            smtpHost: '',
            smtpPuerto: '',
            smtpUsuario: '',
            smtpPassword: '',
        })
    }
    const [validate, setValidate] = React.useState(false);
    const [form, setForm] = React.useState({
        smtpHost: '',
        smtpPuerto: '',
        smtpUsuario: '',
        smtpPassword: '',
    })
    const [formValidation, setFormValidation] = React.useState({
        smtpHost: '',
        smtpPuerto: '',
        smtpUsuario: '',
        smtpPassword: '',
    })
    const handleForm = (value, key) => {
        setForm({
            ...form,
            [key]: value
        })
    }
    return (
        <Dialog fullWidth={true}
            maxWidth={'xs'}
            fullScreen={fullScreen}
            onClose={handleClose}
            aria-labelledby={"dialog-" + modalId}
            open={open}
            scroll="paper">
            <DialogTitle id={"dialog-" + modalId} disableTypography className={classes.root} >
                <Typography variant="h6">Agregar Metas</Typography>
                {handleClose ? (
                    <IconButton aria-label="close" className={classes.closeButton} type="button" onClick={() => { restartValidation(); handleClose() }}>
                        <CloseIcon />
                    </IconButton>
                ) : null}
            </DialogTitle>
            <DialogContent dividers>
                <form onSubmit={submit} autoComplete='off'>
                    <div className={classes.form}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    id={"Host" + modalId}
                                    label="Host"
                                    style={{ margin: 5 }}
                                    fullWidth
                                    value={form.smtpHost}
                                    onChange={(event) => { handleForm(event.target.value, 'smtpHost') }}
                                    error={validate && formValidation.smtpHost != ''}
                                    helperText={formValidation.smtpHost}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id={"Puerto" + modalId}
                                    label="Puerto"
                                    style={{ margin: 5 }}
                                    fullWidth
                                    value={form.smtpPuerto}
                                    onChange={(event) => { handleForm(event.target.value, 'smtpPuerto') }}
                                    error={validate && formValidation.smtpPuerto != ''}
                                    helperText={formValidation.smtpPuerto}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id={"Usuario" + modalId}
                                    label="Usuario"
                                    style={{ margin: 5 }}
                                    fullWidth
                                    value={form.smtpUsuario}
                                    onChange={(event) => { handleForm(event.target.value, 'smtpUsuario') }}
                                    error={validate && formValidation.smtpUsuario != ''}
                                    helperText={formValidation.smtpUsuario}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id={"Password" + modalId}
                                    label="Password"
                                    style={{ margin: 5 }}
                                    fullWidth
                                    value={form.smtpPassword}
                                    onChange={(event) => { handleForm(event.target.value, 'smtpPassword') }}
                                    error={validate && formValidation.smtpPassword != ''}
                                    helperText={formValidation.smtpPassword}
                                    type="password"
                                />
                            </Grid>
                        </Grid>
                    </div>
                </form>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" className={classes.cancelButton} type="button" onClick={() => { restartValidation(); props.handleClose() }}>
                    Cancelar
                </Button>
                <Button variant="outlined" className={classes.successButton} autoFocus onClick={submit}>
                    Conectar
                </Button>
            </DialogActions>
        </Dialog>
    )
}
