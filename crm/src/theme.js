import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import { createMuiTheme } from '@material-ui/core/styles';
const palette = {
    primary: blue,
    secondary: green,
    error: red,
    tertiary: '#e9f0ec'
}

const theme = createMuiTheme({
    palette: {
        primary: {
            light: palette.primary[300],
            main: palette.primary[500],
            dark: palette.primary[700],
        },
        secondary: {
            main: palette.secondary.A700,
        },
        tertiary: {
            light: '#f5fcf8',
            main: '#e9f0ec',
            dark: '#abb0ad',
            darker: '#3b3b3b'
        },
        error: {
            light: palette.error[300],
            main: palette.error[500],
            dark: palette.error[700],
        },
        text: {

        },

        contrastThreshold: 3,
    }
})
export default theme;