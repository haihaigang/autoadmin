import BaseComponent from './BaseComponent';

/**
 * 模态框组件的基类，包含一些模态框的处理方法
 */
class BaseDialogComponent extends BaseComponent {
    constructor(props) {
        super(props);
    }

    /**
     * 点击取消，关闭模态框
     * @return
     */
    handleCancel() {
        this.props.onCancel();
    }
}

export default BaseDialogComponent;
