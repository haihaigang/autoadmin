import BaseStore from '../../../base/stores/BaseStore';
import DemoDispatcher from '../dispatcher/DemoDispatcher';
import DemoConstants from '../constants/DemoConstants';
import DemoColumns from '../columns/DemoColumns';
import DemoConditions from '../conditions/DemoConditions';
import DemoFormFields from '../forms/DemoFormFields';

/*
 * Store
 */
class MainStore extends BaseStore {
    constructor() {
        super(DemoDispatcher, DemoConstants);

        this.setColumns(new DemoColumns().getColumns());

        this.setConditions(new DemoConditions().getConditions());

        this.setFields(new DemoFormFields().getFields());

        this.setTitle('');

        // 添加自定义的事件
        // this.addAction(this._constant.GET_LOADING, (action) => {
        // });

        // 初始化dispatcher注册的事件，该方法需要在所有自定义事件的最后
        this.initDispatcherRegister();
    }
};

export default new MainStore();
