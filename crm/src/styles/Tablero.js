import { makeStyles } from '@material-ui/core'
// const useStyles =makeStyles(theme=>({
//     container:{
//         display:'flex',
//     }
// }))
const useStyles = theme => ({
    container: {
        display: 'flex',
        height: '100%'
    },
    addButton: {
        width: 250,
        marginLeft: 5,
        backgroundColor: theme.palette.primary.main,
        height: 45,
        color: 'white',
        '&:hover': {
            backgroundColor: theme.palette.primary.light,
        }
    }
})
export default useStyles;