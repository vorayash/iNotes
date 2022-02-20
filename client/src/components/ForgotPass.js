import React, {  useContext, useEffect, useState } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import * as firebase from "firebase";
import { useNavigate } from "react-router";
import alertContext from "../context/alert/alertContext";
// import * as firebase from 'firebase/app';

// Configure Firebase.
const config = {
  apiKey: "AIzaSyCMSCUXiUdbF6cUlAYfEE1vvF5DL9EaxQE",
  authDomain: "fir-inotebook.firebaseapp.com",
  projectId: "fir-inotebook",
  storageBucket: "fir-inotebook.appspot.com",
  messagingSenderId: "835698285997",
  appId: "1:835698285997:web:f2e8541cb9442c84e79524"
};


// Configure FirebaseUI.
const uiConfig = {

  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: "/ResetPass",
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    {
      provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,

      defaultCountry: "IN", // Set default country to the United Kingdom (+44).

      defaultNationalNumber: "1234567890",

      loginHint: "+911234567890",

      whitelistedCountries: ["IN", "+91","Us","+1"]
    }
  ],
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      console.log("succwssfully signed in");
      // console.log("succwssfully signed in", authResult)
      // firebase.auth().signOut().then(function() {
      //   console.log('Signed Out');
      // }, function(error) {
      //   console.error('Sign Out Error', error);
      // });
    }
  }
};

firebase.initializeApp(config);

const ForgotPass = () => {
  const { showAlert, alertClose,setPhone,phone } = useContext(alertContext);
  let navigate = useNavigate();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const authObserver = firebase.auth().onAuthStateChanged(
      (usernew) =>{
        if(usernew){
          let phoneNumber = usernew.phoneNumber;
          setPhone(phoneNumber.substr(-10));
        } 
        setUser(usernew)
      } 
      );
    return authObserver;
  });

  if (user) {
    showAlert();
    firebase.auth().signOut().then(function () {}, function () { });
    const host = "http://localhost:5000"
    // const host = "https://inotebookvorayash.herokuapp.com"

    const response = fetch(`${host}/api/auth/resetcheck`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ phone: phone })
    }).then(response => response.json()).then(data => {
      if (data.success) {
        navigate("/ResetPass");
        alertClose();
      }
      else {
        alertClose(data.error,"danger");
      }

    });

    return (
      <>
        hey yash you signed in
        console.log("hey  yash you signed in");
      </>
    )
  }
  else {

    return (
      <div>
        <h1>Forgot Password</h1>

        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </div>
    )
  }
}

export default ForgotPass
