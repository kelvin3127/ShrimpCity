import React, { Component } from 'react'
import Button from '../Forms/Button/Button'
import './signin.css'

import { signInWithGoogle } from '../../../firebase/utils';

class SignIn extends Component {

        
        handleSubmit = async e => {
            e.preventDefault();
        }

        render() {
        return (
            <div className="container-fluid m-5">
                <div>
                <h2>
                    Login
                </h2>
                </div>
                <div className="container">
                    <form onSubmit={this.handleSubmit}>
                        <div className="socialSignin">
                            <div className="row">
                                <Button onClick={signInWithGoogle}>
                                    Signin with Google
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default SignIn;