import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom'
import { signInUser, signInWithGoogle, resetAllAuthForms } from '../../../redux/User/user.actions'

import './signin.css'

import FormInput from '../Forms/FormInput/FormInput';
import AuthWrapper from '../AuthWrapper/AuthWrapper';
import Button from '../Forms/Button/Button'

const mapState = ({ user }) => ({
    signInSucess: user.signInSucess
});

const SignIn = (props) => {

    const { signInSucess } = useSelector(mapState)
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (signInSucess) {
            resetForm();
            dispatch(resetAllAuthForms());
            props.history.push('/');
        }
    }, [signInSucess])

    const resetForm = () => {
        setEmail('');
        setPassword('');
    }

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(signInUser({email, password}));

    }

    const handleGoogleSignIn = () => {
        dispatch(signInWithGoogle());
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

                    <Button onClick={handleGoogleSignIn} className="authBtn">
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