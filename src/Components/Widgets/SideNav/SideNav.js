import React from 'react'
import './sidenav.css'
import { Link } from 'react-router-dom'

const SideNav = () => {
    return (
        <React.Fragment>
            <aside className="sidenav">
                <div >
                    <div>
                        <div className="m-3">
                            <img src="http://via.placeholder.com/160x160" className="rounded-circle" alt="User Image" />
                        </div>
                        <div className="m-3">
                            <p>UserName</p>
                        </div>
                    </div>
                    <hr/>
                    <ul className="links">
                        <li>
                            < Link to="/admin">
                                Home
                            </Link>
                        </li>
                        <li>
                        < Link to="/admin">
                            SignOut
                        </Link>
                        </li>
                    </ul>
                </div>
            </aside>
        </React.Fragment>
    )
}

export default SideNav;
