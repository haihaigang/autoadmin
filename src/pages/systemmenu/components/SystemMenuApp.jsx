//TODO 按需引入你的样式
//require('../scss/SystemMenu.scss');
import React from 'react'
import BaseApp from '../../../base/containers/BaseApp';
import SystemMenuStore from '../stores/SystemMenuStore';
import SystemMenuActions from '../actions/SystemMenuActions';
import MeiSidebar from '../../../base/components/MeiSidebar';
import MeiSidebarBar from '../../../base/components/MeiSidebarBar';
import MeiList from '../../../base/components/MeiList';
import MeiPagination from '../../../base/components/MeiPagination';
import MeiAdd from '../../../base/components/MeiAdd';
import MeiColumn from '../../../base/components/MeiColumn';
import MeiForm from '../../../base/components/MeiForm';
import MeiSearch from '../../../base/components/MeiSearch';
import MeiMenu from '../../../base/components/MeiMenu'


/**
 * Retrieve the current data from the SystemMenuStore
 */
function getAppState() {
    return {
        dataSource: SystemMenuStore.getData(),
        columns: SystemMenuStore.getColumns(),
        pagination: SystemMenuStore.getPage(),
        sidebar: {
            data: SystemMenuStore.getSubMenus(),
            current: SystemMenuStore.getCurSidebar(),
            status: SystemMenuStore.getSidebarStatus()
        },
        form: {
            visible: SystemMenuStore.getFormVisible(),
            data: SystemMenuStore.getFormData(),
            isSaving: SystemMenuStore.getSaving(),
        },
        column: {
            visible: SystemMenuStore.getColumnVisible(),
            data: SystemMenuStore.getColumns()
        },
        search: {
        }
    };
}


class SystemMenuApp extends BaseApp{
    constructor(props){
        super(props);

        this.state = getAppState();
    }

    componentDidMount() {
        SystemMenuStore.addChangeListener(this._onChange.bind(this));
        SystemMenuActions.getMenuList2();
        SystemMenuActions.search();
    }

    componentWillUnmount() {
        SystemMenuStore.removeChangeListener(this._onChange);
    }

    /**
     * @return {object}
     */
    render() {
        return(
            <div>
                <MeiMenu/>
                <div className="mei-container">
                    <MeiSidebar 
                        {...this.state.sidebar} 
                        onClick={SystemMenuActions.clickSidebar.bind(SystemMenuActions)}/>
                    <div className="mei-content">
                        <MeiSidebarBar 
                            {...this.state.sidebar}
                            onClick={SystemMenuActions.changeSidebarStatus.bind(SystemMenuActions)}/>
                        <MeiSearch 
                            {...this.state.search} 
                            onSearch={SystemMenuActions.search.bind(SystemMenuActions)} />
                        <MeiList
                            extra="has-search"
                            columns={this.state.columns}
                            dataSource={this.state.dataSource}
                            onColumnEdit={SystemMenuActions.toggleColumnDialog.bind(SystemMenuActions,true)}
                            onOperateClick={SystemMenuActions.handleOperateClick.bind(SystemMenuActions)}/>
                        <MeiPagination 
                            {...this.state.pagination} 
                            onChange={SystemMenuActions.search.bind(SystemMenuActions)}/>
                        <MeiAdd onClick={SystemMenuActions.toggleFormDialog.bind(SystemMenuActions, true)}/>
                        <MeiForm 
                            {...this.state.form} 
                            onSave={SystemMenuActions.save.bind(SystemMenuActions)} 
                            onCancel={SystemMenuActions.toggleFormDialog.bind(SystemMenuActions, false)}
                            onDataChange={SystemMenuActions.updateFormData.bind(SystemMenuActions)}/>
                        <MeiColumn 
                            {...this.state.column} 
                            onSave={SystemMenuActions.saveColumn.bind(SystemMenuActions)} 
                            onCancel={SystemMenuActions.toggleColumnDialog.bind(SystemMenuActions, false)} />
                    </div>
                </div>
            </div>
        );
    }

    /**
     * Event handler for 'change' events coming from the SystemMenuStore
     */
    _onChange() {
        this.setState(getAppState());
    }
}

export default SystemMenuApp;