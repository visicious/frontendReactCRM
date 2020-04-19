import React, { useEffect } from 'react'
import { Container, TextField, InputLabel, FormControl, Input, InputAdornment, IconButton, Grid, Button, FormHelperText, MuiThemeProvider, Typography } from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import useStyles from '../styles/login';
import axios from 'axios';
import { BackUrl } from '../utilities/const';
import Router from 'next/router'
import { islogged } from '../services/UserService';
import { lengthValidation } from '../utilities/validator';
import theme from '../theme';

export default function login() {
    useEffect(() => {
        islogged('/tablero')
    }, [])
    const submit = e => {
        e.preventDefault()
        if (values.usuario == '') {
            setValues({ ...values, userError: true, userErrorText: 'ingrese usuario o correo' })
            return;
        } else if (values.password == '') {
            setValues({ ...values, passwordErrorText: 'ingrese una contraseña', passwordError: true })
            return;
        }
        const form = {
            usuario: values.usuario,
            password: values.password
        }
        axios.post(BackUrl + 'usuarios/login', form).then(res => {
            console.log(res)
            if (res.data.message == 'OK') {
                Router.push('/tablero')
                localStorage.setItem('token', res.data.token)
            } else {
                setValues({ ...values, password: '', passwordError: true, passwordErrorText: res.data.content })
            }
        }).catch(error => {
            console.log(error)
        })
    }
    const classes = useStyles()
    const [values, setValues] = React.useState({
        usuario: '',
        password: '',
        showPassword: false,
        passwordError: false,
        passwordErrorText: '',
        userError: false,
        userErrorText: ''
    });
    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };
    const handleForm = prop => event => {
        setValues({ ...values, [prop]: event.target.value, userErrorText: '', userError: false, passwordErrorText: '', passwordError: false });
    };
    return (
        <MuiThemeProvider theme={theme}>
            <div className={classes.fullContainer}>
                <Container maxWidth="sm" className={classes.container}>
                    <Typography variant="h4">Login</Typography>
                    <form onSubmit={submit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    label="usuario o correo"
                                    id="usuario"
                                    margin="normal"
                                    value={values.usuario}
                                    onChange={handleForm('usuario')}
                                    fullWidth
                                    error={values.userError}
                                    helperText={values.userErrorText}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl error={values.passwordError && values.password == ""}
                                    fullWidth>
                                    <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                    <Input
                                        id="standard-adornment-password"
                                        type={values.showPassword ? 'text' : 'password'}
                                        value={values.password}
                                        onChange={handleForm('password')}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={event => { event.preventDefault() }}
                                                >
                                                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                    <FormHelperText >{values.passwordErrorText}</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" className={classes.loginButton} variant="outlined" onClick={submit}>
                                    Ingresar
                            </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Container>
            </div>
        </MuiThemeProvider>
    )
}
