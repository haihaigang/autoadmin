//TODO 按需引入你的样式
//require('../scss/Pintuan.scss');
import React from 'react'
import BaseApp from '../../../base/containers/BaseApp';
import PintuanStore from '../stores/PintuanStore';
import PintuanActions from '../actions/PintuanActions';
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
 * Retrieve the current data from the TodoStore
 */
function getAppState() {
    return {
        dataSource: PintuanStore.getData(),
        columns: PintuanStore.getColumns(),
        pagination: PintuanStore.getPage(),
        menu: {
            // data: PintuanStore.getMenuData()
            data: PintuanStore.getSubMenus()
        },
        sidebar: {
            data: PintuanStore.getSubMenus(),
            current: PintuanStore.getCurSidebar(),
            status: PintuanStore.getSidebarStatus()
        },
        form: {
            visible: PintuanStore.getFormVisible(),
            data: PintuanStore.getFormData(),
            isSaving: PintuanStore.getSaving(),
        },
        column: {
            visible: PintuanStore.getColumnVisible(),
            data: PintuanStore.getColumns()
        },
        search: {
            conditions: PintuanStore.getConditions()
        }
    };
}


class PintuanApp extends BaseApp{
	constructor(props){
		super(props);

		this.state = getAppState();
	}

    componentDidMount() {
        PintuanStore.addChangeListener(this._onChange.bind(this));
        PintuanActions.getMenuList2();
        PintuanActions.search();
    }

    componentWillUnmount() {
        PintuanStore.removeChangeListener(this._onChange);
    }

    /**
     * @return {object}
     */
    render() {
        return(
            <div>
                <MeiMenu {...this.state.menu} />
                <div className="mei-container">
                    <MeiSidebar 
                        {...this.state.sidebar} 
                        onClick={PintuanActions.clickSidebar.bind(PintuanActions)}/>
                    <div className="mei-content">
                        <MeiSidebarBar 
                            {...this.state.sidebar}
                            onClick={PintuanActions.changeSidebarStatus.bind(PintuanActions)}/>
                        <MeiSearch 
                            {...this.state.search} 
                            onSearch={PintuanActions.search.bind(PintuanActions)} />
                        <MeiList
                            extra="has-search"
                            columns={this.state.columns}
                            dataSource={this.state.dataSource}
                            onColumnEdit={PintuanActions.toggleColumnDialog.bind(PintuanActions,true)}
                            onOperateClick={PintuanActions.handleOperateClick.bind(PintuanActions)}/>
                        <MeiPagination 
                            {...this.state.pagination} 
                            onChange={PintuanActions.search.bind(PintuanActions)}/>
                        <MeiAdd onClick={PintuanActions.toggleFormDialog.bind(PintuanActions, true)}/>
                        <MeiForm 
                            {...this.state.form} 
                            onSave={PintuanActions.save.bind(PintuanActions)} 
                            onCancel={PintuanActions.toggleFormDialog.bind(PintuanActions, false)}
                            onDataChange={PintuanActions.updateFormData.bind(PintuanActions)}/>
                        <MeiColumn 
                            {...this.state.column} 
                            onSave={PintuanActions.saveColumn.bind(PintuanActions)} 
                            onCancel={PintuanActions.toggleColumnDialog.bind(PintuanActions, false)} />
                    </div>
                </div>
            </div>
        );
    }

    /**
     * Event handler for 'change' events coming from the PintuanStore
     */
    _onChange() {
        this.setState(getAppState());
    }
}

export default PintuanApp;