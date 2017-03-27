# 机器人

## 生成规则说明

1. 该目录文件都是系统自动生成，修改可能被替换
2. 根据接口文档自动生成
3. 按照接口路由生成不同的目录，如果有嵌套的则生成嵌套的目录

## 生成目录结构说明

> robots 生成代码的根目录，一般放置该代码到应用的根目录
>
>> pintuan 某个模块的名称
>>
>>> reqs 当前模块下的所有接口请求，每个接口请求一个文件
>>>
>>>> PintuanCurds.js 当前模块对应的curd接口请求映射关系
>>>>
>>>> PintuanXXXReq.js 具体的一个接口请求文件，文件命名以模块+接口语义+req后缀，驼峰命名
>>>
>>> columns
>>>
>>>> PintuanColumns.js 当前模块的列表的表头
>>>
>>> conditions
>>>
>>>> PintuanConditions.js 当前模块的搜索条件
>>>
>>> forms
>>>
>>>> PintuanFormFields.js 当前模块的表单字段定义