import { useState } from "react";
import AlertContext from "./alertContext";


const AlertState = (props) => {
    const [alert, setAlert] = useState(null);
    const showAlert = (message, alertType) => {
        setAlert({
            msg: message,
            type: alertType
        })
        setTimeout(() => {
            setAlert(null);
        }, 2000);
    }
    
    return (
        <AlertContext.Provider value={{ showAlert,alert }}>
            {props.children}
        </AlertContext.Provider>
    )
}


export default AlertState;