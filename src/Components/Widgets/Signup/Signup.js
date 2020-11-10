import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector }from 'react-redux'
import './signup.css'
import { useHistory } from 'react-router-dom'
import { signUpUserStart } from '../../../redux/User/user.actions'

// Form imports
import FormInput from '../Forms/FormInput/FormInput';
import Button from '../Forms/Button/Button';
import AuthWrapper from '../AuthWrapper/AuthWrapper';

const mapState = ({ user }) => ({
    currentUser: user.currentUser,
    userErr: user.userErr
  });

const Signup = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { currentUser, userErr } = useSelector(mapState);
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(() => {
    if (currentUser) {
        reset();
        history.push('/');
    }

    }, [currentUser]);

    useEffect(() => {
    if (Array.isArray(userErr) && userErr.length > 0) {
        setErrors(userErr);
    }

    }, [userErr]);
    
    const reset = () => {
        setDisplayName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setErrors([]);
        };

    const handleFormSubmit = event => {
        event.preventDefault();
        dispatch(signUpUserStart({
            displayName,
            email,
            password,
            confirmPassword
        }));
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
                    handleChange={e => setConfirmPassword(e.target.value)}
                />

                <Button type="submit" className="authBtn">
                    Register
                </Button>
            </form>
    </AuthWrapper>

    )
    
}

export default Signup;