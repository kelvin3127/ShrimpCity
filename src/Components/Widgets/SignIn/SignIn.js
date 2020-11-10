import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom'
import { emailSignInStart, googleSignInStart } from '../../../redux/User/user.actions'

import './signin.css'

import FormInput from '../Forms/FormInput/FormInput';
import AuthWrapper from '../AuthWrapper/AuthWrapper';
import Button from '../Forms/Button/Button'

const mapState = ({ user }) => ({
    currentUser: user.currentUser
  });

const SignIn = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { currentUser } = useSelector(mapState);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    useEffect(() => {
        if (currentUser) {
          resetForm();
          history.push('/');
        }
    
      }, [currentUser]);
    
      const resetForm = () => {
        setEmail('');
        setPassword('');
      };

      const handleSubmit = e => {
        e.preventDefault();
        dispatch(emailSignInStart({ email, password }));
      }
    
      const handleGoogleSignIn = () => {
        dispatch(googleSignInStart());
      }
    
      const configAuthWrapper = {
        headline: 'LogIn'
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

export default SignIn;