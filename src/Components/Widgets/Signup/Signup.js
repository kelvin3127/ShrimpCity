import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector }from 'react-redux'
import './signup.css'
import { withRouter } from 'react-router-dom'
import { signUpUser, resetAllAuthForms } from '../../../redux/User/user.actions'

// Form imports
import FormInput from '../Forms/FormInput/FormInput';
import Button from '../Forms/Button/Button';
import AuthWrapper from '../AuthWrapper/AuthWrapper';

const mapState = ({ user }) => ({
    signUpSuccess: user.signUpSuccess,
    signUpError: user.signUpError
})

const Signup = (props) => {
    const { signUpSuccess, signUpError } = useSelector(mapState);
    const dispatch = useDispatch();
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setconfirmedPassword] = useState('');
    const [errors, setErrors] = useState([]);

    
    const reset = () => {
        setDisplayName('');
        setEmail('');
        setPassword('');
        setconfirmedPassword('');
        setErrors([]);
    }

    useEffect(() => {
        if (signUpSuccess) {
            reset();
            dispatch(resetAllAuthForms());
            props.history.push('/');
        }
    }, [signUpSuccess]);

    useEffect(() => {
        if (Array.isArray(signUpError) && signUpError.length > 0 ) {
            setErrors(signUpError);
        }
    }, [signUpError]);


    const handleFormSubmit = event => {
        event.preventDefault();
        dispatch(signUpUser({displayName, email, password, confirmPassword}));
        
    }
        
        const configAuthWrapper = {
            headline: 'Signup'
        };
        return (

            <AuthWrapper {...configAuthWrapper}>

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

                <form onSubmit={handleFormSubmit}>
                    <FormInput
                        type="text"
                        name="displayName"
                        value={displayName}
                        placeholder="Full Name"
                        handleChange={e => setDisplayName(e.target.value)}
                    />

                    <FormInput 
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Email"
                        handleChange={e => setEmail(e.target.value)}
                    />

                    <FormInput 
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Password"
                        handleChange={e => setPassword(e.target.value)}
                    />

                    <FormInput 
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        placeholder="Confirm Password"
                        handleChange={e => setconfirmedPassword(e.target.value)}
                    />

                    <Button type="submit" className="authBtn">
                        Register
                    </Button>
                </form>
        </AuthWrapper>

        )
    
}

export default withRouter(Signup);