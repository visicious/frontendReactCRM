import { makeStyles, useTheme } from '@material-ui/core/styles';
const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    toolOpenPC: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 30,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(7) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
    toolbarMain: {

    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        height: '90vh'
    },
    links: {
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
    title: {
        display:'flex',
        flexGrow: 1,
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
    link: {
        color: '#fff',
        textDecoration: 'none',
        '&:hover': {
            color: theme.palette.primary.light,
        }
    },
    responsiveLink: {
        color: 'rgba(0, 0, 0, 0.6);',
        textDecoration: 'none',
        display: 'flex'
    }
}));
export default useStyles;