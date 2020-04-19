import React, { useEffect } from 'react'
import { Dialog, useTheme, useMediaQuery, DialogContent, Grid, DialogTitle, Typography, IconButton, DialogActions, Button } from '@material-ui/core'
import useStyles from '../styles/AddInteraccion';
import { MuiPickersUtilsProvider, KeyboardDatePicker, KeyboardTimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import CloseIcon from '@material-ui/icons/Close'
import { formatDate } from '../utilities/formaters';
import { userLogged } from '../services/UserService';
import axios from 'axios'
import { BackUrl } from '../utilities/const';

export default function EditFechaInteraccion(props) {
    const { horaFechaInicio, horaFechaTermino, settedData, setSettedData } = props
    useEffect(() => {
        if (!settedData) {
            setForm(
                {
                    horaFechaTermino: horaFechaTermino ? new Date(horaFechaTermino) : null,
                })
            setSettedData(true)
        }
    })
    const theme = useTheme();
    const classes = useStyles()
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [validate, setValidate] = React.useState(false)
    const [form, setForm] = React.useState(
        {
            horaFechaTermino: horaFechaTermino ? new Date(horaFechaTermino) : null,
        }
    )
    const [formValidation, setFormValidation] = React.useState(
        {
            horaFechaTermino: '',
        }
    )
    const validateForm = formulario => {
        if (formulario.horaFechaTermino == 'Invalid Date') {
            setFormValidation({
                ...formValidation,
                horaFechaTermino: 'Fecha Invalida',
            })
            return false
        }
        if (new Date(form.horaFechaTermino) < new Date(horaFechaInicio) && form.horaFechaTermino != null) {
            setFormValidation({
                ...formValidation,
                horaFechaTermino: 'La fecha no puede ser menor a la fecha de inicio',
            })
            return false
        }
        const validation = {
            horaFechaTermino: '',
        }
        const formValidationTemp = {
            horaFechaTermino: (formulario.horaFechaTermino == '' || formulario.horaFechaTermino == null) ? 'la fecha no puede ser vacia' : '',
        }
        setFormValidation(formValidationTemp)
        if (JSON.stringify(formValidationTemp) == JSON.stringify(validation)) {
            return true
        } else {
            return false
        }
    }
    const handleForm = (value, key) => {
        const tempForm = {
            ...form,
            [key]: value
        }
        setForm({
            ...form,
            [key]: value
        })
        if (validate) {
            validateForm(tempForm)
        }
    }
    const submit = event => {
        event.preventDefault()
        setValidate(true);
        if (validateForm(form)) {
            let sendedForm = {
                horaFechaTermino: formatDate(form.horaFechaTermino),
                id: props.id,
                token: userLogged()
            }
            axios.post(BackUrl + 'interacciones/colocar_termino', sendedForm).then(res => {
                if (res.data.message == 'OK') {
                    props.handleClose('OK')
                }
            }).catch(error => {
                console.log(error)
            })
        } else {
            return
        }
    }
    return (
        <Dialog fullWidth={true}
            maxWidth={'sm'}
            fullScreen={fullScreen}
            onClose={props.handleClose}
            aria-labelledby={"dialog-" + props.id}
            open={props.open}
            scroll="paper">
            <DialogTitle id={"dialog-" + props.id} disableTypography className={classes.root} >
                <Typography variant="h6">Agregar Interaccion</Typography>
                {props.handleClose ? (
                    <IconButton aria-label="close" className={classes.closeButton} type="button" onClick={props.handleClose}>
                        <CloseIcon />
                    </IconButton>
                ) : null}
            </DialogTitle>
            <DialogContent dividers>
                <form onSubmit={submit} autoComplete="off">
                    <div className={classes.form}>
                        <Grid container spacing={2}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid item xs={6}>
                                    <KeyboardDatePicker
                                        variant={fullScreen ? 'dialog' : 'inline'}
                                        format="dd/MM/yyyy"
                                        margin="normal"
                                        id="horaFechaTerminoDate"
                                        label="Fecha Termino"
                                        value={form.horaFechaTermino}
                                        onChange={(event) => { handleForm(event, 'horaFechaTermino') }}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                        invalidDateMessage={'fecha invalida'}
                                        error={validate && formValidation.horaFechaTermino != ''}
                                        helperText={formValidation.horaFechaTermino}
                                        minDate={new Date(horaFechaInicio)}
                                        minDateMessage={'La fecha no puede ser menor a la fecha de inicio'}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <KeyboardTimePicker
                                        variant={fullScreen ? 'dialog' : 'inline'}
                                        margin="normal"
                                        id="horaFechaTerminoTime"
                                        label="Hora Termino"
                                        value={form.horaFechaTermino}
                                        onChange={(event) => { handleForm(event, 'horaFechaTermino') }}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change time',
                                        }}
                                        invalidDateMessage={'hora invalida'}
                                    />
                                </Grid>
                            </MuiPickersUtilsProvider>
                        </Grid>
                    </div>
                </form>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" className={classes.cancelButton} type="button" onClick={props.handleClose}>
                    Cancelar
                </Button>
                <Button variant="outlined" className={classes.successButton} autoFocus onClick={submit}>
                    Guardar Cambios
                </Button>
            </DialogActions>
        </Dialog>
    )
}
