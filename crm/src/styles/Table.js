import { makeStyles } from "@material-ui/core";
import theme from "../theme";

const useStyles = makeStyles(theme => ({
    interaccionesContainer: {
        display: 'flex',
    },
    containerCell: {
        display: 'flex',
    },
    persona: {
        width: '60%',
        marginLeft: 5,
        overflow: 'scroll',
        maxWidth: '60%',
    },
    leftButtonsContainer: {
        maxWidth: 64,
        borderRight: '1px solid black'
    },
    badge: {
        backgroundColor: theme.palette.tertiary.dark,
        color: 'black'
    },
    badgeInverted: {
        backgroundColor: 'white',
        color: 'black'
    },
    interaccionesButton: {
        border: `1px solid black`,
        borderRadius: 0
    },
    selected: {
        // borderColor:theme.palette.tertiary.dark,
        // color:theme.palette.tertiary.dark,
        backgroundColor: theme.palette.tertiary.dark
    },
    interaccionesTableTitle: {
        marginLeft: 10
    },
    interaccionesTableTitleButton: {

    },
    interaccionesTableAgregar: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.tertiary.light,
        borderColor: theme.palette.tertiary.light,
        '&:hover': {
            backgroundColor: theme.palette.tertiary.light,
            color: theme.palette.primary.main,
            borderColor: theme.palette.primary.main,
        }
    },
    interaccionesTableGenerar: {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.tertiary.light,
        borderColor: theme.palette.tertiary.light,
        '&:hover': {
            backgroundColor: theme.palette.tertiary.light,
            color: theme.palette.secondary.main,
            borderColor: theme.palette.secondary.main
        },
    },
    '@keyframes rotate': {
        '0%': {
            transform: 'rotate(180deg)',
        },
        // '50%': {
        //     transform: 'rotate(180deg)',
        // },
        '100%': {
            transform: 'rotate(0deg)',
        }
    },
    downAnimation: {
        animation: `$rotate 200ms ${theme.transitions.easing.easeInOut}`,
    },
    sort: {
        color: theme.palette.tertiary.dark,
    }

}))
export default useStyles
export const styles = {
    interaccionesTable: {
        backgroundColor: theme.palette.tertiary.main,
        borderTop: `1px solid ${theme.palette.tertiary.dark}`
    },
    interaccionesTableHeader: {
        backgroundColor: `${theme.palette.tertiary.main} !important`,
    },

}