import React from 'react'


const FormInput = ({ handleChange, label, ...otherProps}) => {
    return (
        <div className="container-fluid">
            <div className="col">
                <div className="row">
                    {label && (
                        <label>
                            {label}
                        </label>
                    )}
                </div>
                <input className="formInput" onChange={handleChange} {...otherProps} />
                
            </div>
        </div>
    )
}

export default FormInput;