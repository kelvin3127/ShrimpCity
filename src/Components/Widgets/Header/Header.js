import React from 'react'
import './header.css'
import { useSelector, useDispatch } from 'react-redux';
import { signOutUserStart } from '../../../redux/User/user.actions'
import { Link } from 'react-router-dom';
import Logo from '../../../Assets/Img/Logo.png'
import AdminToolbar from '../AdminToolbar/AdminToolbar';

const mapState = ({ user }) => ({
    currentUser: user.currentUser
  });

const Header = (props)  => {
    const dispatch = useDispatch();
    const { currentUser } = useSelector(mapState);
  
    const signOut = () => {
      dispatch(signOutUserStart());
    };

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
                            <span onClick={() => signOut()}>
                                Logout
                            </span>
                        </a>
                        <div className="m-3 navText">
                            <AdminToolbar />
                        </div>
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

export default Header;