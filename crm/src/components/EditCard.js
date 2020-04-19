import 'date-fns';
import React from 'react';
import axios from 'axios';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { Dialog, Typography, Button, IconButton, TextField, Grid, Hidden, FormControl, Select, InputLabel, MenuItem, InputAdornment } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import useStyles from '../styles/EditCard';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { formatDate } from '../utilities/formaters';
import { lengthValidation, minMaxValidation, emailValidation } from '../utilities/validator'
import { BackUrl } from '../utilities/const';
import { userLogged } from '../services/UserService';
import MuiPhoneInput from 'material-ui-phone-number';

const DialogTitle = withStyles(useStyles)(props => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} type="button" onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles(theme => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

function EditCard(props) {
    const today = new Date();
    const validateForm = (formulario) => {
        const validation = {
            nombres: '',
            apellidos: '',
            ruc: '',
            empresa: '',
            prioridad: '',
            porcentajeCierre: '',
            fechaContacto: '',
            telefono: [
                '', ''
            ],
            correo: [
                '', ''
            ]
        }
        let formValidationTemp = {}
        if (formulario.tipo == "persona") {
            formValidationTemp = {
                ...FormValidation,
                empresa: '',
                ruc: '',
                nombres: lengthValidation(formulario.nombres, 3),
                apellidos: lengthValidation(formulario.apellidos, 3),
                prioridad: (!formulario.prioridad || formulario.prioridad.length == 0) ? lengthValidation(formulario.prioridad, 0) : minMaxValidation(formulario.prioridad, 1, 10),
                porcentajeCierre: (!formulario.porcentajeCierre || formulario.porcentajeCierre.length == 0) ? '' : minMaxValidation(formulario.porcentajeCierre, 0, 100),
                fechaContacto: formulario.fechaContacto == 'NaN-NaN-NaNT00:00:00' ? 'Fecha Invalida' : (today < new Date(formulario.fechaContacto) ? 'La fecha no puede ser mayor' : ''),
                telefono: [
                    lengthValidation(formulario.telefono[0], 9), formulario.telefono[1]?.length > 0 ? lengthValidation(formulario.telefono[1], 9) : ''
                ],
                correo: [
                    emailValidation(formulario.correo[0]), formulario.correo[1]?.length > 0 ? emailValidation(formulario.correo[1]) : ''
                ],
            }
        } else {
            formValidationTemp = {
                ...FormValidation,
                nombres: '',
                apellidos: '',
                empresa: lengthValidation(formulario.empresa, 3),
                ruc: '',
                prioridad: (!formulario.prioridad || formulario.prioridad.length == 0) ? lengthValidation(formulario.prioridad, 0) : minMaxValidation(formulario.prioridad, 1, 10),
                porcentajeCierre: (!formulario.porcentajeCierre || formulario.porcentajeCierre.length == 0) ? '' : minMaxValidation(formulario.porcentajeCierre, 0, 100),
                fechaContacto: formulario.fechaContacto == 'NaN-NaN-NaNT00:00:00' ? 'Fecha Invalida' : (today < new Date(formulario.fechaContacto) ? 'La fecha no puede ser mayor' : ''),
                telefono: [
                    lengthValidation(formulario.telefono[0], 9), formulario.telefono[1]?.length > 0 ? lengthValidation(formulario.telefono[1], 9) : ''
                ],
                correo: [
                    emailValidation(formulario.correo[0]), formulario.correo[1]?.length > 0 ? emailValidation(formulario.correo[1]) : ''
                ],
            }
        }
        setFormValidation(formValidationTemp)
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
                porcentajeCierre: (Form.porcentajeCierre && Form.porcentajeCierre == '') ? null : parseInt(Form.porcentajeCierre)
            }
            sendedForm.token = userLogged()
            axios.post(BackUrl + 'tableros/prospectos/editar', sendedForm).then(res => {
                setValidate(false)
                console.log(res.data.content)
                props.handleClose({ message: 'OK', content: { id: props.modalId, content: res.data.content } })
            }).catch(error => {
                console.log(error)
            })
        } else {
            return false
        }
    }
    const handleForm = (value, key, i = 0) => {
        if (key == "fechaContacto") {
            value = (value != '' && value != null) ? formatDate(value) : ''
        }
        if (key == 'telefono' || key == 'correo') {
            let newArray = [...Form[key]]
            newArray[i] = value
            value = newArray
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
    const [validate, setValidate] = React.useState(false);
    const [FormValidation, setFormValidation] = React.useState(
        {
            nombres: '',
            apellidos: '',
            ruc: '',
            empresa: '',
            prioridad: '',
            porcentajeCierre: '',
            fechaContacto: '',
            telefono: [
                '', ''
            ],
            correo: [
                '', ''
            ]
        }
    )
    const [Form, setForm] = React.useState(props.data.content);
    const { classes } = props
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    return (
        <Dialog fullWidth={true}
            maxWidth={'sm'}
            fullScreen={fullScreen}
            onClose={props.handleClose}
            aria-labelledby={"edit-dialog-" + props.modalId}
            open={props.open}>
            <DialogTitle id={"edit-dialog-" + props.modalId} onClose={props.handleClose}>
                Editar Prospecto
            </DialogTitle>
            <DialogContent dividers>
                <div className={classes.form}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            {Form.tipo == 'persona' ?
                                <Grid container spacing={2}>
                                    <Grid item xs={4}>
                                        <TextField
                                            id={"Nombres" + props.modalId}
                                            label="Nombres"
                                            style={{ margin: 5 }}
                                            fullWidth
                                            defaultValue={Form.nombres}
                                            onChange={(event) => { handleForm(event.target.value, 'nombres') }}
                                            margin="normal"
                                            error={validate && FormValidation.nombres != ''}
                                            helperText={FormValidation.nombres}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField
                                            id={"apellidos" + props.modalId}
                                            label="Apellidos"
                                            style={{ margin: 5 }}
                                            fullWidth
                                            defaultValue={Form.apellidos}
                                            onChange={(event) => { handleForm(event.target.value, 'apellidos') }}
                                            margin="normal"
                                            error={validate && FormValidation.apellidos != ''}
                                            helperText={FormValidation.apellidos}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
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
                                </Grid>
                                :
                                <Grid container spacing={3}>
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
                                </Grid>
                            }
                        </Grid>

                        <Grid item sm={4} xs={6}>
                            <TextField
                                id={"prioridad" + props.modalId}
                                label="Prioridad"
                                style={{ margin: 5 }}
                                defaultValue={Form.prioridad}
                                onChange={(event) => handleForm(parseInt(event.target.value), 'prioridad')}
                                type="number"
                                fullWidth
                                margin="normal"
                                error={validate && FormValidation.prioridad != ''}
                                helperText={FormValidation.prioridad}
                            />
                        </Grid>
                        <Grid item sm={4} xs={6}>
                            <TextField
                                id={"porcentajeCierre" + props.modalId}
                                label="Porcentaje de cierre"
                                style={{ margin: 5 }}
                                defaultValue={Form.porcentajeCierre}
                                onChange={(event) => handleForm(parseInt(event.target.value), 'porcentajeCierre')}
                                type="number"
                                fullWidth
                                margin="normal"
                                error={validate && FormValidation.porcentajeCierre != ''}
                                helperText={FormValidation.porcentajeCierre}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">%</InputAdornment>
                                }}
                            />
                        </Grid>
                        <Grid item sm={4} xs={12}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Hidden smDown>
                                    <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
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
                                </Hidden>
                                <Hidden mdUp>
                                    <KeyboardDatePicker
                                        style={{ margin: 5, width: '100%' }}
                                        id={"date-picker-dialog" + props.modalId}
                                        label="Fecha de contacto"
                                        format="dd/MM/yyyy"
                                        value={Form.fechaContactos}
                                        onChange={(event) => { handleForm(event, 'fechaContacto') }}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                        maxDate={today}
                                        error={validate && FormValidation.fechaContacto != ''}
                                        helperText={FormValidation.fechaContacto}
                                    />
                                </Hidden>
                            </MuiPickersUtilsProvider>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            {/* <TextField
                                id={"telefono1" + props.modalId}
                                label="Telefono Primario"
                                style={{ margin: 5 }}
                                value={Form.telefono[0]}
                                onChange={(event) => { handleForm(event.target.value, 'telefono', 0) }}
                                type="number"
                                fullWidth
                                margin="normal"
                                error={validate && FormValidation.telefono[0] != ''}
                                helperText={FormValidation.telefono[0]}
                            /> */}
                            <MuiPhoneInput
                                defaultCountry={'pe'}
                                id={"Telefono1" + props.modalId}
                                label="Telefono Primario"
                                style={{ margin: 5 }}
                                value={Form.telefono[0]}
                                fullWidth
                                error={validate && FormValidation.telefono[0] != ''}
                                onChange={(number, countryInfo) => { handleForm(number, 'telefono', 0) }}
                                helperText={FormValidation.telefono[0]}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            {/* <TextField
                                id={"telefono2" + props.modalId}
                                label="Telefono Secundario"
                                style={{ margin: 5 }}
                                value={Form.telefono[1]}
                                onChange={(event) => { handleForm(event.target.value, 'telefono', 1) }}
                                type="number"
                                fullWidth
                                margin="normal"
                                error={validate && FormValidation.telefono[1] != ''}
                                helperText={FormValidation.telefono[1]}
                            /> */}
                            <MuiPhoneInput
                                defaultCountry={'pe'}
                                id={"Telefono2" + props.modalId}
                                label="Telefono Secundario"
                                style={{ margin: 5 }}
                                value={Form.telefono[1]}
                                fullWidth
                                error={validate && FormValidation.telefono[0] != ''}
                                onChange={(number, countryInfo) => { handleForm(number, 'telefono', 1) }}
                                helperText={FormValidation.telefono[1]}
                            />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <TextField
                                id={"Correo1" + props.modalId}
                                label="Correo Primario"
                                style={{ margin: 5 }}
                                value={Form.correo[0]}
                                onChange={(event) => { handleForm(event.target.value, 'correo', 0) }}
                                type="email"
                                fullWidth
                                margin="normal"
                                error={validate && FormValidation.correo[0] != ''}
                                helperText={FormValidation.correo[0]}
                            />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <TextField
                                id={"Correo2" + props.modalId}
                                label="Correo Secundario"
                                style={{ margin: 5 }}
                                value={Form.correo[1]}
                                onChange={(event) => { handleForm(event.target.value, 'correo', 1) }}
                                type="email"
                                fullWidth
                                margin="normal"
                                error={validate && FormValidation.correo[1] != ''}
                                helperText={FormValidation.correo[1]}
                            />
                        </Grid>
                    </Grid>
                </div>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" className={classes.cancelButton} type="button" onClick={props.handleClose}>
                    Cancelar
                </Button>
                <Button variant="outlined" className={classes.successButton} autoFocus onClick={submit}>
                    Guardar Cambios
                </Button>
            </DialogActions>
        </Dialog >
    )
}
export default withStyles(useStyles)(EditCard);