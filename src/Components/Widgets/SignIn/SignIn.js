import React, { Component } from 'react'
import Button from '../Forms/Button/Button'
import './signin.css'
import { signInWithGoogle, auth } from '../../../firebase/utils';

import FormInput from '../Forms/FormInput/FormInput';


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

    return (
        <div className="m-5">
            <div className="formContainer">
                <div className="m-3">
                    <h2>
                        Login
                    </h2>
                </div>
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

                    <Button  className="SigninBtn" type="submit">
                        Login
                    </Button>

                    <Button onClick={signInWithGoogle} className="SigninBtn">
                        Signin with Google
                    </Button>

                </form>
            </div>
        </div>
        )   
    }
}

export default SignIn;