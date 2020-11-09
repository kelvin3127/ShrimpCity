import React from 'react'

import './header.css'
import { Link } from 'react-router-dom';
import Logo from '../../../Assets/Img/Logo.png'

const Header = (props)  => {
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
                
                <ul class="navbar nav justify-content-end ">
                    <li class="nav-item">
                        <Link to="/registration">
                            Register
                        </Link>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Link</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Link</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Disabled</a>
                    </li>
                </ul>
            </div>
            
        </nav>
    )
}

export default Header