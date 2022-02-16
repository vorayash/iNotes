import './App.css';
import React, { useContext } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import { Home } from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Signup from './components/Signup';
import Login from './components/Login';
import alertContext from './context/alert/alertContext';
import AlertState from './context/alert/AlertState';
import Sweetalertdemo from './components/Sweetalertdemo';

function App() {



  window.onunload = () => {
    if ( document.cookie === 'false' ) {
      localStorage.removeItem('token');
    }
  };


  return (
    <>
    <AlertState>
      <NoteState>
        <Router>
          <Navbar/>
    <div className="container">
          {/* <Alert/> */}
            <Routes>
              <Route exact path="/About" element={<About />} />
              <Route exact path="/Login" element={<Login />} />
              <Route exact path="/Signup" element={<Signup />} />
              <Route exact path="/" element={<Home />} />
            </Routes>
    </div>
        </Router>
      </NoteState>
    </AlertState>
    </>
  );
}

export default App;
