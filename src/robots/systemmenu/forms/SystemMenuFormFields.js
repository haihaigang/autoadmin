/**
 * 生成时间：2017年04月01日 06:59:40
 * 该文件系自动生成，手动修改可能会被替换
 * 根据创建或修改接口的请求字段生成
 * 表单数据：
 * {
 * 'key': '关键字',
 * 'type': '类型',
 * 'label': '显示名称',
 * 'placeholder': '默认占位文字',
 * 'data': '附加的数据'
 * }
 */
const SYSTEMMENU_FORM_FIELDS = [{
    key: 'id',
    type: 'id',
    label: '菜单ID',
}, {
    key: 'menuName',
    type: 'String',
    label: '菜单名称',
    placeholder: '请输入菜单名称'
}, {
    key: 'menuDesc',
    type: 'String',
    label: '菜单描述',
    placeholder: '请输入菜单描述'
}, {
    key: 'parentId',
    type: 'Object',
    label: '上级菜单ID',
    placeholder: '请输入上级菜单ID'
}, {
    key: 'orderNumber',
    type: 'Number',
    label: '排序号',
    placeholder: '请输入排序号'
}];

export default SYSTEMMENU_FORM_FIELDS;
