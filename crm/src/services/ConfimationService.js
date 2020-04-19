import React from "react";
import { ConfirmationDialog } from "../components/ConfirmationDialog";

const ConfirmationServiceContext = React.createContext(Promise.reject);

export const useConfirmation = () =>
    React.useContext(ConfirmationServiceContext);
export const ConfirmationServiceProvider = ({ children }) => {
    const awaitingPromiseRef = React.useRef();
    const [
        confirmationState,
        setConfirmationState
    ] = React.useState(null);
    const openConfirmation = (options) => {
        setConfirmationState(options);
        return new Promise((resolve, reject) => {
            awaitingPromiseRef.current = { resolve, reject };
        });
    };
    const handleClose = () => {
        if (confirmationState.catchOnCancel && awaitingPromiseRef.current) {
            awaitingPromiseRef.current.reject();
        }
        setConfirmationState(null);
    };
    const handleSubmit = () => {
        if (awaitingPromiseRef.current) {
            awaitingPromiseRef.current.resolve();
        }
        setConfirmationState(null);
    };
    return (
        <>
            <ConfirmationServiceContext.Provider
                value={openConfirmation}
                children={children}
            />
            <ConfirmationDialog
                open={Boolean(confirmationState)}
                onSubmit={handleSubmit}
                onClose={handleClose}
                {...confirmationState}
            />
        </>
    );
};
