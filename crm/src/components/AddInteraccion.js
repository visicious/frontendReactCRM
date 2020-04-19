import React from 'react'
import { Dialog, useMediaQuery, useTheme, DialogTitle, Typography, IconButton, Grid, DialogContent, FormControl, InputLabel, Select, MenuItem, TextField, DialogActions, Button } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import useStyles from '../styles/AddInteraccion';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker, DatePicker, TimePicker, KeyboardDateTimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import axios from 'axios';
import { BackUrl } from '../utilities/const';
import { formatDate } from '../utilities/formaters'
import { userLogged } from '../services/UserService';

export default function AddInteraccion(props) {
    const today = new Date();
    const [validate, setValidate] = React.useState(false)
    const [form, setForm] = React.useState(
        {
            horaFechaInicio: null,
            horaFechaTermino: null,
            estadoInteraccion: 0,
            comentario: ''
        }
    )
    const [formValidation, setFormValidation] = React.useState(
        {
            horaFechaInicio: '',
            horaFechaTermino: '',
            estadoInteraccion: '',
            comentario: ''
        }
    )
    const theme = useTheme();
    const classes = useStyles()
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const restartValidation = () => {
        setValidate(false);
        setFormValidation({
            horaFechaInicio: '',
            horaFechaTermino: '',
            estadoInteraccion: '',
            comentario: ''
        })
    }
    const validateForm = formulario => {
        if (formulario.horaFechaInicio == 'Invalid Date' || formulario.horaFechaTermino == 'Invalid Date') {
            if (formulario.horaFechaInicio == 'Invalid Date') {
                setFormValidation({
                    ...formValidation,
                    horaFechaInicio: 'Fecha Invalida',
                })
            }
            return false
        }
        const validation = {
            horaFechaInicio: '',
            horaFechaTermino: '',
            estadoInteraccion: '',
            comentario: ''
        }
        const formValidationTemp = {
            horaFechaInicio: (formulario.horaFechaInicio == '' || formulario.horaFechaInicio == null) ? 'la fecha no puede ser vacia' : '',
            horaFechaTermino: '',
            estadoInteraccion: '',
            comentario: ''
        }
        setFormValidation(formValidationTemp)
        if (JSON.stringify(formValidationTemp) == JSON.stringify(validation)) {
            return true
        } else {
            return false
        }
    }
    const submit = event => {
        event.preventDefault()
        setValidate(true);
        if (validateForm(form)) {
            let sendedForm = {
                ...form,
                horaFechaInicio: formatDate(form.horaFechaInicio),
                horaFechaTermino: form.horaFechaTermino ? formatDate(form.horaFechaTermino) : null,
                canal: props.canal,
                idProspecto: props.id,
                token: userLogged()
            }
            axios.post(BackUrl + 'interacciones/agregar', sendedForm).then(res => {
                if (res.data.message == 'OK') {
                    setForm({
                        horaFechaInicio: null,
                        horaFechaTermino: null,
                        estadoInteraccion: 0,
                        comentario: ''
                    })
                    props.handleClose('OK')
                }
            }).catch(error => {
                console.log(error)
            })
        } else {
            return
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
    return (
        <Dialog fullWidth={true}
            maxWidth={'sm'}
            fullScreen={fullScreen}
            onClose={props.handleClose}
            aria-labelledby={"dialog-" + props.id}
            open={props.open}
            scroll="paper"
            onBackdropClick={() => { restartValidation() }}>
            <DialogTitle id={"dialog-" + props.id} disableTypography className={classes.root} >
                <Typography variant="h6">Agregar Interaccion</Typography>
                {props.handleClose ? (
                    <IconButton aria-label="close" className={classes.closeButton} type="button" onClick={() => { restartValidation(); props.handleClose() }}>
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
                                        id="horaFechaInicioDate"
                                        label="Inicio Fecha"
                                        value={form.horaFechaInicio}
                                        onChange={(event) => { handleForm(event, 'horaFechaInicio') }}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                        invalidDateMessage={'fecha invalida'}
                                        error={validate && formValidation.horaFechaInicio != ''}
                                        helperText={formValidation.horaFechaInicio}
                                        maxDate={today}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <KeyboardTimePicker
                                        variant={fullScreen ? 'dialog' : 'inline'}
                                        margin="normal"
                                        id="horaFechaInicioTime"
                                        label="Inicio Hora"
                                        value={form.horaFechaInicio}
                                        onChange={(event) => { handleForm(event, 'horaFechaInicio') }}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change time',
                                        }}
                                        invalidDateMessage={'hora invalida'}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <KeyboardDatePicker
                                        variant={fullScreen ? 'dialog' : 'inline'}
                                        format="dd/MM/yyyy"
                                        margin="normal"
                                        id="FechaTerminoDate"
                                        label="Final Fecha"
                                        value={form.horaFechaTermino}
                                        onChange={(event) => { handleForm(event, 'horaFechaTermino') }}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                        invalidDateMessage={'fecha invalida'}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <KeyboardTimePicker
                                        variant={fullScreen ? 'dialog' : 'inline'}
                                        margin="normal"
                                        id="horaFechaTerminoTime"
                                        label="Final Hora"
                                        value={form.horaFechaTermino}
                                        onChange={(event) => { handleForm(event, 'horaFechaTermino') }}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change time',
                                        }}
                                        invalidDateMessage={'hora invalida'}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth style={{ margin: 5 }}>
                                        <InputLabel>Estado de Interaccion</InputLabel>
                                        <Select
                                            value={form.estadoInteraccion}
                                            onChange={(event) => { handleForm(event.target.value, 'estadoInteraccion') }}
                                        >
                                            <MenuItem value={1}>Positivo</MenuItem>
                                            <MenuItem value={0}>Neutro</MenuItem>
                                            <MenuItem value={-1}>Negativo</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="comentarios"
                                        label="comentarios"
                                        multiline
                                        rows="3"
                                        value={form.comentario}
                                        onChange={(event) => { handleForm(event.target.value, 'comentario') }}
                                    />
                                </Grid>
                            </MuiPickersUtilsProvider>
                        </Grid>
                    </div>
                </form>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" className={classes.cancelButton} type="button" onClick={() => { restartValidation(); props.handleClose() }}>
                    Cancelar
                </Button>
                <Button variant="outlined" className={classes.successButton} autoFocus onClick={submit}>
                    Guardar Cambios
                </Button>
            </DialogActions>
        </Dialog>
    )
}
