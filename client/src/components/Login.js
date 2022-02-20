import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import alertContext from '../context/alert/alertContext';
import './css/login.css'
import bg from './animated.svg'


const Login = () => {
    // const host = "http://localhost:5000"
    const host = "https://inotebookvorayash.herokuapp.com"
    const [credential, setCredential] = useState({ email: "", password: "" });
    const [ischeck, setIscheck] = useState(false);
    let navigate = useNavigate();
   
    const { showAlert, alertClose, setPhone } = useContext(alertContext);

    useEffect(()=>{
        setPhone(null);
    })

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
            //to check remember me
            if (ischeck) document.cookie = true;
            else document.cookie = false;
            //Save authtoken and redirect

            localStorage.setItem('token', json.authtoken);
            navigate("/");

            // setUser(json.user);
            alertClose("Logged in successfully", "success");

            //set user
            
        }
        else {
            alertClose("Invalid credentials", "danger");

        }
    }
    return (
        <div className="container" id="header">
            <div className="row">
                <div className="col-md-6 mx-auto order-2 order-lg-1 d-flex justify-content-center flex-column">
                    <div className="login">
                        <form onSubmit={handleSubmit}>
                            <h2>Login to iNotebook</h2>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email address</label>
                                <input type="email" className="form-control" id="email" name="email" onChange={onChangeHandler} aria-describedby="emailHelp" required={true} />
                                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" className="form-control" id="password" name="password" autoComplete="false" onChange={onChangeHandler} required={true} />
                            </div>
                            <div className="form-check mb-3">
                                <input type="checkbox" className="form-check-input" id="rememberMe" name="rememberMe" onChange={onChangeHandlerCheck} checked={ischeck} />
                                <label className="form-check-label" htmlFor="rememberMe" >Remember me</label>
                            </div>
                            <div className="mb-3">
                            <Link to="/ForgotPass" className="">Forgot password?</Link>
                            </div>

                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
                <div className="col-lg-6 col-sm-6 mx-auto mb-sm-5 mb-md-0 header-img order-1 order-md-2 justify-content-center">
                <img src={bg} className="img-fluid animated" alt="home img" />
                </div>
            </div>
        </div>
    )
}

export default Login
