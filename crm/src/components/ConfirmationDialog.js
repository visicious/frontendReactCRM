import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@material-ui/core";
import useStyles from "../styles/AddInteraccion";

export const ConfirmationDialog = ({
    open,
    title,
    variant,
    description,
    onSubmit,
    onClose,
    confirmButtonText,
    cancelButtonText,
    infoButtonText
}) => {
    const classes = useStyles()
    return (
        <Dialog open={open}>
            <DialogTitle id="alert-dialog-title">{title ? title : 'Confirmar'}</DialogTitle>
            <DialogContent>
                <DialogContentText>{description}</DialogContentText>
            </DialogContent>
            <DialogActions>
                {variant === "danger" && (
                    <>
                        <Button variant="outlined" className={classes.successButton} onClick={onSubmit}>
                            {confirmButtonText || 'Si'}
                        </Button>
                        <Button variant="outlined" className={classes.cancelButton} onClick={onClose} autoFocus>
                            {cancelButtonText || 'Cancelar'}
                        </Button>
                    </>
                )}
                {variant === "info" && (
                    <Button variant="outlined" className={classes.successButton} onClick={onSubmit}>
                        {infoButtonText || 'OK'}
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
};
