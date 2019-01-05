import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Form, Icon, message, Button, Input, Checkbox } from "antd";
import React from "react";
const REGISTER = gql`
    mutation ($username: String!, $email: String!, $password: String!) {
        register(username: $username, email: $email, password: $password) {
            ok
            errors {
                path
                message
            }
        }
    }
`;

const muStyle={
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    height:'100vh'
}

class Register extends React.Component {

    sendMsg = async (values, register) => {
        const { username, password, email } = values;

        const msg = await register({
            variables: { username, email, password }
        });
        const { ok, errors } = msg.data.register;
        if (ok) {
            message.success("Register successfully");
            this.props.history.push("/");
        } else {
            errors.forEach(e => {
                message.error(e.message);
            });
            console.log(this.state);
        }
    };

    handleSubmit = async (e, register) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.sendMsg(values, register);
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div style={muStyle}>
                <Mutation mutation={REGISTER}> 
                    {(register, { data }) => (
                        <Form
                            onSubmit={e => this.handleSubmit(e, register)}
                            className="login-form"
                            style={{}}
                        >
                            <Form.Item>
                                {getFieldDecorator("username", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "Please input your username!"
                                        }
                                    ]
                                })(
                                    <Input
                                        name="username"
                                        prefix={
                                            <Icon
                                                type="user"
                                                style={{ color: "rgba(0,0,0,.25)" }}
                                            />
                                        }
                                        placeholder="Username"
                                    />
                                )}
                            </Form.Item>
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
                                    Register
                                </Button>
                                {/* Or <a href="">register now!</a> */}
                            </Form.Item>
                        </Form>
                    )}
                </Mutation>
            </div>
        );
    }
}

export default Form.create()(Register);
