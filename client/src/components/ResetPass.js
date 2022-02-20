import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import alertContext from '../context/alert/alertContext';
import './css/login.css'

const ResetPass = () => {

    let navigate = useNavigate();
    useEffect(()=>{if(phone==null){
         navigate("/Login");
        }})

    // const host = "http://localhost:5000"
    const host = "https://inotebookvorayash.herokuapp.com"
    const [credential, setCredential] = useState({ password: "", cpassword: "" });
    const { showAlert, alertClose,phone, setPhone } = useContext(alertContext);
    
    const onChangeHandler = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        showAlert();
        if (credential.password !== credential.cpassword) {
            alertClose("New Password and Confirm New password does not match!", "danger");
            return;
        }

        const response = await fetch(`${host}/api/auth/resetpass`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password: credential.password, phone:phone})
        });
        
        const json = await response.json();
        console.log(json);
        if (json.success) {
            navigate("/");
            // setUser(json.user);
            alertClose("Password Updated successfully", "success");

        }
        else {
            alertClose("Invalid credentials", "danger");

        }
        setPhone(null);
    }
    return (
        <>
        <form className="form reset" onSubmit={handleSubmit}>
            <h2>Set New Password</h2>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Enter New Password</label>
                <input type="password" className="form-control" id="password" name="password" autoComplete="false" onChange={onChangeHandler} minLength={5} required />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Confirm New Password</label>
                <input type="password" className="form-control" id="password" name="cpassword" autoComplete="false" onChange={onChangeHandler} minLength={5} required />
            </div>
            <button type="submit" className="btn btn-primary">Reset Password</button>

        </form>
        </>
    )
}

export default ResetPass
