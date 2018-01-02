//TODO 按需引入你的样式
//require('../scss/Demo.scss');

import React from 'react';
import BaseApp from '../../../base/containers/BaseApp';
import DemoStore from '../stores/DemoStore';
import DemoActions from '../actions/DemoActions';

import MeiSidebar from '../../../base/components/MeiSidebar';
import MeiSidebarBar from '../../../base/components/MeiSidebarBar';
import MeiList from '../../../base/components/MeiList';
import MeiPagination from '../../../base/components/MeiPagination';
import MeiAdd from '../../../base/components/MeiAdd';
import MeiColumn from '../../../base/components/MeiColumn';
import MeiMenu from '../../../base/components/MeiMenu';
import MeiMenuFunc from '../../../base/components/MeiMenuFunc';
import MeiChangePassword from '../../../base/components/MeiChangePassword';

import DemoForm from '../components/DemoForm';
import DemoDetail from '../components/DemoDetail';
import DemoSearch from '../components/DemoSearch';

/**
 * 容器组件-
 */
class DemoApp extends BaseApp{
    constructor(props){
        super(props, DemoStore, DemoActions);

    }

    componentDidMount() {
        super.componentDidMount();
        
        this._action.getMenuList2();
        this._action.search();
    }

    componentWillUnmount() {
        super.componentWillUnmount();
    }

    /**
     * 可以添加或修改自定义的state数据
     * @return {[type]} [description]
     */
    getAppState(){
        return super.getAppState();
    }

    /**
     * @return {object}
     */
    render() {
        return(
            <div>
                <MeiMenu
                    {...this.state.menu}
                    onAvatarClick={DemoActions.handleAvatarClick.bind(DemoActions)}/>
                <MeiMenuFunc
                    visible={this.state.menuFuncVisible}
                    onShowPassword={DemoActions.toggleChangePassword.bind(DemoActions)}
                    onLogout={DemoActions.logout.bind(DemoActions)}
                    onClear={DemoActions.handleClear.bind(DemoActions)} />
                <MeiChangePassword
                    visible={this.state.passwordVisible}
                    onCancel={DemoActions.toggleChangePassword.bind(DemoActions, false)}
                    onSubmit={DemoActions.changePassword.bind(DemoActions)} />
                <div className="mei-container">
                    <MeiSidebar 
                        {...this.state.sidebar} 
                        onClick={DemoActions.clickSidebar.bind(DemoActions)}/>
                    <div className="mei-content">
                        <MeiSidebarBar 
                            {...this.state.sidebar}
                            onClick={DemoActions.changeSidebarStatus.bind(DemoActions)}/>
                        <DemoSearch 
                            {...this.state.search} 
                            onSearch={DemoActions.search.bind(DemoActions)}
                            onFieldsChange={DemoActions.updateFieldsData.bind(DemoActions)} />
                        <MeiList
                            {...this.state.list}
                            onColumnEdit={DemoActions.toggleColumnDialog.bind(DemoActions,true)}
                            onOperateClick={DemoActions.handleOperateClick.bind(DemoActions)}/>
                        <MeiPagination 
                            {...this.state.pagination} 
                            onChange={DemoActions.search.bind(DemoActions)}/>
                        <MeiAdd onClick={DemoActions.toggleFormDialog.bind(DemoActions, true)}/>
                        <DemoForm 
                            {...this.state.form} 
                            onSave={DemoActions.save.bind(DemoActions)} 
                            onCancel={DemoActions.toggleFormDialog.bind(DemoActions, false)}
                            onDataChange={DemoActions.updateFormData.bind(DemoActions)}
                            onFieldsChange={DemoActions.updateFieldsData.bind(DemoActions)}
                            />
                        <DemoDetail
                            {...this.state.detail}
                            onCancel={DemoActions.toggleDetailDialog.bind(DemoActions, false)}
                            />
                        <MeiColumn 
                            {...this.state.column} 
                            onSave={DemoActions.saveColumn.bind(DemoActions)} 
                            onCancel={DemoActions.toggleColumnDialog.bind(DemoActions, false)} />
                    </div>
                </div>
            </div>
        );
    }
}

export default DemoApp;