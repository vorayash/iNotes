import React, { useContext, useEffect, useState } from 'react'
import ReCAPTCHA from "react-google-recaptcha";
import alertContext from '../context/alert/alertContext';
import $ from 'jquery';
import { useNavigate } from 'react-router';
import './css/login.css'

const ForgotPass = () => {
  const host = process.env.REACT_APP_HOST

  const [verified, setVerified] = useState();
  const [credential, setCredential] = useState({ email: "", otp: "", password: "", cpassword: "" });

  const [sent, setSent] = useState(false);
  const { showAlert, alertClose } = useContext(alertContext);
  let navigate = useNavigate();

  useEffect(() => {
    if (sent === false) {
      $(".second").addClass("d-none");
    }
    else {
      $(".second").removeClass("d-none");
      $(".first").addClass("d-none");
    }
  })

  const onChangeHandler = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value })
  }

  var onChange = (value) => {
    if (value != null) {
      setVerified(true);
    }
  };

  const onSubmitHandler1 = async (e) => {
    e.preventDefault();
    showAlert();
    if (verified) {
      const response = await fetch(`${host}/api/auth/sendotp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: credential.email })
      });
      const json = await response.json();
      if (json.success) {
        setSent(true);
        alertClose(json.message, "success")
      }
      else {
        alertClose(json.error, "danger")
      }
    }

    else {
      alertClose("Please verify you are a human!", "danger")
    }
  }

  const onSubmitHandler2 = async (e) => {
    e.preventDefault();
    showAlert();
    if (credential.password !== credential.cpassword) {
      alertClose("New Password and Confirm New password does not match!", "danger");
      return;
    }
    const { otp, password, email } = credential;
    const response = await fetch(`${host}/api/auth/resetpass`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ otp, password, email })
    });
    const json = await response.json();
    if (json.success) {
      alertClose(json.message,"success")
      navigate("/");
    }
    else {
      alertClose(json.error, "danger")
    }
  }




  return (
    <div className="reset mx-auto" style={{width:"50%"}}>
      <form className="first" method='post' onSubmit={onSubmitHandler1}>
      <h2>Request OTP</h2>
        <div className="form-group my-3">
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" placeholder="Enter your email" required onChange={onChangeHandler} />
        </div>
        <ReCAPTCHA sitekey="6LejAJ4eAAAAAHHoFL5nXWQRQUXPeWARExUzEEqg"
          onChange={onChange}
        />
        <button type="submit" className="btn btn-primary my-3">Send OTP</button>
      </form>
      <form className="second" onSubmit={onSubmitHandler2}>
      <h2>Set New Password</h2>
        <div className="my-3">
          <label htmlFor="password" className="form-label">Enter New Password</label>
          <input type="password" className="form-control" id="password" name="password" autoComplete="false" onChange={onChangeHandler} minLength={5} required />
          <small id="email" className="form-text text-muted">Password length must be atleast 5 characters long.</small>

        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Confirm New Password</label>
          <input type="password" className="form-control" id="cpassword" name="cpassword" autoComplete="false" onChange={onChangeHandler} minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="otp" className="form-label">Enter OTP</label>
          <input type="text" className="form-control" id="otp" name="otp" onChange={onChangeHandler} required />
        </div>
        <button type="submit" className="btn btn-primary">Reset Password</button>

      </form>
    </div>
  )
}

export default ForgotPass
