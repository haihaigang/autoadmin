# 管理后台自动化生成项目模版

## 框架说明

react + react-router4 + flux + antd + webpack2 + es6

## 脚本说明

1. npm run dev 运行
* npm run deploy 打包代码
* npm run copy 拷贝代码
* npm run up 上传打包代码
* node generate-module.js 生成模块代码
* node generate-router.js 生成路由
* node create-module.js 创建新的模块

## 功能说明

1. 能通过接口多次生成以下基本的代码
	* 能生成基本的curd，
	* 能生成列表的表头，
	* 能生成搜索条件的数据，
	* 能生成提交的表单域
	* 能生成当前项目的各模块的目录结构
2. 能根据模块的目录结构自动生成基本的模块代码，包含基本的curd功能
3. 能指定一个目录生成基本的curd功能

## 生成内容说明

1. 每个独立接口的文件
2. 每个模块中的接口请求，包含基本的curd接口请求，并以约定的名称命名请求
3. 每个模块中列表的表头
4. 每个模块中的搜索条件
5. 每个模块中的表单

## 接口定义约定（管理后台）

1. 只使用两级路由，pintuan/search pintuan/:id

## 目录说明

>> dist 打包后的代码目录
>> src 源码目录
>>
>>> base 公用模块目录
>>>
>>> config 配置目录
>>>
>>> pages 模块目录
>>>
>>> robots 自动生成代码目录
>>
>> template 模块的模板代码
