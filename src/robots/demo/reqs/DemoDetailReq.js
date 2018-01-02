import BaseRobotReq from "../../../base/reqs/BaseRobotReq";

/**
 * 生成时间：2017.03.20 11:22:33
 * 该文件系自动生成，手动修改可能会被替换
 * 接口：获取活动详情
 * 接口地址：/pintuan/detail
 * 请求方式：GET
 * 接口说明：xxx
 */
class PintuanDetailReq extends BaseRobotReq {
    constructor(options, params, successFn, errorFn) {
        super(options, params, successFn, errorFn);

        // 配置当前接口请求的，包含url、请求类型、请求内容类型等
        // 约定url使用相对地址，都以斜杠开头
        this._defaultOptions = {
            url: '/pintuan/:id',
            type: 'GET',
            contentType: 'application/json'
        };

        // 请求参数的描述信息，只定义先不用
        this._paramsDescriptor = [];

        this.curd = 'detail';
    }

    /**
     * 添加接口请求参数，适用于参数较少
     * @param id 活动编号
     */
    setSimpleParams(id) {
        this.addParams('id', id);
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

export default PintuanDetailReq;
