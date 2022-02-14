import React, { useContext } from 'react'
import alertContext from '../context/alert/alertContext';



export default function Alert() {
    const context = useContext(alertContext);
    const { alert } = context;
    const capitalize = (word) => {
        word=word==="danger"?"Error":word;
        return word[0].toUpperCase() + word.slice(1);
    }
    return (
        <div style={{ height: "70px" }}>
            {alert && <div>
                <div className={`alert alert-${alert.type}`} role="alert">
                    {capitalize(alert.type)}! {alert.msg}
                </div>
            </div>}
        </div >
    )
}
