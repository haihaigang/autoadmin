import {
    Message
}
from 'antd'
import Storage from '../utils/Storage'
import OPERATE_TYPE from '../constants/OperateTypeConstants'

/**
 * action的基类，主要处理curd的一些操作
 * 
 */
class BaseActions {

    /**
     * 构造函数
     * @param  {[type]} req 接口请求
     * @param  {[type]} dispatcher 分发器
     * @param  {[type]} constant 常量
     */
    constructor(req, dispatcher, constant) {
        this._req = req || {}; //接口
        this._dispatcher = dispatcher; //flux分发器
        this._constant = constant; //flux常量
        this.lastCondition = {}; //上次的搜索条件
        this.tick;
        this.tickNum = 0;
    }

    /**
     * 发布消息，调用flux的dispatcher
     * @param obj 包含type 以及一些附加data信息的对象
     */
    dispatch(obj) {
        if (!this._dispatcher) {
            console.error('BaseActions.dispatch dispatcher is null');
            return;
        }
        this._dispatcher.dispatch(obj);
    }

    emitQuickLogin() {
        this.dispatch({
            actionType: this._constant.QUICK_LOGIN,
        });
    }

    /**
     * 重置数据
     */
    resetData() {
        this.dispatch({
            actionType: this._constant.RESET_DATA,
        });
    }

    /**
     * 点击二级菜单，这里约定点击都是直接搜索一次
     * @param e menu的参数
     */
    clickSidebar(e) {
        // this.dispatch({
        //     actionType: this._constant.CLICK_SIDEBAR,
        //     key: e.key
        // });
        console.log('BaseActions clickSidebar');
        //this.search(e.key);
    }

    /**
     * 切换表单弹出框
     * @param visible 是否显示
     */
    toggleFormDialog(visible) {
        this.onlyToggleDialog(this._constant.TOGGLE_FORM_DIALOG, visible);
    }

    /**
     * 切换详情弹出框
     * @param visible 是否显示
     */
    toggleDetailDialog(visible) {
        this.onlyToggleDialog(this._constant.TOGGLE_DETAIL_DIALOG, visible);
    }

    /**
     * 切换表头弹出框
     * @param visible 是否显示
     */
    toggleColumnDialog(visible) {
        this.onlyToggleDialog(this._constant.TOGGLE_COLUMN_DIALOG, visible);
    }

    /**
     * 保存列表的表头数据，包括排序、是否显示等
     * @param data 表头的数据
     */
    saveColumn(data) {
        this.dispatch({
            actionType: this._constant.SAVE_COLUMN,
            data: data
        });
    }

    /**
     * 切换高级搜索框
     * @param visible 是否显示
     */
    toggleAdvanceSearchDialog(visible) {
        this.onlyToggleDialog(this._constant.TOGGLE_ADVANCE_SEARCH_DIALOG, visible);
    }

    /**
     * 仅切换某个模态框是否显示
     * @param type 类型
     * @param visible 是否显示
     */
    onlyToggleDialog(type, visible) {
        visible = typeof visible == 'undefined' ? true : visible;
        this.dispatch({
            actionType: type,
            visible: visible
        });
    }

    /**
     * 获取二级菜单数据，从本地存储中获取
     */
    getMenuList2() {
        this.tickNum++;
        if (this.tick) {
            clearTimeout(this.tick);
        }
        if (this.tickNum > 20) {
            return;
        }

        let mainMenus = Storage.get('MainMenus1');
        let pathname = location.pathname;
        let res = {};
        if (!mainMenus) {
            // this.tick = setTimeout(this.getMenuList2.bind(this), 200);
            return;
        }

        // this.getLastMenu(mainMenus, pathname, res, 0);

        this.dispatch({
            actionType: this._constant.GET_MENU_LIST2,
            data: mainMenus,
            level: res
        });
    }

    getLastMenu(data, key, result, level) {
        level++;
        // console.log('start===> ' + level)
        for (var i = 0; i < data.length; i++) {
            if (result.hasFind) {
                break;
            }
            // console.log('this is i ' + level + ' ' + i)
            result[level] = i;
            let url = data[i].action.replace('jump:', this._req.path);
            if (url.toLowerCase() == key.toLowerCase() && (!data[i].subMenus || data[i].subMenus.length == 0)) {
                result.hasFind = true;
                result.leafMenu = url.toLowerCase();
                result.leafId = data[i].id.toString();
                result.level = level;
                console.log('result ' + data[i].code + ' ' + JSON.stringify(result))
                break;
            }
            if (data[i].subMenus && data[i].subMenus.length > 0) {
                this.getLastMenu(data[i].subMenus, key, result, level);
            }
        }
    }

    getPathKey1(path) {
        if (!path) {
            return '';
        }

        let pathArr = path.split('/');
        if (pathArr.length < 3) {
            return '';
        }
        return pathArr[2];
    }

    /**
     * 获取路径中的key，
     */
    getPathKey(path) {
        if (!path) {
            return '';
        }

        let pathArr = path.split('/');
        if (pathArr.length < 3) {
            return '';
        }
        let keyPath = pathArr[2];
        if (keyPath.indexOf('-') != -1) {
            return keyPath.split('-')[0];
        }
        return keyPath;
    }

    /**
     * 更新表单数据中的某个key，约定key=-1的时候可以更新一个object
     * @param key  数据的key
     * @param data 对应的值
     */
    updateFormData(key, data) {
        console.log('updateFormData ' + key)
        console.log(data);
        if(key == '-1' && typeof data != 'object'){
            console.log('updateFormData error data is not object');
            return;
        }
        this.dispatch({
            actionType: this._constant.UPDATE_FORMDATA,
            key: key,
            data: data,
        });
    }

    /**
     * 更改表单数据的数据源
     * @param method 使用方式，1使用、2不使用、3清除
     */
    changeFormData(method) {
        console.log('changeFormData ' + method)
        this.dispatch({
            actionType: this._constant.CHANGE_FORMDATA,
            method: method
        });
    }

    /**
     * 处理行列表中操作栏的点击事件
     * @param data 传递给对应事件的行记录数据，okey一般为当前记录的主键
     * @param type 操作类型，根据不同类型处理不同事件
     */
    handleOperateClick(data, type) {
        console.log('handleOperateClick ' + type);

        switch (type) {
            case OPERATE_TYPE.EDIT:
                {
                    this.getDetail(data.okey);
                    break;
                }
            case OPERATE_TYPE.REMOVE:
                {
                    this.remove(data.okey);
                    break;
                }
        }
    }

    /**
     * 切换图片预览框
     * @param img 预览的图片地址
     * @param visible 是否显示预览框
     */
    togglePreviewDialog(img, visible) {
        this.dispatch({
            actionType: this._constant.TOGGLE_PREVIEW,
            preview: {
                img: img,
                visible: visible
            },
        });
    }

    /**
     * 搜索:
     * 约定如下
     * 如果传递number类型则是点击分页，
     * 如果传递string则是点击一级菜单或二级菜单
     * 如果传递object就是搜索过来的
     * 如果其他就是点击一级菜单或其他过来的
     */
    search(condition) {
        if (typeof this._req.search != 'function') {
            return;
        }

        console.log('BaseActions search')
        let data = {};
        let isResttable = false; //搜索结果是否可重置的标志
        let canResetable = false; //是否可以重置列表数据的标志

        if (typeof condition == 'number') {
            data.page = condition;
        } else if (typeof condition == 'string') {
            this.lastCondition = undefined;
            isResttable = true;

            data = this.beforeSearch(condition);
            if (data) {
                data.page = 1;
            }
        } else if (typeof condition == 'object') {
            data = condition || {};
            data.page = 1;
        } else {
            canResetable = true
            data = {};
        }

        data = this.beforeSearchWith(data);

        if (this.lastCondition) {
            for (var i in this.lastCondition) {
                // if (typeof data[i] == 'undefined') {
                if (!(i in data)) {
                    data[i] = this.lastCondition[i];
                }
            }
        }

        this.lastCondition = data;

        if (canResetable) {
            //重置数据以防止快速切换时有遗留数据影响界面
            this.dispatch({
                actionType: this._constant.RESET_DATA,
            });
        }

        this._req.search(data, (response) => {
            response.isResttable = isResttable;
            this.afterSearch(response);
        });
    }

    /**
     * 搜索之前，处理一些搜索条件的数据等
     * @param condition 搜索接口的条件
     */
    beforeSearch(condition) {
        return {};
    }

    /**
     * 搜索之前，追加一些搜索的条件等
     * @param data 搜索接口的条件
     */
    beforeSearchWith(data) {
        return data;
    }

    /**
     * 搜索结果之后
     * @param response 搜索接口的响应
     */
    afterSearch(response) {
        this.dispatch({
            actionType: this._constant.SEARCH,
            data: response.body.content,
            page: {
                current: isNaN(response.body.number) ? undefined : parseInt(response.body.number),
                pageSize: isNaN(response.body.size) ? undefined : parseInt(response.body.size),
                total: isNaN(response.body.totalElements) ? undefined : parseInt(response.body.totalElements)
            },
            isResttable: response.isResttable,
        });
    }

    /**
     * 保存表单数据
     * @param data 表单数据
     */
    save(data) {
        if (typeof this._req.save != 'function') {
            return;
        }

        console.log('BaseActions save')
        console.log(data)
        data = this.beforeSave(data);

        this.dispatch({
            actionType: this._constant.CHANGE_SAVING,
            data: true,
        });

        this._req.save(data, (response) => {
            Message.success('保存成功');
            this.afterSave();
        }, () => {
            //若有错重置保存弹出框状态
            this.dispatch({
                actionType: this._constant.CHANGE_SAVING,
                data: false,
            });
        });
    }

    /**
     * 保存数据之前，用于表单数据提交之前做一些处理
     * @return data 表单数据
     */
    beforeSave(data) {
        return data;
    }

    /**
     * 保存数据之后，用于处理保存成功之后的逻辑
     * @param response 提交保存之后的接口响应
     */
    afterSave(response) {
        // this.toggleFormDialog(false);

        this.dispatch({
            actionType: this._constant.SAVE,
        });
    }

    /**
     * 获取详情
     * @param id 编号
     */
    getDetail(id) {
        if (typeof this._req.getDetail != 'function') {
            return;
        }

        console.log('BaseActions getDetail')

        const that = this;
        this._req.getDetail(id, (response) => {
            that.afterGetDetail(response);
        }, (textStatus, data) => {
            Message.warning(data.message || '服务器异常');
        })
    }

    /**
     * 获取详情之后，一般默认打开表单
     * @param response 详情接口的响应
     */
    afterGetDetail(response) {
        let data = response.body;
        this.dispatch({
            actionType: this._constant.TOGGLE_FORM_DIALOG,
            visible: true,
            data: data,
        });
    }

    /**
     * 删除
     * @param id 编号
     */
    remove(id) {
        if (typeof this._req.remove != 'function') {
            return;
        }
        console.log('BaseActions remove ' + id)

        this._req.remove(id, (response) => {
            Message.success('删除成功');
            this.afterRemove(id, response);
        }, (textStatus, data) => {
            Message.warning(data.message || '服务器异常');
        });
    }

    /**
     * 删除之后
     * @param id 编号
     * @param response 接口返回的响应
     */
    afterRemove(id, response) {
        let data = response.body;
        this.dispatch({
            actionType: this._constant.REMOVE,
            key: id,
        });
    }

    /**
     * 更改侧边栏的展示状态
     * @return 
     */
    changeSidebarStatus(status) {
        this.dispatch({
            actionType: this._constant.CHANGE_SIDEBAR_STATUS,
            status: status,
        });
    }

    /**
     * 更改变更form数据源提示框是否显示
     * @param visible 显示与否
     */
    changeChangeFormDataVisible(visible) {
        visible = typeof visible == 'undefined' ? false : visible;
        this.dispatch({
            actionType: this._constant.CHANGE_CHANGE_FORMDATA_VISIBLE,
            visible: visible,
        });
    }

}

export default BaseActions;
