import React from 'react'

/**
 * 配置项
 * type 类型
 * isPhp 是否php的接口
 * url 接口的地址
 * responseKey 响应参数的key
 * key 响应数据的主键key
 * addParams 追加搜索参数，根据传入的value拼接上不同的请求参数
 * processResults 处理结果数据，转换成select需要的数据
 * beforeChange 通知出去前处理结果数据，转换成各组件需要的数据结构
 * processUrl 处理url，在url上追加或替换可能需要的数据
 */
const options = {
    type: 'goods',
    isPhp: false,
    url: '/skus/warehouses/{warehouse}',
    responseKey: 'body.content',
    key: 'skuId',
    addParams(value) {
        return {
            name: value
        }
    },
    processResults(results) {
        results.map((d, i) => {
            d.key = d.skuId;
            d.label = d.skuId + '／' + d.skuName;
        })

        return results;
    },
    beforeChange(data, v) {
        if (isNaN(v) || v.length >= 11) {
            return false;
        }
        return v;
    },
    processUrl(url, data) {
        if (!url) {
            return url;
        }

        return url.replace('{warehouse}', data.warehouse);
    }
}

export default options;
