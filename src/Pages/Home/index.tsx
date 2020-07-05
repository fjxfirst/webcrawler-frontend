import React, {useCallback, useEffect, useState} from 'react';
import {Redirect} from 'react-router-dom';
import {Button, message} from 'antd';
import ReactEcharts from "echarts-for-react";
import axios from 'axios';
import moment from 'moment';
import './style.css';
interface MovieItem{
    movieName:string;
    score:number;
}
interface State{
    loaded:boolean;
    isLogin:boolean;
    data:{
        [key:string]:MovieItem
    }
}
const Home: React.FC = () => {
    let [isLogin, setIsLogin] = useState(true);
    let [data, setData] = useState({});
    let [option,setOption] = useState({});
    useEffect(() => {
        axios.get('/api/isLogin')
            .then(res => {
                setIsLogin(res.data.data);
            });
        axios.get('/api/showData')
        .then(res=>{
            if(res.data?.data){
                const data= res.data.data;
                console.log(data);
                setData(data);
                const movies:any[] = [];
                const times:any[]=[];
                for(let time in data){
                    times.push(moment(new Date(time)).format('YYYY-MM-DD'));
                }
                data[Object.keys(data)[0]].forEach((movie:any) => {
                   movies.push(movie.movieName.substr(0, movie.movieName.indexOf('/')));
                });

                const option = {
                    title: {
                        text: '电影得分'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: movies
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: times
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name: '邮件营销',
                            type: 'line',
                            stack: '总量',
                            data: [120, 132, 101, 134, 90, 230, 210]
                        },
                        {
                            name: '联盟广告',
                            type: 'line',
                            stack: '总量',
                            data: [220, 182, 191, 234, 290, 330, 310]
                        },
                        {
                            name: '视频广告',
                            type: 'line',
                            stack: '总量',
                            data: [150, 232, 201, 154, 190, 330, 410]
                        },
                        {
                            name: '直接访问',
                            type: 'line',
                            stack: '总量',
                            data: [320, 332, 301, 334, 390, 330, 320]
                        },
                        {
                            name: '搜索引擎',
                            type: 'line',
                            stack: '总量',
                            data: [820, 932, 901, 934, 1290, 1330, 1320]
                        }
                    ]
                };

                setOption(option)
            }
        })
    }, []);
    const logOut = () => {
        axios.get('/api/logout')
            .then(res => {
                if (res.data?.data) {
                    setIsLogin(false);
                } else {
                    message.error('退出失败');
                }
            });
    };
    const getData = () => {
      axios.get('/api//getData')
      .then(res=>{
         if(res.data?.data){
             message.success('爬取成功')
         }
      })
    };
    if (isLogin) {
        return (
            <>
                <div className="btn-group">
                    <Button type="primary" onClick={getData}>爬取</Button>
                    <Button type="primary" onClick={logOut}>退出</Button>
                </div>
                <ReactEcharts style={{width: '80%',margin:'0 auto'}} option={option} />
            </>
        );
    } else {
        return <Redirect to="/login"/>;
    }

};
export default Home;