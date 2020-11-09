import React from 'react'

import './header.css'
import { Link } from 'react-router-dom';
import Logo from '../../../Assets/Img/Logo.png'
import { auth } from '../../../firebase/utils'

const Header = (props)  => {

    const { currentUser } = props;

    return (
        <nav class="navbar bg-light">
            <div className="container-fluid ShrimpBanner">
                <div className="row">
                    <div className="col">
                        <Link to="/">
                            <img src={Logo} alt="Shrimp Logo" loading="lazy"/>
                        </Link>
                    </div>
                    <div className="col-8 mt-4">
                        <p className="display-4">Shrimp City</p>
                    </div>
                </div>
                
                {currentUser && (
                    <ul class="navbar nav justify-content-end ">
                        <li class="nav-item m-3">
                            <span onClick={() => auth.signOut()}>
                                Logout
                            </span>
                        </li>
                    </ul>
                )}

                {!currentUser && (
                    <ul class="navbar nav justify-content-end ">
                        <li class="nav-item m-3">
                            <Link to="/registration">
                                Register
                            </Link>
                        </li>
                        <li class="nav-item">
                            <Link to="/login">
                                Login
                            </Link>
                        </li>
                    </ul>
                )}
            </div>
            
        </nav>
    )
}

Header.defaultProps = {
    currentUser: null
}

export default Header