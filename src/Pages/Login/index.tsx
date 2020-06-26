import React, {useState} from 'react';
import {Form, Input, Button, message} from 'antd';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
import './style.css';

const Login: React.FC = () => {
    let [isLogin, setIsLogin] = useState(false);
    const onFinish = (values: any) => {
        console.log('Success:', values);
        axios.post('/api/login', qs.stringify({password: values.password}), {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
            .then(res => {
                if(res.data?.data){
                    setIsLogin(res.data.data);
                }else{
                    message.error('登录失败');
                }
            })
            .catch(e => {
                message.error('登录失败');
            });
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    if (!isLogin) {
        return (
            <div className="login-page">
                <Form
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password placeholder="请输入密码"/>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    } else {
        return (<Redirect to="/"/>);
    }

};
export default Login;