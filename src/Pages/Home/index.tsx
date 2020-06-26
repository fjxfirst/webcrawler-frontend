import React, {useEffect, useState} from 'react';
import {Redirect} from 'react-router-dom';
import {Button, message} from 'antd';
import axios from 'axios';
import './style.css';

const Home: React.FC = () => {
    let [isLogin, setIsLogin] = useState(true);
    useEffect(() => {
        axios.get('/api/isLogin')
            .then(res => {
                setIsLogin(res.data.data);
            });
    }, []);
    let logOut = () => {
        axios.get('/api/logout')
            .then(res => {
                if (res.data?.data) {
                    setIsLogin(false);
                } else {
                    message.error('退出失败');
                }
            });
    };
    if (isLogin) {
        return (
            <div className="btn-group">
                <Button type="primary">爬取</Button>
                <Button type="primary">展示</Button>
                <Button type="primary" onClick={logOut}>退出</Button>
            </div>
        );
    } else {
        return <Redirect to="/login"/>;
    }

};
export default Home;