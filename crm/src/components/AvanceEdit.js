import React from 'react'
import { useTheme, useMediaQuery, DialogContent, Grid, DialogActions, Button, Dialog, Typography, DialogTitle, IconButton, TextField } from '@material-ui/core';
import useStyles from '../styles/AvanceEdit';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';
import { userLogged } from '../services/UserService';
import { BackUrl } from '../utilities/const';

export default function AvanceEdit(props) {
    const { avance, id, modalId, handleClose, open } = props
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const classes = useStyles()
    const restartValidation = () => {
        setValidate(false)
        setFormValidation({
            objetivo: '',
            valor: ''
        })
    }
    const submit = event => {
        event.preventDefault();
        let token = userLogged();
        axios.post(BackUrl + 'estadisticas/actualizar/meta', { avance: form.avance, token, id }).then(res => {
            console.log(res)
            if (res.data.message == 'OK') {
                handleClose('OK')
            }
        }).catch(error => {
            console.log(error)
        });
    }
    const handleForm = (value, key) => {
        setForm({
            ...form,
            [key]: value
        })
    }
    const [validate, setValidate] = React.useState(false);
    const [form, setForm] = React.useState({
        avance,
    })
    const [formValidation, setFormValidation] = React.useState({
        avance: '',
    })
    return (
        <Dialog fullWidth={true}
            maxWidth={'sm'}
            fullScreen={fullScreen}
            onClose={handleClose}
            aria-labelledby={"dialog-" + modalId}
            open={open}
            scroll="paper">
            <DialogTitle id={"dialog-" + modalId} disableTypography className={classes.root} >
                <Typography variant="h6">Editar Avance</Typography>
                {handleClose ? (
                    <IconButton aria-label="close" className={classes.closeButton} type="button" onClick={() => { restartValidation(); handleClose() }}>
                        <CloseIcon />
                    </IconButton>
                ) : null}
            </DialogTitle>
            <DialogContent dividers>
                <form onSubmit={submit} autoComplete="off">
                    <div className={classes.form}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    id={"Avance" + modalId}
                                    label="Avance"
                                    style={{ margin: 5 }}
                                    fullWidth
                                    value={form.avance}
                                    onChange={(event) => { handleForm(event.target.value, 'avance') }}
                                    margin="normal"
                                    error={validate && formValidation.avance != ''}
                                    helperText={formValidation.avance}
                                    type="number"
                                />
                            </Grid>
                        </Grid>
                    </div>
                </form>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" className={classes.cancelButton} type="button" onClick={() => { restartValidation(); handleClose() }}>
                    Cancelar
                </Button>
                <Button variant="outlined" className={classes.successButton} autoFocus onClick={submit}>
                    Guardar Cambios
                </Button>
            </DialogActions>
        </Dialog>
    )
}
