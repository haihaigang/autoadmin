
import BaseReq from './BaseReq'

/**
 * 基础的增删改查接口
 */
class CurdReq extends BaseReq {

    constructor(name) {
        super();

        this.key = 'id'; //列表中的主键，用于生成table中的key和查找详情、删除的参数名
        this.name = name;
        this.timeout = 0;

        this._createReq = undefined;
        this._updateReq = undefined;
        this._retrieveReq = undefined;
        this._deleteReq = undefined;
        this._detailReq = undefined;
    }

    /**
     * 查询列表
     */
    search(condition, successFn, errorFn) {
        var req = new this._retrieveReq();
        // req.setSimpleParams('haigang@meigo.com', '123456', 9090);
        req.setComplexParams(condition);
        req.setSuccessFn(successFn);
        req.setErrorFn(errorFn);

        req.send();
    }

    /**
     * 更新
     */
    save(data, successFn, errorFn) {

        var req = new this._createReq();
        if (data && data.id) {
            req = new this._updateReq();
        }
        req.setComplexParams(data);
        req.setSuccessFn(successFn);
        req.setErrorFn(errorFn);

        req.send();
    }

    /**
     * 获取详情
     */
    getDetail(id, successFn, errorFn) {
        let data = {};
        data[this.key] = id;

        var req = new this._detailReq();
        req.setComplexParams(data);
        req.setSuccessFn(successFn);
        req.setErrorFn(errorFn);

        req.send();
    }

    /**
     * 删除
     */
    remove(id, successFn, errorFn) {
        let data = {};
        data[this.key] = id;

        var req = new this._deleteReq();
        req.setComplexParams(data);
        req.setSuccessFn(successFn);
        req.setErrorFn(errorFn);
    }
}

export default CurdReq;
