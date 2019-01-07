import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Form, Icon, message, Button, Input, Checkbox } from "antd";
import React from "react";
import {Link} from "react-router-dom"

const LOGIN = gql`
    mutation ( $email: String!, $password: String!) {
        login(email: $email, password: $password) {
            ok
            errors {
                path
                message
            }
            token
            refreshToken
        }
    }
`;

const muStyle={
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    height:'100vh'
}

class Login extends React.Component {

    sendMsg = async (values, login) => {
        const { password, email } = values;

        const msg = await login({
            variables: {email, password }
        });
        const { ok, errors,token,refreshToken } = msg.data.login;
        if (ok) {
            localStorage.setItem('token', token);
            localStorage.setItem('refreshToken', refreshToken);
            message.success("Login successfully");
            let { from } = this.props.location.state || { from: { pathname: "/" } }
            this.props.history.push('/chatroom');
            // this.props.history.push(from);
        } else {
            errors.forEach(e => {
                message.error(e.message);
            });
            console.log(this.state);
        }
    };

    handleSubmit = async (e, login) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.sendMsg(values, login);
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div style={muStyle}>
            <Mutation mutation={LOGIN}> 
                {(login, { data }) => (
                    <Form
                        onSubmit={e => this.handleSubmit(e, login)}
                        className="login-form"
                        style={{}}
                    >
                        <Form.Item>
                            {getFieldDecorator("email", {
                                rules: [
                                    {
                                        required: true,
                                        message: "Please input your email!"
                                    }
                                ]
                            })(
                                <Input
                                    name="email"
                                    prefix={
                                        <Icon
                                            type="mail"
                                            style={{ color: "rgba(0,0,0,.25)" }}
                                        />
                                    }
                                    placeholder="Email"
                                />
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator("password", {
                                rules: [
                                    {
                                        required: true,
                                        message: "Please input your Password!"
                                    }
                                ]
                            })(
                                <Input
                                    name="password"
                                    type="password"
                                    prefix={
                                        <Icon
                                            type="lock"
                                            style={{ color: "rgba(0,0,0,.25)" }}
                                        />
                                    }
                                    placeholder="Password"
                                />
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator("remember", {
                                valuePropName: "checked",
                                initialValue: true
                            })(<Checkbox>Remember me</Checkbox>)}
                            {/* <a className="login-form-forgot" href="">Forgot password</a> */}
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="login-form-button"
                            >       
                                Log In
                            </Button>
                            <br/>
                            Or <Link to='/register'>register now!</Link>
                        </Form.Item>
                    </Form>
                )}
            </Mutation>
            </div>
        );
    }
}

export default Form.create()(Login);
