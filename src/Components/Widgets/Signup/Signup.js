import React, { Component } from 'react'
import './signup.css'

// Authentication Imports
import { auth, handleUserProfile } from '../../../firebase/utils';

// Form imports
import FormInput from '../Forms/FormInput/FormInput';
import Button from '../Forms/Button/Button';
import AuthWrapper from '../AuthWrapper/AuthWrapper';

const initialState = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
    errors: ''
};

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...initialState
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;

        this.setState({
            [name]: value
        })
    }

    handleFormSubmit = async event => {
        event.preventDefault();
        const { displayName, email, password, confirmPassword, errors} = this.state;

        if (password !== confirmPassword) {

            const err = ['Passowrd Don\'t Match'];
            this.setState({
                errors: err
            })
            return;
        }

        try {
            
            const { user } = await auth.createUserWithEmailAndPassword(email, password);

            await handleUserProfile(user, { displayName })

            this.setState({
                ...initialState
            });

        } catch(err) {
            //console.log(err)
        }
    }

    render() {

        const { displayName, email, password, confirmPassword, errors } = this.state;
        
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

                <form onSubmit={this.handleFormSubmit}>
                    <FormInput
                        type="text"
                        name="displayName"
                        value={displayName}
                        placeholder="Full Name"
                        onChange={this.handleChange}
                    />

                    <FormInput 
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Email"
                        onChange={this.handleChange}
                    />

                    <FormInput 
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Password"
                        onChange={this.handleChange}
                    />

                    <FormInput 
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        placeholder="Confirm Password"
                        onChange={this.handleChange}
                    />

                    <Button type="submit" className="authBtn">
                        Register
                    </Button>
                </form>
        </AuthWrapper>

        )
    }
}

export default Signup;