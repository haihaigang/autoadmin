import BaseRobotReq from "../../../base/reqs/BaseRobotReq";

/**
 * 生成时间：2017.03.20 11:22:33
 * 该文件系自动生成，手动修改可能会被替换
 * 接口：更新活动
 * 接口地址：/pintuan/update
 * 请求方式：POST
 * 接口说明：xxx
 */
class PintuanRetrieveReq extends BaseRobotReq {
    constructor(options, params, successFn, errorFn) {
        super(options, params, successFn, errorFn);

        // 配置当前接口请求的，包含url、请求类型、请求内容类型等
        // 约定url使用相对地址，都以斜杠开头
        this._defaultOptions = {
            url: '/pintuan/update',
            type: 'POST',
            contentType: 'application/json'
        };

        // 请求参数的描述信息，只定义先不用
        this._paramsDescriptor = [{
            key: 'id',
            desc: '活动ID',
            isRequired: true
        },{
            key: 'name',
            desc: '活动名称',
            isRequired: true
        }];

        this.curd = 'retrieve';
    }

    /**
     * 添加接口请求参数，适用于参数较少
     * @param id 活动编号
     * @param name 活动名称
     */
    setSimpleParams(id, name) {
        this.addParams('id', id);
        this.addParams('name', name);
    }

    /**
     * 添加接口请求参数，适用于请求参数过多，使用对象传参数
     * @param obj 请求参数对象
     * {
     * 'id': '活动编号',
     * ...
     * }
     */
    setComplexParams(obj) {
        this.setParams(obj);
    }
}

export default PintuanRetrieveReq;
