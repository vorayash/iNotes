import { useState } from "react";
import AlertContext from "./alertContext";
import Swal from 'sweetalert2';


const AlertState = (props) => {
    const [alert, setAlert] = useState(null);
    const showAlert = () => {
        
      Swal.showLoading()
    }
    const alertClose = (message, alertType)=>{
        Swal.close()
        Swal.fire({
            // position: 'top-end',
            icon: alertType==="danger"?"error":"success",
            title: message.toString(),
            showConfirmButton: false,
            timer: 1500
          })

    }

    return (
        <AlertContext.Provider value={{ showAlert, alert,alertClose }}>
            {props.children}
        </AlertContext.Provider>
    )
}


export default AlertState;