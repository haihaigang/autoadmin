//TODO 按需引入你的样式
//require('../scss/[MODULE].scss');
import React from 'react'
import BaseApp from '../../../base/containers/BaseApp';
import [MODULE]Store from '../stores/[MODULE]Store';
import [MODULE]Actions from '../actions/[MODULE]Actions';
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
 * Retrieve the current data from the [MODULE]Store
 */
function getAppState() {
    return {
        dataSource: [MODULE]Store.getData(),
        columns: [MODULE]Store.getColumns(),
        pagination: [MODULE]Store.getPage(),
        sidebar: {
            data: [MODULE]Store.getSubMenus(),
            current: [MODULE]Store.getCurSidebar(),
            status: [MODULE]Store.getSidebarStatus()
        },
        form: {
            visible: [MODULE]Store.getFormVisible(),
            data: [MODULE]Store.getFormData(),
            isSaving: [MODULE]Store.getSaving(),
        },
        column: {
            visible: [MODULE]Store.getColumnVisible(),
            data: [MODULE]Store.getColumns()
        },
        search: {
        }
    };
}


class [MODULE]App extends BaseApp{
    constructor(props){
        super(props);

        this.state = getAppState();
    }

    componentDidMount() {
        [MODULE]Store.addChangeListener(this._onChange.bind(this));
        [MODULE]Actions.getMenuList2();
        [MODULE]Actions.search();
    }

    componentWillUnmount() {
        [MODULE]Store.removeChangeListener(this._onChange);
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
                        onClick={[MODULE]Actions.clickSidebar.bind([MODULE]Actions)}/>
                    <div className="mei-content">
                        <MeiSidebarBar 
                            {...this.state.sidebar}
                            onClick={[MODULE]Actions.changeSidebarStatus.bind([MODULE]Actions)}/>
                        <MeiSearch 
                            {...this.state.search} 
                            onSearch={[MODULE]Actions.search.bind([MODULE]Actions)} />
                        <MeiList
                            extra="has-search"
                            columns={this.state.columns}
                            dataSource={this.state.dataSource}
                            onColumnEdit={[MODULE]Actions.toggleColumnDialog.bind([MODULE]Actions,true)}
                            onOperateClick={[MODULE]Actions.handleOperateClick.bind([MODULE]Actions)}/>
                        <MeiPagination 
                            {...this.state.pagination} 
                            onChange={[MODULE]Actions.search.bind([MODULE]Actions)}/>
                        <MeiAdd onClick={[MODULE]Actions.toggleFormDialog.bind([MODULE]Actions, true)}/>
                        <MeiForm 
                            {...this.state.form} 
                            onSave={[MODULE]Actions.save.bind([MODULE]Actions)} 
                            onCancel={[MODULE]Actions.toggleFormDialog.bind([MODULE]Actions, false)}
                            onDataChange={[MODULE]Actions.updateFormData.bind([MODULE]Actions)}/>
                        <MeiColumn 
                            {...this.state.column} 
                            onSave={[MODULE]Actions.saveColumn.bind([MODULE]Actions)} 
                            onCancel={[MODULE]Actions.toggleColumnDialog.bind([MODULE]Actions, false)} />
                    </div>
                </div>
            </div>
        );
    }

    /**
     * Event handler for 'change' events coming from the [MODULE]Store
     */
    _onChange() {
        this.setState(getAppState());
    }
}

export default [MODULE]App;