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

function App() {
  return (
    <>
    <AlertState>
      <NoteState>
        <Router>
          <Navbar/>
          <Alert/>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/About" element={<About />} />
              <Route exact path="/Login" element={<Login />} />
              <Route exact path="/Signup" element={<Signup />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </AlertState>
    </>
  );
}

export default App;
