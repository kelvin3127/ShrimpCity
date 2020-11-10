import React from 'react'
import './button.css'

const Button = ({ children, ...otherProps }) => {
    return (
        <button {...otherProps}>
            {children}
        </button>
    )
}

export default Button;