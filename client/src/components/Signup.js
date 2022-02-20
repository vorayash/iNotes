import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import alertContext from '../context/alert/alertContext';
import bg from './animated.svg'
import './css/login.css'



const Signup = () => {
  // const host = "http://localhost:5000"
  const host = "https://inotebookvorayash.herokuapp.com"
  const [credential, setCredential] = useState({ name: "", email: "", phone: "", password: "", cpassword: "" });
  const [ischeck, setIscheck] = useState(false);

  let navigate = useNavigate();
  const context = useContext(alertContext);
  const { showAlert, alertClose } = context;

  const onChangeHandler = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value })
    setIscheck(e.target.checked)
  }
  const { name, email, phone, password } = credential;

  const handleSubmit = async (e) => {
    showAlert();
    e.preventDefault();
    if (credential.password != credential.cpassword) {
      alertClose("Password and Confirm password does not match!", "danger");
      return;
    }
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, phone, password })
    });
    const json = await response.json();
    if (json.success) {
      //Save authtoken and redirect
      if (ischeck) document.cookie = json.authtoken;
      localStorage.setItem('token', json.authtoken);
      alertClose("Account created successfully", "success");
      navigate("/");
    }
    else {
      alertClose(json.error, "danger");
    }
  }
  return (
    <div className="container" id="header">
      <div className="row">
        <div className="col-md-6 mx-auto order-2 order-lg-1 d-flex justify-content-center flex-column">
          <div className="signup">
            <form onSubmit={handleSubmit}>
              <h2 className="my-3">Create an account to use iNotebook</h2>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" name="name" minLength={5} required onChange={onChangeHandler} aria-describedby="nameHelp" />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" name="email" minLength={5} required onChange={onChangeHandler} aria-describedby="emailHelp" />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">Phone Number</label>
                <input type="tel" className="form-control" id="phone" name="phone" minLength={5} required onChange={onChangeHandler} aria-describedby="phoneHelp" />
                <div id="phoneHelp" className="form-text">We'll never share your email with anyone else.</div>
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" name="password" minLength={5} required onChange={onChangeHandler} />
                <div id="emailHelp" className="form-text">Password Length must be atleast 5 characters.</div>

              </div>
              <div className="mb-3">
                <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                <input type="password" className="form-control" id="cpassword" name="cpassword" minLength={5} required onChange={onChangeHandler} />
              </div>
              <div className="form-check mb-3">
                <input type="checkbox" className="form-check-input" id="rememberMe" name="rememberMe" onChange={onChangeHandler} checked={ischeck} />
                <label className="form-check-label" htmlFor="rememberMe" >Remember me</label>
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

export default Signup
