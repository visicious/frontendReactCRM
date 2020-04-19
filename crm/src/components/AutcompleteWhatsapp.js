import axios from 'axios';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { userLogged } from '../services/UserService';
import { BackUrl } from '../utilities/const';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { Checkbox } from '@material-ui/core';

export default function AutocompleteWhatsapp(props) {
    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;
    const { handleChange } = props
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const [setted, setSetted] = React.useState(false)
    // const loading = open && options.length === 0;
    const loading = open && options.length === 0 && !setted;

    React.useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            const response = await axios.post(BackUrl + 'clientes/obtener_correos', { token: userLogged() });
            const countries = await response;
            console.log(countries)
            if (active) {
                setOptions(countries.data.content)
            }
        })();

        return () => {
            active = false;
        };
    }, [loading]);

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);
    return (
        < Autocomplete
            id="Email"
            multiple
            style={{ width: '100%' }
            }
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            loadingText={'Cargando'}
            getOptionSelected={(option, value) => (option.correo === value.correo && option.id === value.id)}
            getOptionLabel={option => option.titulo + ' <' + option.correo + '>'}
            options={options}
            loading={loading}
            noOptionsText={'No hay correos'}
            onChange={(event, newValue) => { handleChange(newValue, 'to') }}
            renderInput={params => (
                <TextField
                    {...params}
                    label="Correos registrados"
                    placeholder="Usuarios con correo"
                    variant="outlined"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
            renderOption={(option, { selected }) => (
                <React.Fragment>
                    <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                    />
                    {option.titulo + ' <' + option.correo + '>'}
                </React.Fragment>
            )}
        />
    );
}