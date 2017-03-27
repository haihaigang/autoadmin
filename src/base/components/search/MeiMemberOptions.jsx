import Tools from '../../utils/Tools'

const columns = [{
    title: '会员编号',
    dataIndex: 'member_id',
    key: 'member_id'
}, {
    title: '手机号',
    dataIndex: 'mobile',
    key: 'mobile'
}, {
    title: '昵称',
    dataIndex: 'name',
    key: 'name'
}];

/**
 * 配置项
 * type 类型
 * title 显示的标题
 * isPhp 是否php的接口
 * url 接口的地址
 * responseKey 响应参数的key
 * key 响应数据的主键key
 * conditions 搜索条件
 * columns 列表数据的表头
 * isMultiple 列表数据是单选还是多选
 */
const options = {
    type: 'member',
    title: '选择会员',
    isPhp: true,
    url: '/members/index',
    responseKey: 'body.content',
    key: 'member_id',
    conditions: [
        { key: 'login_account', type: 'text', label: '手机号', placeholder: '请输入手机号' },
    ],
    columns: columns
}

export default options;
