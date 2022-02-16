import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import alertContext from '../context/alert/alertContext';

const Login = () => {
    // const host = "http://localhost:5000"
    const host = "https://inotebookvorayash.herokuapp.com"
    const [credential, setCredential] = useState({ email: "", password: "" });
    const [ischeck, setIscheck] = useState(false);
    let navigate = useNavigate();
    const context = useContext(alertContext);
    const { showAlert,alertClose } = context;

    const onChangeHandler = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }
    const onChangeHandlerCheck = (e) => {
        setIscheck(e.target.checked)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        showAlert();


        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credential.email, password: credential.password })
        });
        const json = await response.json();
        if (json.success) {
            //Save authtoken and redirect
            if (ischeck) document.cookie = true;
            else document.cookie = false;

            localStorage.setItem('token', json.authtoken);
            navigate("/");
            alertClose("Logged in successfully", "success");

        }
        else {
            alertClose("Invalid credentials", "danger");

        }
    }
    return (
        <div>
            <h2>Login to iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" onChange={onChangeHandler} aria-describedby="emailHelp" required />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" autoComplete="false" onChange={onChangeHandler} required />
                </div>
                <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="rememberMe" name="rememberMe" onChange={onChangeHandlerCheck} checked={ischeck} />
                    <label className="form-check-label" htmlFor="rememberMe" >Remember me</label>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
