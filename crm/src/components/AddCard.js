import React from 'react';
import axios from 'axios';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import { Dialog, Typography, Button, IconButton, TextField, Grid, Hidden, InputLabel, FormControl, Select, MenuItem, RadioGroup, FormControlLabel, Radio, DialogTitle, DialogContent, DialogActions, InputAdornment, NoSsr } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import useStyles from '../styles/AddCard';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { lengthValidation, minMaxValidation, emailValidation } from '../utilities/validator'
import { formatDate } from '../utilities/formaters'
import { BackUrl } from '../utilities/const';
import { userLogged } from '../services/UserService';
import MuiPhoneInput from 'material-ui-phone-number';
import dynamic from 'next/dynamic';

function AddCard(props) {
    const today = new Date();
    const [validate, setValidate] = React.useState(false)
    const validateForm = (formulario) => {
        const validation = {
            nombres: '',
            apellidos: '',
            ruc: '',
            empresa: '',
            correo: '',
            telefono: '',
            prioridad: '',
            porcentajeCierre: '',
            fechaContacto: '',
        }
        let formValidationTemp = {}
        if (formulario.tipo == "persona") {
            formValidationTemp = {
                ...FormValidation,
                empresa: '',
                ruc: '',
                nombres: lengthValidation(formulario.nombres, 3),
                apellidos: lengthValidation(formulario.apellidos, 3),
                correo: emailValidation(formulario.correo),
                // telefono: lengthValidation(formulario.telefono, 9),
                prioridad: (!formulario.prioridad || formulario.prioridad.length == 0) ? lengthValidation(formulario.prioridad, 0) : minMaxValidation(formulario.prioridad, 1, 10),
                porcentajeCierre: (!formulario.porcentajeCierre || formulario.porcentajeCierre.length == 0) ? '' : minMaxValidation(formulario.porcentajeCierre, 0, 100),
                fechaContacto: formulario.fechaContacto == 'NaN-NaN-NaNT00:00:00' ? 'Fecha Invalida' : (today < new Date(formulario.fechaContacto) ? 'La fecha no puede ser mayor' : ''),
            }
            setFormValidation(
                {
                    ...FormValidation,
                    empresa: '',
                    ruc: '',
                    nombres: lengthValidation(formulario.nombres, 3),
                    apellidos: lengthValidation(formulario.apellidos, 3),
                    correo: emailValidation(formulario.correo),
                    // telefono: lengthValidation(formulario.telefono, 9),
                    prioridad: (!formulario.prioridad || formulario.prioridad.length == 0) ? lengthValidation(formulario.prioridad, 0) : minMaxValidation(formulario.prioridad, 1, 10),
                    porcentajeCierre: (!formulario.porcentajeCierre || formulario.porcentajeCierre.length == 0) ? '' : minMaxValidation(formulario.porcentajeCierre, 0, 100),
                    fechaContacto: formulario.fechaContacto == 'NaN-NaN-NaNT00:00:00' ? 'Fecha Invalida' : (today < new Date(formulario.fechaContacto) ? 'La fecha no puede ser mayor' : ''),
                }
            )
        } else {
            formValidationTemp = {
                ...FormValidation,
                nombres: '',
                apellidos: '',
                empresa: lengthValidation(formulario.empresa, 3),
                ruc: '',
                correo: emailValidation(formulario.correo),
                // telefono: lengthValidation(formulario.telefono, 9),
                prioridad: (!formulario.prioridad || formulario.prioridad.length == 0) ? lengthValidation(formulario.prioridad, 0) : minMaxValidation(formulario.prioridad, 1, 10),
                porcentajeCierre: (!formulario.porcentajeCierre || formulario.porcentajeCierre.length == 0) ? '' : minMaxValidation(formulario.porcentajeCierre, 0, 100),
                fechaContacto: formulario.fechaContacto == 'NaN-NaN-NaNT00:00:00' ? 'Fecha Invalida' : (today < new Date(formulario.fechaContacto) ? 'La fecha no puede ser mayor' : ''),
            }
            setFormValidation(
                {
                    ...FormValidation,
                    nombres: '',
                    apellidos: '',
                    empresa: lengthValidation(formulario.empresa, 3),
                    ruc: '',
                    correo: emailValidation(formulario.correo),
                    // telefono: lengthValidation(formulario.telefono, 9),
                    prioridad: (!formulario.prioridad || formulario.prioridad.length == 0) ? lengthValidation(formulario.prioridad, 0) : minMaxValidation(formulario.prioridad, 1, 10),
                    porcentajeCierre: (!formulario.porcentajeCierre || formulario.porcentajeCierre.length == 0) ? '' : minMaxValidation(formulario.porcentajeCierre, 0, 100),
                    fechaContacto: formulario.fechaContacto == 'NaN-NaN-NaNT00:00:00' ? 'Fecha Invalida' : (today < new Date(formulario.fechaContacto) ? 'La fecha no puede ser mayor' : ''),
                }
            )
        }
        console.log(validation);
        console.log(JSON.stringify(formValidationTemp));
        if (JSON.stringify(validation) != JSON.stringify(formValidationTemp)) {
            return false
        } else {
            return true
        }
    }
    const submit = result => {
        setValidate(true)
        result.preventDefault()
        if (validateForm(Form)) {
            let sendedForm = {
                ...Form,
                titulo: Form.tipo == 'persona' ? Form.nombres + ' ' + Form.apellidos : Form.empresa + ' ' + Form.ruc,
                prioridad: parseInt(Form.prioridad),
                porcentajeCierre: (Form.porcentajeCierre == '') ? 0 : parseInt(Form.porcentajeCierre)
            }
            let formDataBase = {
                prospecto: {
                    porcentajeCierre: sendedForm.porcentajeCierre,
                    prioridad: sendedForm.prioridad,
                    idEstadoEmbudoVenta: parseInt(props.modalId.split('-')[1]),
                    horaFechaContacto: sendedForm.fechaContacto,
                },
                cliente: {
                    empresa: sendedForm.empresa,
                    ruc: sendedForm.ruc,
                    nombres: sendedForm.nombres,
                    apellidos: sendedForm.apellidos,
                    genero: sendedForm.genero,
                    direccion: sendedForm.direccion,
                    comentario: sendedForm.comentario,
                    telefono: sendedForm.telefono,
                    correo: sendedForm.correo
                },
            }
            if (Form.tipo == 'persona') {
                delete formDataBase.cliente.empresa
                delete formDataBase.cliente.ruc
            } else {
                delete formDataBase.cliente.nombres
                delete formDataBase.cliente.apellidos
                delete formDataBase.cliente.genero
            }
            formDataBase.token = userLogged()
            axios.post(BackUrl + 'tableros/prospectos/agregar', formDataBase).then(res => {
                console.log(res);
                if (res.data.prospecto.message == 'OK' && res.data.cliente.message == 'OK') {
                    setValidate(false)
                    setForm(
                        {
                            tipo: 'persona',
                            titulo: '',
                            nombres: '',
                            apellidos: '',
                            ruc: '',
                            empresa: '',
                            genero: '',
                            telefono: '',
                            correo: '',
                            porcentajeCierre: '',
                            prioridad: '',
                            fechaContacto: null,
                            direccion: '',
                            comentario: ''
                        }
                    )
                    props.handleClose({ message: 'OK', content: { id: props.modalId, content: res.data.content } })
                }
            }).catch(error => {
                console.log(error)
            })
        } else {
            return false
        }
    }
    const [FormValidation, setFormValidation] = React.useState(
        {
            nombres: '',
            apellidos: '',
            ruc: '',
            empresa: '',
            correo: '',
            telefono: '',
            prioridad: '',
            porcentajeCierre: '',
            fechaContacto: '',
        }
    )
    const [Form, setForm] = React.useState(
        {
            tipo: 'persona',
            titulo: '',
            nombres: '',
            apellidos: '',
            ruc: '',
            empresa: '',
            genero: '',
            telefono: '',
            correo: '',
            porcentajeCierre: '',
            prioridad: '',
            fechaContacto: null,
            direccion: '',
            comentario: ''
        }
    );
    const restartValidation = () => {
        setValidate(false)
        setFormValidation({
            nombres: '',
            apellidos: '',
            ruc: '',
            empresa: '',
            correo: '',
            telefono: '',
            prioridad: '',
            porcentajeCierre: '',
            fechaContacto: '',
        })
    }
    const handleForm = (value, key) => {
        console.log(value);
        if (key == "fechaContacto") {
            value = (value != '' && value != null) ? formatDate(value) : ''
        }
        const tempForm = {
            ...Form,
            [key]: value
        }
        setForm({
            ...Form,
            [key]: value
        })
        if (validate) {
            validateForm(tempForm)
        }
    }
    const { classes } = props;
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    return (
        <Dialog fullWidth={true}
            maxWidth={'sm'}
            fullScreen={fullScreen}
            onClose={props.handleClose}
            aria-labelledby={"dialog-" + props.modalId}
            open={props.open}
            scroll="paper"
            onBackdropClick={() => { restartValidation() }}>
            <DialogTitle id={"dialog-" + props.modalId} disableTypography className={classes.root} >
                <Typography variant="h6">Agregar Prospecto</Typography>
                {props.handleClose ? (
                    <IconButton aria-label="close" className={classes.closeButton} type="button" onClick={() => { restartValidation(); props.handleClose() }}>
                        <CloseIcon />
                    </IconButton>
                ) : null}
            </DialogTitle>
            <DialogContent dividers>
                <form onSubmit={submit} autoComplete='off'>
                    <div className={classes.form}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} className={classes.gridRadio}>
                                <FormControl>
                                    <RadioGroup className={classes.radioGroup} aria-label="tipo" name="tipo" value={Form.tipo} onChange={(event) => setForm({ ...Form, tipo: event.target.value })} >
                                        <FormControlLabel value={"persona"} control={<Radio color="default" className={classes.radioButton} />} label="Persona" />
                                        <FormControlLabel value={"empresa"} control={<Radio color="default" className={classes.radioButton} />} label="Empresa" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                {(Form.tipo == 'persona') ?
                                    (<Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <TextField
                                                id={"Nombres" + props.modalId}
                                                label="Nombres"
                                                style={{ margin: 5 }}
                                                fullWidth
                                                value={Form.nombres}
                                                onChange={(event) => { handleForm(event.target.value, 'nombres') }}
                                                margin="normal"
                                                error={validate && FormValidation.nombres != ''}
                                                helperText={FormValidation.nombres}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                id={"Apellidos" + props.modalId}
                                                label="Apellidos"
                                                style={{ margin: 5 }}
                                                fullWidth
                                                onChange={(event) => { handleForm(event.target.value, 'apellidos') }}
                                                margin="normal"
                                                error={validate && FormValidation.apellidos != ''}
                                                helperText={FormValidation.apellidos}
                                            />
                                        </Grid>
                                        <Grid item sm={4} xs={6}>
                                            <FormControl fullWidth style={{ margin: 5 }}>
                                                <InputLabel>Genero</InputLabel>
                                                <Select
                                                    value={Form.genero}
                                                    onChange={(event) => { handleForm(event.target.value, 'genero') }}
                                                >
                                                    <MenuItem value="">Ninguno</MenuItem>
                                                    <MenuItem value={"H"}>Hombre</MenuItem>
                                                    <MenuItem value={"M"}>Mujer</MenuItem>
                                                    <MenuItem value={"NA"}>Prefiero no decirlo</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item sm={4} xs={6}>
                                            {/* <TextField
                                                id={"Telefono" + props.modalId}
                                                label="Telefono"
                                                style={{ margin: 5 }}
                                                value={Form.telefono}
                                                onChange={(event) => { handleForm(event.target.value, 'telefono') }}
                                                type="number"
                                                fullWidth
                                                margin="normal"
                                                error={validate && FormValidation.telefono != ''}
                                                helperText={FormValidation.telefono}
                                            /> */}
                                                <MuiPhoneInput
                                                    defaultCountry={'pe'}
                                                    id={"Telefono" + props.modalId}
                                                    label="Telefono"
                                                    style={{ margin: 5 }}
                                                    fullWidth
                                                    value={Form.telefono}
                                                    localization={{'Germany': 'Deutschland', 'Spain': 'España'}}
                                                    onChange={(event) => { handleForm(event, 'telefono') }}
                                                    error={validate && FormValidation.telefono != ''}
                                                    helperText={FormValidation.telefono}
                                                />
                                        </Grid>
                                        <Grid item sm={4} xs={12}>
                                            <TextField
                                                id={"Correo" + props.modalId}
                                                label="Correo"
                                                style={{ margin: 5 }}
                                                value={Form.correo}
                                                onChange={(event) => { handleForm(event.target.value, 'correo') }}
                                                type="email"
                                                fullWidth
                                                margin="normal"
                                                error={validate && FormValidation.correo != ''}
                                                helperText={FormValidation.correo}
                                            />
                                        </Grid>
                                    </Grid>) : (<Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <TextField
                                                id={"Razon-social-" + props.modalId}
                                                label="Razon social"
                                                style={{ margin: 5 }}
                                                fullWidth
                                                type="text"
                                                value={Form.empresa}
                                                onChange={(event) => { handleForm(event.target.value, 'empresa') }}
                                                margin="normal"
                                                error={validate && FormValidation.empresa != ''}
                                                helperText={FormValidation.empresa}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                id={"ruc-" + props.modalId}
                                                label="RUC"
                                                style={{ margin: 5 }}
                                                fullWidth
                                                type="number"
                                                defaultValue={Form.ruc}
                                                onChange={(event) => { handleForm(event.target.value, 'ruc') }}
                                                margin="normal"
                                                error={validate && FormValidation.ruc != ''}
                                                helperText={FormValidation.ruc}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                id={"Telefono" + props.modalId}
                                                label="Telefono"
                                                style={{ margin: 5 }}
                                                value={Form.telefono}
                                                onChange={(event) => { handleForm(event.target.value, 'telefono') }}
                                                type="number"
                                                fullWidth
                                                margin="normal"
                                                error={validate && FormValidation.telefono != ''}
                                                helperText={FormValidation.telefono}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                id={"Correo" + props.modalId}
                                                label="Correo"
                                                style={{ margin: 5 }}
                                                value={Form.correo}
                                                onChange={(event) => { handleForm(event.target.value, 'correo') }}
                                                type="email"
                                                fullWidth
                                                margin="normal"
                                                error={validate && FormValidation.correo != ''}
                                                helperText={FormValidation.correo}
                                            />
                                        </Grid>
                                    </Grid>)}
                            </Grid>
                            <Grid item sm={4} xs={6}>
                                <TextField
                                    id={"prioridad" + props.modalId}
                                    label="Prioridad"
                                    style={{ margin: 5 }}
                                    value={Form.prioridad}
                                    onChange={(event) => { handleForm(event.target.value, 'prioridad') }}
                                    type="number"
                                    fullWidth
                                    margin="normal"
                                    error={validate && FormValidation.prioridad != ''}
                                    helperText={FormValidation.prioridad}
                                    inputProps={{ min: "0", max: "10" }}
                                />
                            </Grid>
                            <Grid item sm={4} xs={6}>
                                <TextField
                                    id={"porcentajeCierre" + props.modalId}
                                    label="Porcentaje de cierre"
                                    style={{ margin: 5 }}
                                    value={Form.porcentajeCierre}
                                    onChange={(event) => { handleForm(event.target.value, 'porcentajeCierre') }}
                                    type="number"
                                    fullWidth
                                    margin="normal"
                                    error={validate && FormValidation.porcentajeCierre != ''}
                                    helperText={FormValidation.porcentajeCierre}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">%</InputAdornment>
                                    }}
                                    inputProps={{ min: "0", max: "10" }}
                                />
                            </Grid>
                            <Grid item sm={4} xs={12}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        variant={fullScreen ? 'dialog' : 'inline'}
                                        format="dd/MM/yyyy"
                                        style={{ margin: 5, width: '100%' }}
                                        id={"date-picker-inline" + props.modalId}
                                        label="Fecha de contacto"
                                        value={Form.fechaContacto}
                                        onChange={(event) => { handleForm(event, 'fechaContacto') }}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                        maxDate={today}
                                        error={validate && FormValidation.fechaContacto != ''}
                                        helperText={FormValidation.fechaContacto}
                                    />
                                </MuiPickersUtilsProvider>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id={"direccion" + props.modalId}
                                    label="Direccion"
                                    fullWidth
                                    style={{ margin: 5 }}
                                    value={Form.direccion}
                                    onChange={(event) => setForm({ ...Form, direccion: event.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id={"comentarios" + props.modalId}
                                    label="Comentarios"
                                    multiline
                                    style={{ margin: 5 }}
                                    fullWidth
                                    rows="3"
                                    value={Form.comentario}
                                    onChange={(event) => setForm({ ...Form, comentario: event.target.value })}
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
                    Guardar Cambios
                </Button>
            </DialogActions>
        </Dialog >
    )
}
export default withStyles(useStyles)(AddCard);