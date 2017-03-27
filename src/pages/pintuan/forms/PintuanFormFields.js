import BaseFormFields from '../../../base/forms/BaseFormFields'
import FIELDS_DATA from '../../../robots/pintuan/forms/PintuanFormFields'

/**
 * 拼团的表单域
 */
class PintuanFormFields extends BaseFormFields {
    constructor() {
        super();

        this._fields = FIELDS_DATA;

        // 示例，添加一个自定义的没有在自动生成中的表单域的信息
        // this.addField({
        //     key: 'exampleKey',
        //     type: 'text',
        //     label: '示例名称',
        //     placeholder: true
        // });

        // 示例，更新某个表单域的数据
        // this.setField('bn', {data: [], 'label': '排山倒海'});
    }
}

export default PintuanFormFields;