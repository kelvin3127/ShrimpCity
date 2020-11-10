import React from 'react';
import './authwrapper.css'

const AuthWrapper = ( { headline, children }) => {
    return (
        <div className="authWrapper mt-5">
            {headline && <h2>{headline}</h2>}
            <div className="children">
                {children && children}
            </div>
        </div>
    )
}

export default AuthWrapper;