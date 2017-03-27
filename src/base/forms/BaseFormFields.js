import FORM_TYPES from './FormTypes'

/**
 * 表单的表单域的基类
 */
class BaseFormFields {
    constructor() {

        this._fields = []; //表单域的数据
        this._types = FORM_TYPES; //表单域的类型
    }

    setFields(fields) {
        this._fields = fields;
    }

    getFields() {
        return this._fields;
    }

    /**
     * 更新某个表单字段
     * @param key 表单域的key
     * @param data 修改的数据
     */
    setField(key, data) {
        this._fields.map((item, i) => {
            if (item.key == key) {
                for (var j in data) {
                    item[j] = data[j];
                }
            }
        });
    }

    /**
     * 追加当前表单域
     * @param field 表单域的信息
     */
    addField(field) {
        this._fields.push(field);
    }

    /**
     * 追加当前表单域，追加多个
     * @param array fields 表单域s的信息
     */
    addFields(fields) {
        this._fields.concat(fields);
    }

    /**
     * 更改某表单域的类型
     * @param key 表单域的key
     * @param type 表单域的类型
     * @return
     */
    changeField(key, type) {
        let hasMore = false;

        if (typeof key == 'object' && typeof key.length != 'undefined') {
            hasMore = true;
        }

        this._fields.map((item, i) => {
            if (hasMore) {
                key.map((sitem, j) => {
                    if (item.key == sitem.key) {
                        item.type = sitem.type;
                    }
                });
            } else {
                if (item.key == key) {
                    item.type = type;
                }
            }
        });
    }
}

export default BaseFormFields;
