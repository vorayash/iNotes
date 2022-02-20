import React, { useContext, useState } from 'react'
import alertContext from '../context/alert/alertContext';
import './css/login.css'

const ContactUs = () => {
  const host = "https://inotebookvorayash.herokuapp.com"
      // const host = "http://localhost:5000"

    const [information, setInformation] = useState({ name: "", phone: "",email:"",message:"",city:"",state:"" });
    const { showAlert, alertClose } = useContext(alertContext);
    const onChangeHandler = (e) => {
      setInformation({ ...information, [e.target.name]: e.target.value })
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    showAlert();
    const {name, phone,email,message,city,state } =information;
      const response = await fetch(`${host}/api/contact/contactus`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({name, phone,email,message,city,state })
      });
      const json = await response.json();
      if (json.success) {
          
          alertClose("Details submitted successfully!", "success");
          
      }
      else {
          alertClose(json.error, "danger");

      }
  }

  return (
    <>
    <div className="container" >
      <div className="contactus" id="header">
        <h2>Contact Us</h2>
        <form onSubmit={submitHandler}>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="Name">Full Name</label>
              <input type="text" className="form-control" id="name" name="name"  minLength={5} required onChange={onChangeHandler}  placeholder="Name"/>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="Phone">Phone</label>
              <input type="text" className="form-control" id="phone" name="phone" minLength={10} required onChange={onChangeHandler} placeholder="Phone"/>
            </div>
          </div>
          <div className="form-group">
              <label htmlFor="Email">Email</label>
              <input type="email" className="form-control" id="email" name="email" required onChange={onChangeHandler} placeholder="Email"/>
            </div>
          <div className="form-group">
            <label htmlFor="Message">Your Message</label>
            <textarea type="text" className="form-control" id="message" name="message" minLength={10} required onChange={onChangeHandler} placeholder="Enter your message here..." rows="3"/>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="City">City</label>
              <input type="text" className="form-control" id="city" name="city" minLength={3} required onChange={onChangeHandler}/>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="State">State</label>
              <input type="text" className="form-control" id="state" name="state" minLength={5} required onChange={onChangeHandler}/>
            </div>
          </div>       
          <button type="submit" className="btn btn-primary">Sign in</button>
        </form>
      </div>
    </div>
</>
  )
}

export default ContactUs
