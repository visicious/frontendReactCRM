const useStyles = theme => ({
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
        '&:focus':{
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
        '&:focus':{
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

});
export default useStyles