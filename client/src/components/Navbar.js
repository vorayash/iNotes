import React, { useContext } from 'react'
import './css/Navbar.css';
import { Link, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import alertContext from '../context/alert/alertContext';


const Navbar = () => {
    const context = useContext(alertContext);
    const { showAlert, alertClose } = context;
    let navigate = useNavigate();
    const logoutHandler = () => {
        showAlert();
        document.cookie = null;
        localStorage.removeItem('token');
        navigate('/Login');
        alertClose("Logged out successfully", "success")
    }

    let location = useLocation();
    return (
        <div>

            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/"><b>iNotes</b></Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/About" ? "active" : ""}`} to="/About">About</Link>
                            </li>
                        </ul>
                        {!localStorage.getItem('token') ? <>
                            <Link className="link mx-1" to="/Login" role="button">Login</Link><span className="seperator">&#160; | &#160;</span>
                            <Link className="link mx-1" to="/Signup" role="button">Sign Up</Link>
                        </> :
                            <><div className="dropdown">
                                <i className="fas fa-user-circle fa-2x" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                </i>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <a className="dropdown-item" onClick={logoutHandler}>Logout</a>
                                </div>
                            </div>
                            </>
                        }
                    </div>
                </div>
            </nav>
        </div>

    )
}

export default Navbar
