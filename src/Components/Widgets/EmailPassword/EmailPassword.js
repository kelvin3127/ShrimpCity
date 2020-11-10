import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './emailpassword.css'

import AuthWrapper from '../AuthWrapper/AuthWrapper';
import FormInput from '../Forms/FormInput/FormInput';
import Button from '../Forms/Button/Button';

import { auth } from '../../../firebase/utils';

const initialState = {
    email: '',
    errors: [],
}


class EmailPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...initialState
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        const config = {
            url: 'http://localhost:3000/login'
        }

        try {

            const { email } = this.state
            
            await auth.sendPasswordResetEmail( email, config)
                .then( () => {
                    this.props.history.push("./login");
                })
                .catch(() => {
                    const err = ['Email not found, Please try again.'];
                    this.setState({
                        errors: err
                    })
                })

        } catch(err) {
            //console.log(err);
        }
    }



    render() {
        const { email, errors } = this.state;

        const configAuthWrapper = {
            headline: 'Reset Password'
        }
        return (
            <AuthWrapper {...configAuthWrapper}>
                <div className="container">

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

                    <form onSubmit={this.handleSubmit}>

                        <FormInput
                            type="email"
                            name="email"
                            value={email}
                            placeholder="Email"
                            onChange={this.handleChange}
                        />

                        <Button className="authBtn">
                            Reset
                        </Button>

                    </form>
                </div>
            </AuthWrapper>
        )
    }
}

export default withRouter(EmailPassword);
