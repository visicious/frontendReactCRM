
import { makeStyles, useTheme } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    successButton: {
        backgroundColor: theme.palette.tertiary.light,
        borderColor: theme.palette.tertiary.darker,
        color: theme.palette.tertiary.darker,
        '&:hover': {
            // backgroundColor: theme.palette.tertiary.darker,
            borderColor: theme.palette.primary.main,
            color: theme.palette.primary.main,
        },
        '&:focus': {
            borderColor: theme.palette.primary.main,
            color: theme.palette.primary.main,
        }
    },
    cancelButton: {
        backgroundColor: theme.palette.tertiary.light,
        borderColor: theme.palette.tertiary.darker,
        color: theme.palette.tertiary.darker,
        '&:hover': {
            // backgroundColor: theme.palette.tertiary.darker,
            borderColor: theme.palette.error.main,
            color: theme.palette.error.main,
        },
        '&:focus': {
            borderColor: theme.palette.error.main,
            color: theme.palette.error.main,
        }
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    form: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    proccessButton: {
        backgroundColor: theme.palette.secondary.main,
        borderColor: theme.palette.tertiary.light,
        color: theme.palette.tertiary.light,
        '&:hover': {
            backgroundColor: theme.palette.tertiary.light,
            borderColor: theme.palette.secondary.main,
            color: theme.palette.secondary.main,
        },
    },
    lostButton: {
        backgroundColor: theme.palette.error.main,
        borderColor: theme.palette.tertiary.light,
        color: theme.palette.tertiary.light,
        '&:hover': {
            backgroundColor: theme.palette.tertiary.light,
            borderColor: theme.palette.error.main,
            color: theme.palette.error.main,
        },
    },
    deleteButton: {
        backgroundColor: theme.palette.tertiary.light,
        borderColor: theme.palette.tertiary.darker,
        color: theme.palette.tertiary.darker,
        '&:hover': {
            // backgroundColor: theme.palette.tertiary.darker,
            borderColor: theme.palette.error.main,
            color: theme.palette.error.main,
        },
        '&:focus': {
            borderColor: theme.palette.error.main,
            color: theme.palette.error.main,
        }
    },
    grid: {
        textAlign: 'center',
    },
    opcion: {
        marginBottom: 20
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-around'
    }
})
)
export default useStyles