import React, { useState } from 'react'
import './signup.css'
import { withRouter } from 'react-router-dom'
// Authentication Imports
import { auth, handleUserProfile } from '../../../firebase/utils';

// Form imports
import FormInput from '../Forms/FormInput/FormInput';
import Button from '../Forms/Button/Button';
import AuthWrapper from '../AuthWrapper/AuthWrapper';

const Signup = (props) => {

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

    const handleFormSubmit = async event => {
        event.preventDefault();

        if (password !== confirmPassword) {

            const err = ['Passowrd Don\'t Match'];
            setErrors(err);
            return;
        }

        try {
            
            const { user } = await auth.createUserWithEmailAndPassword(email, password);

            await handleUserProfile(user, { displayName })
            
            reset();

            props.history.push('/');

        } catch(err) {
            //console.log(err)
        }
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