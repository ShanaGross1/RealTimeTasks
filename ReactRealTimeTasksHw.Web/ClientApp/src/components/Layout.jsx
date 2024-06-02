import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Layout = ({ children }) => {
    const { user } = useAuth();

    return (
        <div>
            <header>
                <nav className="navbar navbar-expand-sm navbar-dark fixed-top bg-dark border-bottom box-shadow">
                    <div className="container">
                        <a className="navbar-brand">ReactRealTimeTasksHw</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target=".navbar-collapse" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                            <ul className="navbar-nav flex-grow-1">
                                <li className="nav-item"><Link to="/" className='nav-link text-light'>Home</Link></li>
                                {!!user &&
                                    <li className="nav-item"><Link to="/logout" className='nav-link text-light'>LogOut</Link></li>
                                }
                                {!user && <>
                                    <li className="nav-item"><Link to="/login" className='nav-link text-light'>Login</Link></li>
                                    <li className="nav-item"><Link to="signup/" className='nav-link text-light'>SignUp</Link></li>
                                </>}

                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
            <div className="container mt-5">
                {children}
            </div>
        </div>
    )
}

export default Layout;