import TYPES_TO_RENDERS from './TypesToRenders'
import COLUMN_TYPES from './ColumnTypes'

/**
 * 列表的表头的基类，处理一些表头
 * 这里使用js文件，相关react的jsx语法可以放在独立的配置文件（TypesToRenders）
 */
class BaseColumns {
    constructor() {

        this._columns = []; //列的数据
        this._defaultOperateColumn = { //默认的操作栏
            title: '操作',
            key: 'operation',
            checked: true,
            type: 'operation'
        };
        this._typesToRenders = {}; //表头对应展现形式关系表
        this._needOperateColumn = true; //是否需要显示操作栏
        this._types = COLUMN_TYPES; //表头类型表

        // this.init();
    }

    setColumns(columns) {
        this._columns = columns;
    }

    getColumns() {
        return this._columns;
    }

    /**
     * 初始化表头数据，追加各个表头的展现形式以及默认操作栏
     * @return
     */
    init() {
        if (!this._columns || this._columns.length == 0) {
            console.error('_columns is empty');
            return;
        }

        let hasOperate = false;

        this._columns.map((item, i) => {
            if (item.key == 'operation') {
                hasOperate = true;
            }
            this.addRender(item);
        });

        if (this._needOperateColumn && !hasOperate) {
            // 如果没有操作栏则追加上默认的操作栏
            this.addRender(this._defaultOperateColumn);
            this._columns.push(this._defaultOperateColumn);
        }
    }

    /**
     * 追加每个表头的展现形式，优先使用模块自定义的，如果没有则使用默认的“表头对应展现形式关系表”
     * @param column 每个表头的信息
     */
    addRender(column) {
        let type = column.type || 'text';
        let render = this._typesToRenders[type];

        if (!render) {
            render = TYPES_TO_RENDERS[column.type || 'text'];
        }

        column.render = render;
    }

    /**
     * 更新某个表头
     * @param key 表头的key
     * @param data 修改的数据
     */
    setColumn(key, data){
        this._columns.map((item, i) => {
            if(item.key == key){
                for(var j in data){
                    item[j] = data[j];
                }
            }
        });
    }

    /**
     * 追加当前模块自定义的表头
     * @param column 表头的信息
     */
    addColumn(column) {
        this._columns.push(column);
    }

    /**
     * 追加当前模块自定义的表头，追加多个
     * @param array columns 表头s的信息
     */
    addColumns(columns) {
        this._columns.concat(columns);
    }

    /**
     * 移除某个表头
     * @param key 表头的key
     * @return
     */
    removeColumn(key) {
        this._columns = this._columns.filter((item, i) => item.key != key);
    }

    /**
     * 隐藏某个表头
     * @param key 表头的key
     * @return
     */
    hideColumn(key) {
        this._columns.map((item, i) => {
            if (item.key == key) {
                item.checked = false;
            }
        });
    }

    /**
     * 更改某个（或多个）表头的展现类型
     * @param key 表头的key
     * @param type 表头的类型
     * @return
     */
    changeColumn(key, type) {
        let hasMore = false;

        if (typeof key == 'object' && typeof key.length != 'undefined') {
            hasMore = true;
        }

        this._columns.map((item, i) => {
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

export default BaseColumns;
