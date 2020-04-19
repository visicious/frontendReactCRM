import React from 'react'
import { Dialog, useTheme, useMediaQuery, DialogTitle, Typography, IconButton, DialogContent, Grid, TextField, DialogActions, Button } from '@material-ui/core'
import useStyles from '../styles/MetasCreate';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';
import { userLogged } from '../services/UserService';
import { BackUrl } from '../utilities/const';

export default function MetasCreate(props) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const classes = useStyles();
    const restartValidation = () => {
        setValidate(false)
        setFormValidation({
            objetivo: '',
            valor: ''
        })
    }
    const submit = event => {
        setValidate(true)
        event.preventDefault();
        const token = userLogged();
        axios.post(BackUrl + 'estadisticas/agregar/metas', { ...form, token }).then(res => {
            console.log(res)
            if (res.data.message == 'OK') {
                setForm({
                    objetivo: '',
                    valor: ''
                })
                props.handleClose('OK')
            }
        }).catch(error => {
            console.log(error)
        })
    }
    const handleForm = (value, key) => {
        setForm({
            ...form,
            [key]: value
        })
    }
    const [validate, setValidate] = React.useState(false);
    const [form, setForm] = React.useState({
        objetivo: '',
        valor: ''
    })
    const [formValidation, setFormValidation] = React.useState({
        objetivo: '',
        valor: ''
    })
    return (
        <Dialog fullWidth={true}
            maxWidth={'sm'}
            fullScreen={fullScreen}
            onClose={props.handleClose}
            aria-labelledby={"dialog-" + props.modalId}
            open={props.open}
            scroll="paper">
            <DialogTitle id={"dialog-" + props.modalId} disableTypography className={classes.root} >
                <Typography variant="h6">Agregar Metas</Typography>
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
                            <Grid item xs={12}>
                                <TextField
                                    id={"Objetivo" + props.modalId}
                                    label="Objetivo"
                                    style={{ margin: 5 }}
                                    fullWidth
                                    value={form.objetivo}
                                    onChange={(event) => { handleForm(event.target.value, 'objetivo') }}
                                    margin="normal"
                                    error={validate && formValidation.objetivo != ''}
                                    helperText={formValidation.objetivo}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id={"Valor" + props.modalId}
                                    label="Valor"
                                    style={{ margin: 5 }}
                                    fullWidth
                                    value={form.valor}
                                    onChange={(event) => { handleForm(event.target.value, 'valor') }}
                                    margin="normal"
                                    error={validate && formValidation.valor != ''}
                                    helperText={formValidation.valor}
                                    type="number"
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
        </Dialog>
    )
}
