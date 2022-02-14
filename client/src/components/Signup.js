import React, { useContext, useState } from 'react'
import  {useNavigate}  from 'react-router-dom'
import alertContext from '../context/alert/alertContext';

const Signup = () => {
  const [credential, setCredential] = useState({name:"",email:"",password:"",cpassword:""});
    let navigate = useNavigate(); 
    const context = useContext(alertContext);
    const { showAlert } = context;
    
    const onChangeHandler=(e)=>{
        setCredential({...credential,[e.target.name]:e.target.value})
    }
    const {name,email,password} = credential;
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const response = await fetch(`/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name,email,password})
        });
        const json = await response.json();
        if(json.success)
        {
            //Save authtoken and redirect
            localStorage.setItem('token',json.authtoken);
            console.log(json.authtoken);
            showAlert("Account created successfully","success");
            navigate("/");
        }
        else{
          showAlert("Invalid Details","danger");
        }
    }
  return (
    <div>
      <form onSubmit={handleSubmit}>
      <h2>Create an account to use iNotebook</h2>
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
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" minLength={5} required onChange={onChangeHandler} />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name="cpassword" minLength={5} required onChange={onChangeHandler} />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup
