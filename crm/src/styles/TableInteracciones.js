import { makeStyles } from "@material-ui/core";

// const useStyles = theme => ({
//     '@keyframes beat':{

//     },
//     error: {
//         color: 'red',
//     }
// })
const useStyles = makeStyles(theme => ({
    '@keyframes beat': {
        '0%': {
            transform: 'scale(1)',
        },
        '25%': {
            transform: 'scale(1.3)',
        },
        '40%': {
            transform: 'scale(1)',
        },
        '60%': {
            transform: 'scale(1.3)',
        },
        '100%': {
            transform: 'scale(1)',
        },
    },
    error: {
        color: 'red',
        animation: '$beat .8s infinite',
    }
})
)

export default useStyles