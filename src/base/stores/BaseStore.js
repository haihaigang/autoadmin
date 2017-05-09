import { EventEmitter } from 'events';
import assign from 'object-assign';
import Storage from '../utils/Storage';

const CHANGE_EVENT = 'change'; //自定义的store数据改变事件
const RESET_CONDITION_EVENT = 'reset_condition_event'; //自定义的重置搜索条件的事件
const RESET_FORM_EVENT = 'reset_form_event'; //自定义的重置编辑表单的事件

/*
 * Store
 */
class BaseStore extends EventEmitter {

    /**
     * 构造函数
     * @param dispatcher flux分发器
     * @param constant flux常量
     */
    constructor(dispatcher, constant) {
        super();

        this._dispatcher = dispatcher; //flux分发器
        this._constant = constant; //flux常量
        this._actions = {}; //需要注册到dispatcher上的所有方法，key、value形式

        this._menuData = []; //菜单的数据
        this._subMenus = []; //侧边栏菜单
        this._dataSource = []; //数据源
        this._page = 0; //当前页码
        this._curSidebar = undefined; //当前的菜单
        this._isShowDialog = false;
        this._isFormVisible = false; //是否显示form编辑框
        this._isAdvanceSearchVisible = false; //是否显示高级搜索框
        this._isColumnVisible = false; //是否显示列的编辑框
        this._formData = {}; //编辑时的数据源
        this._lastFormData = {}; //上次编辑时的数据源
        this._formData1 = {}; //编辑时的数据源1
        this._formData2 = {}; //编辑时的数据源2
        this._columns = []; //列的数据源
        this._isLoading = false; //是否在加载
        this._isSaving = false; //是否正在保存中，用于设置保存弹出框的状态
        this._isQucikLoginVisible = false; //是否显示快速登录框，一般会在保存数据时用户过期弹出
        this._preview = { //图片预览框的数据
            img: undefined,
            visible: false,
        };
        this._sidebarStatus = 1; //侧边栏的展示状态，默认1展开，0收起
        this._isChangeFormDataVisible = false; //是否显示更改form数据源提示框
        this._conditions = []; //搜索条件的数据源
        this._fields = []; //表单的数据源
        this._title = undefined; //模块的名称
        this._menuFuncVisible = false; //菜单快速功能条是否显示
        this._passwordVisible = false; //修改密码框是否显示
        this._isDetailVisible = false; //详情弹框是否显示
        this._detailData = undefined; //展示详情的数据

        this.setMaxListeners(30); //设置最大事件监听数

        this.initActions(); // 初始化通用的action
    }

    getDispatcher() {
        return this._dispatcher;
    }

    setDispatcher(dispatcher) {
        this._dispatcher = dispatcher;
    }

    getConstant() {
        return this._constant;
    }

    setConstant(constant) {
        this._constant = constant;
    }

    getActions() {
        return this._actions;
    }

    setActions(actions) {
        this._actions = actions;
    }

    getMenuData() {
        return this._menuData;
    }

    setMenuData(data) {
        this._menuData = data;
    }

    getSubMenus() {
        return this._subMenus;
    }

    setSubMenus(menus) {
        this._subMenus = menus;
    }

    getData() {
        return this._dataSource;
    }

    setData(data) {
        this._dataSource = data;
    }

    getPage() {
        return this._page;
    }

    setPage(page) {
        this._page = page;
    }

    setCurSidebar(target) {
        this._curSidebar = target;
    }

    getCurSidebar() {
        return this._curSidebar;
    }

    getFormVisible() {
        return this._isFormVisible;
    }

    setFormVisible(visible) {
        this._isFormVisible = visible;
    }

    getFormData() {
        return this._formData;
    }

    setFormData(data) {
        this._formData = data;
    }

    getLastFormData() {
        return this._lastFormData;
    }

    setLastFormData(data) {
        this._lastFormData = data;
    }

    getFormData1() {
        return this._formData1;
    }

    setFormData1(data) {
        this._formData1 = data;
    }

    getFormData2() {
        return this._formData2;
    }

    setFormData2(data) {
        this._formData2 = data;
    }

    getColumnVisible() {
        return this._isColumnVisible;
    }

    setColumnVisible(visible) {
        this._isColumnVisible = visible;
    }

    getAdvanceSearchVisible() {
        return this._isAdvanceSearchVisible;
    }

    setAdvanceSearchVisible(visible) {
        this._isAdvanceSearchVisible = visible;
    }

    getColumns() {
        return this._columns;
    }

    setColumns(data) {
        this._columns = data;
    }

    resetData() {
        this._dataSource = [];
        this._page = {};
    }

    setSaving(value) {
        this._isSaving = value;
    }

    getSaving() {
        return this._isSaving;
    }

    setLoading(value) {
        this._isLoading = value;
    }

    getLoading() {
        return this._isLoading;
    }

    setQuickLoginVisible(visible) {
        this._isQucikLoginVisible = visible;
    }

    getQuickLoginVisible() {
        return this._isQucikLoginVisible;
    }

    setPreview(data) {
        if (!data.img) {
            //若没有图片则使用上次的图片地址
            data.img = this._preview.img;
        }
        this._preview = data;
    }

    getPreview() {
        return this._preview;
    }

    setSidebarStatus(status) {
        Storage.set(this._constant.CHANGE_SIDEBAR_STATUS, status);
        this._sidebarStatus = status;
    }

    getSidebarStatus() {
        let d = Storage.get(this._constant.CHANGE_SIDEBAR_STATUS);
        return typeof d == 'undefined' ? this._sidebarStatus : d;
    }

    getChangeFormDataVisible() {
        return this._isChangeFormDataVisible;
    }

    setChangeFormDataVisible(visible) {
        this._isChangeFormDataVisible = visible;
    }

    getConditions() {
        return this._conditions;
    }

    setConditions(conditions) {
        this._conditions = conditions;
    }

    getFields() {
        return this._fields;
    }

    setFields(fields) {
        this._fields = fields;
    }

    getTitle() {
        return this._title;
    }

    setTitle(title) {
        this._title = title;
    }

    getMenuFuncVisible() {
        return this._menuFuncVisible;
    }

    setMenuFuncVisible(visible) {
        this._menuFuncVisible = visible;
    }

    getPasswordVisible() {
        return this._passwordVisible;
    }

    setPasswordVisible(visible) {
        this._passwordVisible = visible;
    }

    setDetailVisible(visible) {
        this._isDetailVisible = visible;
    }

    getDetailVisible() {
        return this._isDetailVisible;
    }

    setDetailData(data){
        this._detailData = data;
    }

    getDetailData(){
        return this._detailData;
    }

    /**
     * 触发change
     * @return {[type]} [description]
     */
    emitChange() {
        this.emit(CHANGE_EVENT);
    }

    /**
     * @param {function} callback
     */
    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    }

    /**
     * @param {function} callback
     */
    removeChangeListener(callback) {
        // this.removeListener(CHANGE_EVENT, callback);
        this.removeAllListeners(CHANGE_EVENT);
    }

    emitResetCondition() {
        this.emit(RESET_CONDITION_EVENT);
    }

    /**
     * 绑定重置搜索条件的事件
     * @param {function} callback
     */
    addResetConditionListener(callback) {
        this.on(RESET_CONDITION_EVENT, callback);
    }

    /**
     * 解除重置搜索条件的事件
     * @param {function} callback
     */
    removeResetConditionListener(callback) {
        this.removeListener(RESET_CONDITION_EVENT, callback);
    }

    emitResetForm() {
        // console.log('emitResetForm')
        this.emit(RESET_FORM_EVENT);
    }

    /**
     * 绑定重置编辑表单的事件
     * @param {function} callback
     */
    addResetFormListener(callback) {
        this.on(RESET_FORM_EVENT, callback);
    }

    /**
     * 解除编辑表单的事件
     * @param {function} callback
     */
    removeResetFormListener(callback) {
        this.removeListener(RESET_FORM_EVENT, callback);
    }

    /**
     * 添加一个action
     * @param key 常量
     * @param action 回调事件或处理方法
     */
    addAction(key, action) {
        let acts = this._actions[key];
        if (!acts) {
            acts = [];
        }
        acts.push(action);

        this._actions[key] = acts;
    }

    /**
     * 初始化通用的action
     */
    initActions() {
        if (!this._constant) {
            return;
        }

        this.addAction(this._constant.TOGGLE_QUICK_LOGIN_DIALOG, (action) => {
            this.setQuickLoginVisible(false);
        });
        this.addAction(this._constant.GET_MENU_LIST2, (action) => {
            this.setSubMenus(action.data);
            this.setCurSidebar(action.level);
        });
        this.addAction(this._constant.GET_LOADING, (action) => {
            this.setLoading(action.visible);
        });
        this.addAction(this._constant.SEARCH, (action) => {
            this.setData(action.data);
            this.setPage(action.page);

            //搜索后清空表单的状态和数据（保存按钮状态，表单数据，重置表单，高级搜索）
            this.setSaving(false);
            this.emitResetForm();
            this.setFormData({});
            this.setFormVisible(false);
            this.setAdvanceSearchVisible(false);
            if (action.isResttable) {
                this.emitResetCondition();
            }
        });
        this.addAction(this._constant.CLICK_SIDEBAR, (action) => {
            this.setCurSidebar(action.key);
            this.emitResetCondition();
        });
        this.addAction(this._constant.TOGGLE_FORM_DIALOG, (action) => {
            this.setFormVisible(action.visible);
            if (!action.visible) {
                //关闭表单时清空数据
                this.setFormData({});
            } else {
                this.setFormData(action.data || {});
            }
        });
        this.addAction(this._constant.TOGGLE_CHANGE_PASSWORD_DIALOG, (action) => {
            this.setPasswordVisible(action.visible);
        });
        this.addAction(this._constant.TOGGLE_MENU_FUNC_DIALOG, (action) => {
            this.setMenuFuncVisible(!this._menuFuncVisible);
        });
        this.addAction(this._constant.TOGGLE_COLUMN_DIALOG, (action) => {
            this.setColumnVisible(action.visible);
        });
        this.addAction(this._constant.TOGGLE_ADVANCE_SEARCH_DIALOG, (action) => {
            this.setAdvanceSearchVisible(action.visible);
        });
        this.addAction(this._constant.SAVE, (action) => {
            this.setFormVisible(false);
            this.setSaving(false);
        });
        this.addAction(this._constant.REMOVE, (action) => {
            console.log('base store remove')
            let data = this.getData();
            data = data.filter(function(item, i) {
                return item.id != action.key;
            });
            this.setData(data);
        });
        this.addAction(this._constant.SAVE_COLUMN, (action) => {
            this.setColumnVisible(false);
            this.setColumns(action.data);
        });
        this.addAction(this._constant.RESET_DATA, (action) => {
            this.resetData();
        });
        this.addAction(this._constant.CHANGE_SAVING, (action) => {
            this.setSaving(action.data);
        });
        this.addAction(this._constant.UPDATE_FORMDATA, (action) => {
            let formData = this.getFormData();
            let key = action.key;
            if (key == '-1') {
                formData = assign(formData, action.data);
            } else {
                formData[key] = action.data;
            }
            this.setFormData(formData);
        });
        this.addAction(this._constant.CHANGE_FORMDATA, (action) => {
            let method = action.method; //使用方式，1使用、2不使用、3清除
            if (method == 1) {
                this.setFormData(this.getLastFormData());
            } else if (method == 2) {

            } else if (method == 3) {
                this.setLastFormData({});
            }
            this.setChangeFormDataVisible(false);
        });
        this.addAction(this._constant.TOGGLE_PREVIEW, (action) => {
            this.setPreview(action.preview);
        });
        this.addAction(this._constant.CHANGE_SIDEBAR_STATUS, (action) => {
            this.setSidebarStatus(action.status);
        });
        this.addAction(this._constant.CHANGE_CHANGE_FORMDATA_VISIBLE, (action) => {
            this.setChangeFormDataVisible(action.visible);
        });
        this.addAction(this._constant.TOGGLE_DETAIL_DIALOG, (action) => {
            this.setDetailVisible(action.visible);
            this.setDetailData(action.data);
        });
    }

    /**
     * 初始化dispatcher注册的事件
     * @return {[type]} [description]
     */
    initDispatcherRegister() {
        if (!this._dispatcher) {
            console.error('BaseStore.initDispatcherRegister dispatcher is null')
            return;
        }
        this._dispatcher.register((action) => {
            let type = action.actionType;
            let funcArr = this._actions[type];
            if (!funcArr) {
                // return;
            }
            if (funcArr instanceof Array) {
                funcArr.forEach((func) => {
                    func(action);
                })
            }
            // func(action);
            this.emitChange();
        });
    }
}


export default BaseStore;
