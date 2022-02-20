import AlertContext from "./alertContext";
import Swal from 'sweetalert2';
import { useState } from "react";


const AlertState = (props) => {
    const [phone, setPhone] = useState(null);
    const showAlert = () => {
        
      Swal.showLoading()
    }
    const alertClose = (message, alertType)=>{
        if(!message)
        {
        Swal.close()
            return;
        }
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
        <AlertContext.Provider value={{ showAlert,alertClose,phone,setPhone }}>
            {props.children}
        </AlertContext.Provider>
    )
}


export default AlertState;
