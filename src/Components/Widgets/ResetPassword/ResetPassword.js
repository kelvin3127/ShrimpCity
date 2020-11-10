import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { resetPasswordStart, resetUserState } from '../../../redux/User/user.actions';

import './resetpassword.css'

import AuthWrapper from '../AuthWrapper/AuthWrapper';
import FormInput from '../Forms/FormInput/FormInput';
import Button from '../Forms/Button/Button';

const mapState = ({ user }) => ({
    resetPasswordSuccess: user.resetPasswordSuccess,
    userErr: user.userErr
  });

const ResetPassword = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { resetPasswordSuccess, userErr } = useSelector(mapState);
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (resetPasswordSuccess) {
          dispatch(resetUserState());
          history.push('/login');
        }
    
      }, [resetPasswordSuccess]);
    
      useEffect(() => {
        if (Array.isArray(userErr) && userErr.length > 0) {
          setErrors(userErr);
        }
    
      }, [userErr]);

      const handleSubmit = e => {
        e.preventDefault();
        dispatch(resetPasswordStart({ email }));
      }
    
      const configAuthWrapper = {
        headline: 'Email Password'
      };
      
        return (
            <AuthWrapper {...configAuthWrapper}>
                <div className="container">

                    {errors.length > 0 && (
                        <div>
                            {errors.map((e, index) => {
                                return(
                                    <p key={index} className="errMsg">
                                        {e}
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

export default ResetPassword;
