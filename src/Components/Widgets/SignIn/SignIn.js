import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Button from '../Forms/Button/Button'
import './signin.css'
import { signInWithGoogle, auth } from '../../../firebase/utils';

import FormInput from '../Forms/FormInput/FormInput';
import AuthWrapper from '../AuthWrapper/AuthWrapper';


const initialState = {
    email: '',
    password: ''
}

class SignIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ...initialState
        };

        this.handleChange = this.handleChange.bind(this);
    }
    
    handleSubmit = async e => {
        e.preventDefault();
        const { email, password } = this.setState;

        try {
            
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({
                ...initialState
            })

        } catch(err) {
            //console.log(err)
        }
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    render() {

    const { email, password } = this.state;

    const configAuthWrapper = {
        headline: 'Login'
    };

    return (
            <AuthWrapper {...configAuthWrapper}>
                <form onSubmit={this.handleSubmit}>

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
}

export default SignIn;