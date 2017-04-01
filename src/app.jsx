// 引入全局样式，包含antd+自定义的
import './base/less/antd-mei.less'
import './base/scss/mei.scss'

import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Message } from 'antd'
import 'moment/locale/zh-cn'

import ChildRouter from './router'
import HomeApp from './base/containers/HomeApp'
import NotFound from './base/containers/NotFound'
import AccountApp from './pages/account/containers/AccountApp'

//添加一些antd全局的配置
Message.config({
    duration: 3,
});

ReactDom.render(
    <Router>
        <Switch>
            <Route exact path="/kiwi" component={HomeApp} />
            {ChildRouter.map((item, i) => (
                <Route key={i} path={item.path} component={item.component} />
            ))}
            <Route exact path="/kiwi/account" component={AccountApp} />
            <Route component={NotFound}/>
        </Switch>
    </Router>,
    document.getElementById('mei-app')
);
