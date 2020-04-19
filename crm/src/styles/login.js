import { makeStyles } from "@material-ui/core";
import theme from '../theme';
const themeCustom = theme
const useStyles = makeStyles(theme => ({
    fullContainer: {
        height: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center'
    },
    container: {
        textAlign: 'center',
    },
    loginButton: {
        backgroundColor: themeCustom.palette.tertiary.light,
        borderColor: themeCustom.palette.tertiary.darker,
        color: themeCustom.palette.tertiary.darker,
        '&:hover': {
            // backgroundColor: themeCustom.palette.tertiary.darker,
            borderColor: themeCustom.palette.primary.main,
            color: themeCustom.palette.primary.main,
        },
        '&:focus': {
            borderColor: themeCustom.palette.primary.main,
            color: themeCustom.palette.primary.main,
        }
    }
}))
export default useStyles