/**
 * 主要定义嵌套在模态框中的表单的通用事件
 * @type {Object}
 */
const MeiFormMixin = {
    // antd form getFieldDecorator 扩展方法
    getField: function(key, option) {
        if (this.props && this.props.form) {
            const { getFieldDecorator } = this.props.form;
            option = option ? option : {};
            return getFieldDecorator(key, option);
        }
    },
    formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 }
    }

    // componentDidMount: function() {
    //  console.log('MeiFormMixin componentDidMount')
    //     CommonStore.addResetFormListener(this.onResetForm);
    // },
    // componentWillUnmount: function() {
    //  console.log('MeiFormMixin componentWillUnmount')
    //     CommonStore.removeResetFormListener(this.onResetForm);
    // },
    // onResetForm: function() {
    //  console.log('MeiFormMixin onResetForm')
    //     this.props.form.resetFields();
    // },
};

export default MeiFormMixin;
