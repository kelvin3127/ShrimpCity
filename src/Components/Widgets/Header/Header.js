import React from 'react'
import { connect } from 'react-redux'
import './header.css'
import { Link } from 'react-router-dom';
import Logo from '../../../Assets/Img/Logo.png'
import { auth } from '../../../firebase/utils'

const Header = (props)  => {

    const { currentUser } = props;

    return (
        <nav className="navbar bg-light ShrimpBanner dimmer">
            <div className="container-fluid ">
                <div className="row">
                    <div className="col">
                        <Link to="/">
                            <img src={Logo} alt="Shrimp Logo" loading="lazy"/>
                        </Link>
                    </div>
                    <div className="col-8 mt-4">
                        <p className="display-4 Logo">Shrimp City</p>
                    </div>
                </div>

                {currentUser && (
                    <div id="textColor" className="navbar justify-content-end ">
                        <div className="m-3 navText">
                            <Link to="/dashboard">
                                My Account
                            </Link>
                        </div>
                        <a href="#" className="m-3 navText ">
                            <span onClick={() => auth.signOut()}>
                                Logout
                            </span>
                        </a>
                    </div>
                )}

                {!currentUser && (
                    <div className="navbar justify-content-end">
                        <div className="m-3 navText">
                            <Link to="/registration">
                                Register
                            </Link>
                        </div>
                        <div className="m-3 navText">
                            <Link to="/login">
                                Login
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}

Header.defaultProps = {
    currentUser: null
}

const mapStateToProps = ({ user }) => ({
    currentUser: user.currentUser
})

export default connect(mapStateToProps, null)(Header);