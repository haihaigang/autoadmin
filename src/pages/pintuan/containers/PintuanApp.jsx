//TODO 按需引入你的样式
//require('../scss/Pintuan.scss');

import React from 'react';
import { BaseApp, MeiSidebar, MeiSidebarBar, MeiList, MeiPagination, MeiAdd, MeiColumn, MeiMenu, MeiMenuFunc, MeiChangePassword } from '../../../base/';

import PintuanStore from '../stores/PintuanStore';
import PintuanActions from '../actions/PintuanActions';

import PintuanForm from '../components/PintuanForm';
import PintuanDetail from '../components/PintuanDetail';
import PintuanSearch from '../components/PintuanSearch';

/**
 * 容器组件-Pintuan
 */
class PintuanApp extends BaseApp{
	constructor(props){
		super(props, PintuanStore, PintuanActions);

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
                    onAvatarClick={PintuanActions.handleAvatarClick.bind(PintuanActions)}/>
                <MeiMenuFunc
                    visible={this.state.menuFuncVisible}
                    onShowPassword={PintuanActions.toggleChangePassword.bind(PintuanActions)}
                    onLogout={PintuanActions.logout.bind(PintuanActions)}
                    onClear={PintuanActions.handleClear.bind(PintuanActions)} />
                <MeiChangePassword
                    visible={this.state.passwordVisible}
                    onCancel={PintuanActions.toggleChangePassword.bind(PintuanActions, false)}
                    onSubmit={PintuanActions.changePassword.bind(PintuanActions)} />
                <div className="mei-container">
                    <MeiSidebar 
                        {...this.state.sidebar} 
                        onClick={PintuanActions.clickSidebar.bind(PintuanActions)}/>
                    <div className="mei-content">
                        <MeiSidebarBar 
                            {...this.state.sidebar}
                            onClick={PintuanActions.changeSidebarStatus.bind(PintuanActions)}/>
                        <PintuanSearch 
                            {...this.state.search} 
                            onSearch={PintuanActions.search.bind(PintuanActions)} />
                        <MeiList
                            {...this.state.list}
                            onColumnEdit={PintuanActions.toggleColumnDialog.bind(PintuanActions,true)}
                            onOperateClick={PintuanActions.handleOperateClick.bind(PintuanActions)}/>
                        <MeiPagination 
                            {...this.state.pagination} 
                            onChange={PintuanActions.search.bind(PintuanActions)}/>
                        <MeiAdd onClick={PintuanActions.toggleFormDialog.bind(PintuanActions, true)}/>
                        <PintuanForm 
                            {...this.state.form} 
                            onSave={PintuanActions.save.bind(PintuanActions)} 
                            onCancel={PintuanActions.toggleFormDialog.bind(PintuanActions, false)}
                            onDataChange={PintuanActions.updateFormData.bind(PintuanActions)}
                            onFieldsChange={PintuanActions.updateFieldsData.bind(PintuanActions)}
                            />
                        <PintuanDetail
                            {...this.state.detail}
                            onCancel={PintuanActions.toggleDetailDialog.bind(PintuanActions, false)}
                            />
                            }
                        <MeiColumn 
                            {...this.state.column} 
                            onSave={PintuanActions.saveColumn.bind(PintuanActions)} 
                            onCancel={PintuanActions.toggleColumnDialog.bind(PintuanActions, false)} />
                    </div>
                </div>
            </div>
        );
    }
}

export default PintuanApp;