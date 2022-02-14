import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import alertContext from '../context/alert/alertContext';

const Login = () => {
    const [credential, setCredential] = useState({ email: "", password: "" });
    let navigate = useNavigate();
    const context = useContext(alertContext);
    const { showAlert } = context;

    const onChangeHandler = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credential.email, password: credential.password })
        });
        const json = await response.json();
        if (json.success) {
            //Save authtoken and redirect
            localStorage.setItem('token', json.authtoken);
            showAlert("Logged in successfully", "success");
            navigate("/");
        }
        else {
            showAlert("Invalid credentials", "danger");
        }
    }
    return (
        <div>
            <h2>Login to iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" onChange={onChangeHandler} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={onChangeHandler} />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
