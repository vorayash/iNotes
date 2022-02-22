import './App.css';
import React, { useContext } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import { Home } from './components/Home';
import About from './components/ContactUs';
import NoteState from './context/notes/NoteState';
import Signup from './components/Signup';
import Login from './components/Login';
import AlertState from './context/alert/AlertState';
import Footer from './components/Footer';
import ForgotPass from './components/ForgotPass';
import ResetPass from './components/ResetPass';
import PageNotFound from './components/PageNotFound';

function App() {
  window.onunload = () => {
    if (document.cookie === 'false') {
      localStorage.removeItem('token');
    }
  };
  

  return (
    <>
      <AlertState>
        <NoteState>
          <Router>
            <Navbar />
            <div className="container">
              <Routes>
               <Route exact path="/" element={<Home />} />
                <Route exact path="/About" element={<About />} />
                <Route exact path="/Login" element={<Login />} />
                <Route exact path="/Signup" element={<Signup />} />
                <Route exact path="/ForgotPass" element={<ForgotPass />} />
                <Route exact path="/ResetPass" element={<ResetPass />} />
                <Route path="/*" element={<PageNotFound />} />
              </Routes>
            </div>
          </Router>
          <Footer />
        </NoteState>
      </AlertState>
    </>
  )
}

export default App;
