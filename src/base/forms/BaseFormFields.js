import FORM_TYPES from './FormTypes'

/**
 * 表单的表单域的基类
 *
 * 字段如下:
 * {
 * 'key': '关键字',
 * 'type': '类型',
 * 'label': '显示名称',
 * 'placeholder': '默认占位文字',
 * 'data': '附加的数据',
 * 'disabled': '是否隐藏',
 * 'readonly': '是否只读',
 * }
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

    /**
     * 隐藏某个表单域
     * @param key 表单域的key
     * @return
     */
    hideField(key) {
        this._fields.map((item, i) => {
            if (item.key == key) {
                item.disabled = true;
            }
        });
    }

    /**
     * 设置某个表单域为只读的
     * @param key 表单域的key
     * @return
     */
    readonlyField(key) {
        this._fields.map((item, i) => {
            if (item.key == key) {
                item.readonly = true;
            }
        });
    }
}

export default BaseFormFields;
