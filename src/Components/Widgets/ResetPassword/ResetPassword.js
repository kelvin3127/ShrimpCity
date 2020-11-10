import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import './resetpassword.css'

import AuthWrapper from '../AuthWrapper/AuthWrapper';
import FormInput from '../Forms/FormInput/FormInput';
import Button from '../Forms/Button/Button';

import { auth } from '../../../firebase/utils';


const ResetPassword = (props) => {

    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState([]);

    const reset = () => {
        setEmail('');
        setErrors([]);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const config = {
            url: 'http://localhost:3000/login'
        }

        try {
            
            await auth.sendPasswordResetEmail( email, config)
                .then( () => {
                    props.history.push("./login");
                })
                .catch(() => {
                    const err = ['Email not found, Please try again.'];
                    setErrors(err);
                })

        } catch(err) {
            //console.log(err);
        }
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
