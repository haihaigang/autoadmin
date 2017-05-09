//TODO 按需引入你的样式
//require('../scss/[MODULE].scss');

import React from 'react';
import BaseApp from '../../../base/containers/BaseApp';
import [MODULE]Store from '../stores/[MODULE]Store';
import [MODULE]Actions from '../actions/[MODULE]Actions';

import MeiSidebar from '../../../base/components/MeiSidebar';
import MeiSidebarBar from '../../../base/components/MeiSidebarBar';
import MeiList from '../../../base/components/MeiList';
import MeiPagination from '../../../base/components/MeiPagination';
import MeiAdd from '../../../base/components/MeiAdd';
import MeiColumn from '../../../base/components/MeiColumn';
import MeiMenu from '../../../base/components/MeiMenu';
import MeiMenuFunc from '../../../base/components/MeiMenuFunc';
import MeiChangePassword from '../../../base/components/MeiChangePassword';

import [MODULE]Form from '../components/[MODULE]Form';
import [MODULE]Detail from '../components/[MODULE]Detail';
import [MODULE]Search from '../components/[MODULE]Search';

/**
 * 容器组件-[MODULE]
 */
class [MODULE]App extends BaseApp{
	constructor(props){
		super(props, [MODULE]Store, [MODULE]Actions);

	}

    componentDidMount() {
        super.componentDidMount();
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
                    onAvatarClick={[MODULE]Actions.handleAvatarClick.bind([MODULE]Actions)}/>
                <MeiMenuFunc
                    visible={this.state.menuFuncVisible}
                    onShowPassword={[MODULE]Actions.toggleChangePassword.bind([MODULE]Actions)}
                    onLogout={[MODULE]Actions.logout.bind([MODULE]Actions)}
                    onClear={[MODULE]Actions.handleClear.bind([MODULE]Actions)} />
                <MeiChangePassword
                    visible={this.state.passwordVisible}
                    onCancel={[MODULE]Actions.toggleChangePassword.bind([MODULE]Actions, false)}
                    onSubmit={[MODULE]Actions.changePassword.bind([MODULE]Actions)} />
                <div className="mei-container">
                    <MeiSidebar 
                        {...this.state.sidebar} 
                        onClick={[MODULE]Actions.clickSidebar.bind([MODULE]Actions)}/>
                    <div className="mei-content">
                        <MeiSidebarBar 
                            {...this.state.sidebar}
                            onClick={[MODULE]Actions.changeSidebarStatus.bind([MODULE]Actions)}/>
                        <[MODULE]Search 
                            {...this.state.search} 
                            onSearch={[MODULE]Actions.search.bind([MODULE]Actions)} />
                        <MeiList
                            {...this.state.search}
                            columns={this.state.columns}
                            dataSource={this.state.dataSource}
                            onColumnEdit={[MODULE]Actions.toggleColumnDialog.bind([MODULE]Actions,true)}
                            onOperateClick={[MODULE]Actions.handleOperateClick.bind([MODULE]Actions)}/>
                        <MeiPagination 
                            {...this.state.pagination} 
                            onChange={[MODULE]Actions.search.bind([MODULE]Actions)}/>
                        <MeiAdd onClick={[MODULE]Actions.toggleFormDialog.bind([MODULE]Actions, true)}/>
                        <[MODULE]Form 
                            {...this.state.form} 
                            onSave={[MODULE]Actions.save.bind([MODULE]Actions)} 
                            onCancel={[MODULE]Actions.toggleFormDialog.bind([MODULE]Actions, false)}
                            onDataChange={[MODULE]Actions.updateFormData.bind([MODULE]Actions)}
                            onFieldsChange={[MODULE]Actions.updateFieldsData.bind([MODULE]Actions)}
                            />
                        <[MODULE]Detail
                            {...this.state.detail}
                            onCancel={[MODULE]Actions.toggleDetailDialog.bind([MODULE]Actions, false)}
                            />
                            }
                        <MeiColumn 
                            {...this.state.column} 
                            onSave={[MODULE]Actions.saveColumn.bind([MODULE]Actions)} 
                            onCancel={[MODULE]Actions.toggleColumnDialog.bind([MODULE]Actions, false)} />
                    </div>
                </div>
            </div>
        );
    }
}

export default [MODULE]App;