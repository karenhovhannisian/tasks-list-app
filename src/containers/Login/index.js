import React, { Component } from "react";
import { connect } from "react-redux";
import { ACTIONS } from "../../redux";
import Helpers from "../../common/helpers";
import { Button, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';


class Login extends Component {

    state = {
        username: '',
        password: '',
        errors: {
            username: '',
            password: '',
        }
    }



    handleValidation(event) {
        event.preventDefault();
        const { username, password } = this.state;
        let errors = {};
        if (!username) {
            errors.username = 'Username is Required '
        }

        if (!password) {
            errors.password = 'Password Required '
        }

        this.setState({
            errors
        }, () => {
            if (!!Object.keys(errors).length) {
                return
            }
            this.login(event)
        })


    }

    login(event) {
        event.preventDefault();
        const { username, password } = this.state;

        if (username && password) {
            this.props.login({ username, password })
        }
    }

    render() {
        const { username, password, errors } = this.state;
        const { errorMessage } = this.props;
        return (
            <div className="row justify-content-center">
                <div className="col-4 border border-grey py-5">
                    <div>
                        <Form onSubmit={(e) => this.handleValidation(e)}>
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                <Label for="email" className="w-100 text-center mr-sm-2">Username</Label>
                                <Input
                                    invalid={!!errors.username}
                                    value={username}
                                    onChange={(e) => this.setState({ username: e.target.value })}
                                    name="username"
                                    placeholder="username" />
                                {<FormFeedback>{errors.username}</FormFeedback>}
                            </FormGroup>
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                <Label for="password" className="w-100 text-center mr-sm-2">Password</Label>
                                <Input
                                    invalid={!!errors.password}
                                    value={password}
                                    onChange={({ target }) => this.setState({ password: target.value })}
                                    type="password"
                                    name="password"
                                    placeholder="password" />
                                {errors.password && <FormFeedback>{errors.password}</FormFeedback>}
                            </FormGroup>
                            {
                                errorMessage && <p> {errorMessage} </p>
                            }
                            <div className="text-center mt-3"><Button type="submit">Signin</Button></div>
                        </Form>
                    </div>
                </div>
            </div >
        )
    }
};

const mapStateToProps = (state) => ({
    isLoggedIn: state.isLoggedIn,
    user: state.user,
    errorMessage: state.error,
});
const mapDispatchToProps = (dispatch) => ({
    login: (data) => dispatch(ACTIONS.attemptLogin(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login)
