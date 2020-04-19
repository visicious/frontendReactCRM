import React from 'react'
import { Dialog, useMediaQuery, DialogTitle, Typography, IconButton, DialogContent, Grid, DialogActions, TextField, Button } from '@material-ui/core'
import theme from '../theme';
import CloseIcon from '@material-ui/icons/Close';
import useStyles from '../styles/CorreoInteraccion';
import axios from 'axios';
import { BackUrl } from '../utilities/const';
import { userLogged } from '../services/UserService';
import AutocompleteWhatsapp from './AutcompleteWhatsapp';

export default function WhatsappInteraccionGlobal(props) {
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const classes = useStyles();
    const submit = event => {
        // const token = userLogged()
        // event.preventDefault()
        // const formdata = new FormData();
        // filesToUpload.forEach(element => {
        //     formdata.append('attachments', element)
        // });
        // props.correo.forEach(element => {
        //     formdata.append('to', element)
        // })
        // formdata.append('token', token)
        // formdata.append('subject', email.subject)
        // formdata.append('body', email.body)
        // axios.post(BackUrl + 'interacciones/generar_interaccion/correo', formdata
        // ).then(res => {
        //     console.log(res)
        //     if(res.message=='OK'){
        //         props.handleClose('OK')
        //     }
        // }).catch(error => {
        //     console.log(error)
        // })
    }
    const [filesToUpload, setFilesToUpload] = React.useState([])
    const FilesPreview = (props) => {
        if (filesToUpload) {
            return (
                <Grid item xs={12}>
                    {filesToUpload && filesToUpload.map((file, index) => <div key={index}>{file.name}
                        <IconButton aria-label="close" type="button"
                            onClick={() => { deleteAdjunto(index) }}>
                            <CloseIcon />
                        </IconButton>
                    </div>)}
                </Grid>
            )
        } else {
            return <div></div>
        }
    }
    const handleEvent = event => {
        const lastArray = [...filesToUpload]
        const newFileList = Array.from(event.target.files)
        let Arrayconcat = lastArray.concat(newFileList)
        setFilesToUpload(Arrayconcat)
    }
    const deleteAdjunto = (index) => {
        let arrayTempFiles = [...filesToUpload]
        arrayTempFiles.splice(index, 1)
        setFilesToUpload(arrayTempFiles)
    }
    const [email, setEmail] = React.useState({
        subject: '',
        body: ''
    })
    const handleChange = (value, prop) => {
        if (prop == 'to') {
            emailToChange.push(value)
            value = emailToChange
        }
    }
    return (
        <Dialog
            fullWidth={true}
            maxWidth={'md'}
            fullScreen={fullScreen}
            onClose={props.handleClose}
            aria-labelledby={"dialog-" + props.id}
            open={props.open}
            scroll="paper"
        >
            <DialogTitle id={"dialog-" + props.id} disableTypography className={classes.root} >
                <Typography variant="h6">Enviar Whatsapp</Typography>
                {props.handleClose ? (
                    <IconButton aria-label="close" className={classes.closeButton} type="button" onClick={() => { props.handleClose() }}>
                        <CloseIcon />
                    </IconButton>
                ) : null}
            </DialogTitle>
            <DialogContent dividers>
                <form onSubmit={submit} autoComplete="off">
                    <div className={classes.form}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <AutocompleteWhatsapp handleChange={handleChange}/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth multiline rows="5" label="Mensaje" variant="outlined"
                                    value={email.body}
                                    onChange={event => handleChange(event.target.value, 'body')} />
                            </Grid>
                            <Grid item xs={12}>
                                <input
                                    accept="*"
                                    className={classes.input}
                                    id="adjuntos"
                                    multiple
                                    type="file"
                                    onChange={(e) => { handleEvent(e) }}
                                />
                                <label htmlFor="adjuntos">
                                    <Button variant="outlined" component="span">
                                        Subir Archivos adjuntos
                                    </Button>
                                </label>
                            </Grid>
                            <FilesPreview />
                        </Grid>
                    </div>
                </form>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" className={classes.cancelButton} type="button" onClick={() => { props.handleClose() }}>
                    Cancelar
                </Button>
                <Button variant="outlined" className={classes.successButton} autoFocus onClick={submit}>
                    Enviar Whatsapp
                </Button>
            </DialogActions>
        </Dialog>
    )
}
