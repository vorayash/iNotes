import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import  {useNavigate}  from 'react-router-dom'

const Navbar = () => {
    let navigate = useNavigate();
    const logoutHandler=()=>{
        localStorage.removeItem('token');
        navigate('/login');
    }
    let location = useLocation();
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Navbar</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==="/About"?"active":""}`} to="/About">About</Link>
                            </li>
                        </ul>
                        {!localStorage.getItem('token')?<>
                        <Link className="btn btn-primary mx-1" to="/Login" role="button">Login</Link>
                        <Link className="btn btn-primary mx-1" to="/Signup" role="button">Sign Up</Link>
                        </>: <button className="btn btn-primary mx-1" onClick={logoutHandler} role="button">Logout</button> }
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
