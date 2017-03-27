import BaseConditions from '../../../base/conditions/BaseConditions'
import CONDITIONS_DATA from '../../../robots/pintuan/conditions/PintuanConditions'

/**
 * 拼团活动的搜索条件
 */
class PintuanConditions extends BaseConditions {
    constructor() {
        super();

        this._conditions = CONDITIONS_DATA;

        // 示例，添加一个自定义的没有在自动生成中的搜索条件信息
        // this.addCondition({
        //     key: 'exampleKey',
        //     type: 'text',
        //     label: '示例名称',
        //     placeholder: true
        // });

        // 示例，更改某个搜索条件的类型
        // this.changeCondition('exampleKey', this._types.date);
        // 更改多个表头的展现形式
        // this.changeCondition([{'key': 'exampleKey','type': this._types.date}]);

        // 示例，更新某个搜索条件的数据
        // this.setCondition('bn', {data: [], 'label': '排山倒海'});
    }
}

export default PintuanConditions;
