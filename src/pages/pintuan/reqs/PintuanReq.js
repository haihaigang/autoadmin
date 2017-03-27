import CurdReq from '../../../base/reqs/CurdReq'
import { CreateReq, UpdateReq, RetrieveReq, DeleteReq, DetailReq } from '../../../robots/pintuan/reqs/PintuanCurds';

/**
 * 接口
 * 
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

    /**
     * 自定义查询，保留该方式以便能扩展一些自定义的查询
     * @param data 自定义参数
     * @param successFn 成功回调
     * @param errorFn   失败回调
     * @return
     */
    custom(data, successFn, errorFn) {
        super.send({
            url: this._host + '/custom/test',
            data: data,
            type: 'GET',
        }, successFn, errorFn);
    }
}

export default new Req();
