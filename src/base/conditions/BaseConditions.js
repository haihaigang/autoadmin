import CONDITION_TYPES from './ConditionTypes'

/**
 * 搜索条件的基类
 */
class BaseConditions {
    constructor() {

        this._conditions = []; //搜索条件的数据
        this._types = CONDITION_TYPES; //搜索条件的类型表
    }

    setConditions(conditions) {
        this._conditions = conditions;
    }

    getConditions() {
        return this._conditions;
    }

    /**
     * 更新某个搜索条件
     * @param key 搜索条件的key
     * @param data 修改的数据
     */
    setCondition(key, data){
    	this._conditions.map((item, i) => {
    		if(item.key == key){
    			for(var j in data){
    				item[j] = data[j];
    			}
    		}
    	});
    }

    /**
     * 追加当前模块自定义的表头
     * @param condition 搜索条件的信息
     */
    addCondition(condition) {
        this._conditions.push(column);
    }

    /**
     * 追加当前模块自定义的表头，追加多个
     * @param array conditions 搜索条件s的信息
     */
    addConditions(conditions) {
        this._conditions.concat(conditions);
    }

    /**
     * 更改某搜索条件的类型
     * @param key 搜索条件的key
     * @param type 搜索条件的类型
     * @return
     */
    changeCondition(key, type){
    	let hasMore = false;

        if (typeof key == 'object' && typeof key.length != 'undefined') {
            hasMore = true;
        }

        this._conditions.map((item, i) => {
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

export default BaseConditions;
