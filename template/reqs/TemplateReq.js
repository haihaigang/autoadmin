import CurdReq from '../../../base/reqs/CurdReq'
import { CreateReq, UpdateReq, RetrieveReq, DeleteReq, DetailReq } from '../../../robots/[MODULE]/reqs/[MODULE]Curds';

/**
 * 接口
 * 1.定义基本的curd接口，通过约定的命名
 * this._createReq = CreateReq;
 * this._updateReq = UpdateReq;
 * this._retrieveReq = RetrieveReq;
 * this._deleteReq = DeleteReq;
 * this._detailReq = DetailReq;
 *
 * 2.如果有其它需要自定义的方法可以独立实现
 * \/**
 * * 自定义查询，保留该方式以便能扩展一些自定义的查询
 * * @param data 自定义参数
 * * @param successFn 成功回调
 * * @param errorFn 失败回调
 * *\/
 * custom(data, successFn, errorFn) {
 * 	super.send({
 * 		url: this._host + '/custom/test',
 * 		data: data,
 * 		type: 'GET',
 * 	}, successFn, errorFn);
 * }
 */
class Req extends CurdReq {

    constructor() {
        super();

        this._createReq = CreateReq;
        this._updateReq = UpdateReq;
        this._retrieveReq = RetrieveReq;
        this._deleteReq = DeleteReq;
        this._detailReq = DetailReq;
    }

    // TODO 自定义方法
}

export default new Req();

