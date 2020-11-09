import React from 'react'
import './button.css'

const Button = ({ children, ...otherProps }) => {
    return (
        <button className="btn btn-primary m-3" {...otherProps}>
            {children}
        </button>
    )
}

export default Button;