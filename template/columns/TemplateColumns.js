import { BaseColumns } from '../../../base/';
import COLUMNS_DATA from '../../../robots/[MODULEPATH]/columns/[MODULE]Columns';
import TYPES_TO_RENDERS from './[MODULEPATH]TypesToRenders';

/**
 * 列表的表头
 * 
 * // 示例，添加一个自定义的没有在自动生成中的表头信息
 * // this.addColumn({
 * //     title: '示例名称',
 * //     dataIndex: 'exampleKey',
 * //     key: 'exampleKey',
 * //     checked: true,
 * //     type: 'text'
 * // });
 * 
 * // 示例，是否需要显示操作栏，默认true
 * // this._needOperateColumn = false;
 * 
 * // 示例，更改某个表头的展现形式
 * // this.changeColumn('exampleKey', this._types.date);
 * // 更改多个表头的展现形式
 * // this.changeColumn([{'key': 'exampleKey','type': this._types.date}])
 * 
 * // 示例，更新某个表头的数据
 * // this.setColumn('exampleKey', {title: '水晶桔子'});
 *
 * // 示例，隐藏某个表头
 * // this.hideColumn('operation');
 */
class [MODULE]Columns extends BaseColumns {
    constructor() {
        super();

        this._columns = COLUMNS_DATA; //绑定自动生成的表头数据

        // 添加自定义的表头对应展现形式关系表
        this._typesToRenders = TYPES_TO_RENDERS;

        // TODO自定义

        // 这里init要在最后，以确保相应的数据已初始化
        this.init();
    }

    /**
     * 初始化，预留扩展
     * 这里可以根据当前模块需要追加（或修改）一些自定义的表头和操作栏
     * @return
     */
    init() {
        super.init();

        // TODO 自定义处理一些数据

    }

}

export default [MODULE]Columns;
