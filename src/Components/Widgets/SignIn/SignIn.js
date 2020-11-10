import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'

import './signin.css'
import { signInWithGoogle, auth } from '../../../firebase/utils';

import FormInput from '../Forms/FormInput/FormInput';
import AuthWrapper from '../AuthWrapper/AuthWrapper';
import Button from '../Forms/Button/Button'

const SignIn = (props) => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const resetForm = () => {
        setEmail('');
        setPassword('');
    }

    const handleSubmit = async e => {
        e.preventDefault();
        try {          
            await auth.signInWithEmailAndPassword(email, password);
            resetForm();
            props.history.push('/');

        } catch(err) {
            //console.log(err)
        }
    }

    const configAuthWrapper = {
        headline: 'Login'
    };

    return (
            <AuthWrapper {...configAuthWrapper}>
                <form onSubmit={handleSubmit}>

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

                    <Button  className="authBtn" type="submit">
                        Login
                    </Button>

                    <Button onClick={signInWithGoogle} className="authBtn">
                        Login with Google
                    </Button>

                    <div className="links">
                        <Link to="/recovery">
                            <Button className="authBtn">
                                Reset Password
                            </Button>
                        </Link>
                    </div>

                </form>
            </AuthWrapper>
        )   
}

export default withRouter(SignIn);