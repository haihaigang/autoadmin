// 引入全局样式，包含antd+自定义的
import './assets/less/antd-mei.less';
import './assets/scss/mei.scss';

import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Message } from 'antd'
import 'moment/locale/zh-cn'

import AllRouter from './router';
import { HomeApp, NotFoundApp } from './base/';
import BaseConfig from './config/BaseConfig.js';

//添加一些antd全局的配置
Message.config({
    duration: 3,
});

ReactDom.render(
    <Router>
        <Switch>
            <Route exact path={BaseConfig.PATH} component={HomeApp} />
            <Route exact path={BaseConfig.PATH + '/dashboard'} component={HomeApp} />
            {AllRouter.map((item, i) => (
                <Route key={i} path={item.path} component={item.component} />
            ))}
            <Route component={NotFoundApp}/>
        </Switch>
    </Router>,
    document.getElementById('mei-app')
);
