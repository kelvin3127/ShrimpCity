import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import './resetpassword.css'

import { useDispatch, useSelector } from 'react-redux' 
import { resetPassword, resetAllAuthForms } from '../../../redux/User/user.actions'
import AuthWrapper from '../AuthWrapper/AuthWrapper';
import FormInput from '../Forms/FormInput/FormInput';
import Button from '../Forms/Button/Button';

const mapState = ({ user}) => ({
    resetPasswordSuccess: user.resetPasswordSuccess,
    resetPasswordError: user.resetPasswordError
})

const ResetPassword = (props) => {
    const { resetPasswordSuccess, resetPasswordError } = useSelector(mapState);
    const dispatch = useDispatch();
    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (resetPasswordSuccess) {
            dispatch(resetAllAuthForms());
            props.history.push('/login');
        }
    }, [resetPasswordSuccess])

    useEffect(() => {
        if (Array.isArray(resetPasswordError) && resetPasswordError.length > 0 ) {
            setErrors(resetPasswordError);
        }
    })

    const reset = () => {
        setEmail('');
        setErrors([]);
    }

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(resetPassword({ email }));

    }

        const configAuthWrapper = {
            headline: 'Reset Password'
        }
        return (
            <AuthWrapper {...configAuthWrapper}>
                <div className="container">

                    {errors.length > 0 && (
                        <div>
                            {errors.map((err, index) => {
                                return(
                                    <p key={index} className="errMsg">
                                        {err}
                                    </p>
                                )
                            })}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>

                        <FormInput
                            type="email"
                            name="email"
                            value={email}
                            placeholder="Email"
                            handleChange={ e => setEmail(e.target.value)}
                        />

                        <Button className="authBtn">
                            Reset
                        </Button>

                    </form>
                </div>
            </AuthWrapper>
        )
    
}

export default withRouter(ResetPassword);
