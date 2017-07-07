import React from 'react'

/**
 * 容器组件基类
 */
class BaseApp extends React.Component {
    constructor(props, store, action) {
        super(props);

        this._store = store;//flux store
        this._action = action;//flux action

        // 默认容器组件都获取固定格式的state
        this.state = this.getAppState();
    }

    /**
     * 组件生命周期事件-加载完成
     * @return {[type]} [description]
     */
    componentDidMount() {
        if(this._store){
            this._store.addChangeListener(this._onChange.bind(this));
        }
    }

    /**
     * 组件生命周期时间-组件将要移除
     * @return {[type]} [description]
     */
    componentWillUnmount() {
        if(this._store){
            this._store.removeChangeListener(this._onChange.bind(this));
        }
    }

    /**
     * Event handler for 'change' events coming from the Store
     */
    _onChange() {
        this.setState(this.getAppState());
    }

    /**
     * Retrieve the current data from the Store
     * @return {[type]} [description]
     */
    getAppState() {
        if(!this._store){
            return;
        }
        
        return {
            list: {
                dataSource: this._store.getData(),
                columns: this._store.getColumns(),
                conditions: this._store.getConditions()
            },
            pagination: this._store.getPage(),
            menu: {
                data: this._store.getSubMenus()
            },
            menuFuncVisible: this._store.getMenuFuncVisible(),
            passwordVisible: this._store.getPasswordVisible(),
            sidebar: {
                data: this._store.getSubMenus(),
                current: this._store.getCurSidebar(),
                status: this._store.getSidebarStatus()
            },
            form: {
                title: this._store.getTitle(),
                visible: this._store.getFormVisible(),
                data: this._store.getFormData(),
                isSaving: this._store.getSaving(),
                fields: this._store.getFields(),
                store: this._store
            },
            column: {
                visible: this._store.getColumnVisible(),
                data: this._store.getColumns()
            },
            search: {
                conditions: this._store.getConditions()
            },
            detail: {
                visible: this._store.getDetailVisible(),
                data: this._store.getDetailData(),
                store: this._store
            }
        };
    }
}

export default BaseApp;
