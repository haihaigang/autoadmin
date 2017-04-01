import BaseRobotReq from "../../../base/reqs/BaseRobotReq";

/**
 * 生成时间：2017年04月01日 06:59:40
 * 该文件系自动生成，手动修改可能会被替换
 * SystemMenuUpdateReq
 * 接口地址：systemmenu/update
 * 请求方式：Post
 * 接口说明：
 */

class SystemMenuUpdateReq extends BaseRobotReq {
    constructor(options, params, successFn, errorFn) {
        super(options, params, successFn, errorFn);

        // 配置当前接口请求的，包含url、请求类型、请求内容类型等
        // 约定url使用相对地址，都以斜杠开头
        this._defaultOptions = {
            url: 'systemmenu/update',
            type: 'Post',
            contentType: 'application/json'
        };

        // 请求参数的描述信息，只定义先不用
        this._paramsDescriptor = [{key: 'id',
            desc: '菜单ID',
            isRequired: true
        },{key: 'menuName',
            desc: '菜单名称',
            isRequired: true
        },{key: 'menuDesc',
            desc: '菜单描述',
            isRequired: false
        },{key: 'parentId',
            desc: '上级菜单ID',
            isRequired: false
        },{key: 'orderNumber',
            desc: '排序号',
            isRequired: false
        }];
        this.curd = 'd';
    }

    /**
     * 添加接口请求参数，适用于参数较少
     * @param id 活动编号
     */
    setSimpleParams(id,menuName,menuDesc,parentId,orderNumber) {
        this.addParams('id', id);
        this.addParams('menuName', menuName);
        this.addParams('menuDesc', menuDesc);
        this.addParams('parentId', parentId);
        this.addParams('orderNumber', orderNumber);
    }

    /**
     * 添加接口请求参数，适用于请求参数过多，使用对象传参数
     * @param obj 请求参数对象
     * {
     * 'id': '活动编号',
     * }
     */
    setComplexParams(obj) {
        this.setParams(obj);
    }
}

export default SystemMenuUpdateReq;
