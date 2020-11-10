import React from 'react'


const FormInput = ({ HandleChange, label, ...otherProps}) => {
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
                <input className="formInput" onChange={HandleChange} {...otherProps} />
                
            </div>
        </div>
    )
}

export default FormInput;