import { makeStyles, useTheme } from '@material-ui/core/styles';
// import theme from '../theme';
const useStyles = makeStyles(theme => ({
    card: {
        backgroundColor: theme.palette.tertiary.light,
        marginBottom: 8,
        // padding:8,
        borderRadius: 4,
        // border: '1px solid',
        // borderColor: 'black',
        // display: 'flex',
        '&:focus': {
            outline: 'none',
            borderColor: 'black',
        },
        boxShadow: `5px 5px 5px ${theme.palette.tertiary.dark}`
    },
    dragging: {
        backgroundColor: theme.palette.tertiary.light,
        height: 'auto !important'
    },
    handle: {
        width: 20,
        height: 20,
        backgroundColor: theme.palette.primary.main,
        borderRadius: 4,
        marginRight: 8,
    },
    dragDisabled: {
        backgroundColor: theme.palette.secondary.light
    },
    title: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    cardInfo: {
        padding: 5,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    leftList: {
        padding: 0
    },
    leftListItem: {
        padding: 0,
        borderRightColor: theme.palette.tertiary.main,
        borderRight: '2px solid',
    },
    leftListItemIcon: {
        minWidth: 0
    },
    leftListIcon: {
        minWidth: 0
    },
    leftListButton: {
        minWidth: '0 !important',
        paddingLeft: '8px !important',
        paddingRight: '8px !important',
    },
    divider: {
        height: 2,
        backgroundColor: theme.palette.tertiary.main
    },
    container: {
        display: 'flex',
        height: '100%',
        width: '100%'
    },
    interacciones: {
        // borderTop: '2px solid',
        // borderColor: theme.palette.tertiary.main,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    interaccionesButtons: {
        width: '33.3%',
        textAlign: 'center'
    },
    interaccionesButton: {
        width: '100%',
        padding: '5px 5px !important',
    },
    porcentajeWrapper: {
        position: 'relative',
        width: '100%',
    },
    porcentaje: {
        position: 'absolute',
        top: -2,
        right: 1
    },
    porcentajeCierre: {
        position: 'absolute',
        top: 0,
        right: 5,
        zIndex: 2,
        fontWeight: 'bold'
    },
    linkUsuario: {
        textDecoration: 'none',
        color: theme.palette.primary.main,
        fontSize: '1em',
        fontWeight: 'bold',
        maxWidth: 150,
        maxHeight: 40,
        overflow: 'hidden'
    },
    prioridad: {
        borderRadius: '50%',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 24,
        height: 24
    },
    darkButton: {
        backgroundColor: `${theme.palette.tertiary.light} !important`,
        borderColor: `${theme.palette.tertiary.darker} !important`,
        color: `${theme.palette.tertiary.darker} !important`,
        '&:hover': {
            // backgroundColor: theme.palette.tertiary.darker,
            borderColor: `${theme.palette.primary.main} !important`,
            color: `${theme.palette.primary.main} !important`,
        },
    },
    deleteButton: {
        backgroundColor: `${theme.palette.tertiary.light} !important`,
        borderColor: `${theme.palette.tertiary.darker} !important`,
        color: `${theme.palette.tertiary.darker} !important`,
        '&:hover': {
            // backgroundColor: theme.palette.tertiary.darker,
            borderColor: `${theme.palette.error.main} !important`,
            color: `${theme.palette.error.main} !important`,
        },
    }
})
)
export default useStyles;