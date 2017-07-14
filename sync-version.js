/**
 * 功能：自动更新版本号
 * 命令：node sync-version.js
 * 实现：获取远端的version.json文件，拿到上次发布后的版本号，
 *      自动增加一，然后生成一个新的version.json文件，
 *      再次发布会使用新的替换旧的文件，实现版本号自动增加
 * 更新文件：./build/version.json ./package.json ./README.md
 */

const fs = require('fs');
const http = require('http');
const json = require('./package.json');

var options = {
    hostname: 'admin.shtjzy.cn',//以ip代替域名，方便本地的host随意更改
    port: 80,
    path: '/version.json',
    method: 'GET',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'meigo-permission': '123@meigo.com'//注意这里的口令可能更改
    }
};

var req = http.request(options, (res) => {
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);

        try {
            var meigo = JSON.parse(chunk); //state
            meigo.version = processVersion(meigo.version);
            fs.writeFileSync('./build/version.json', prettyJson(meigo), 'utf8');
            processPackage(meigo.version);
            processReadme(meigo.version);
        } catch (e) {
            console.log(e.message);
        }
    });
    res.on('end', () => {
        console.log('No more data in response.');
    });
});

req.on('error', (e) => {
    console.log(`problem with request: ${e.message}`);
});

req.end();


/**
 * 处理版本号，实现版本号+1
 * @param version 旧的版本号
 * @return 新的版本号
 */
function processVersion(version) {
    if (!version || !/^\d{1}\.\d{1}.\d{1}$/.test(version)) {
        // 忽略错误的版本号
        return version;
    }

    version = version.replace(/\./g, '');
    version = parseInt(version);
    version++;

    if (version > 999) {
        return 'max';
    }

    version = version.toString();
    if(version.length < 3){
        // 不足三位的前置补零
        if(version.length < 2){
            version = '00' + version;
        }else{
            version = '0' + version;
        }
    }
    version = version.split('').join('.');
    return version;
}

/**
 * 处理package配置，读取旧的package文件替换版本号后再替换
 * @param version 版本号
 * @return
 */
function processPackage(version) {
    var data = fs.readFileSync('./package.json');
    data = JSON.parse(data);
    data.version = version;

    fs.writeFileSync('./package.json', prettyJson(data), 'utf8');
}

/**
 * 处理README版本记录文件
 * @param version 版本号
 * @return
 */
function processReadme(version) {
    var data = fs.readFileSync('./README.md');
    if(data.indexOf(version) >= 0){
        // 如果存在版本记录则忽略
        return;
    }

    var tpl = '# VERSION\r\n### //新增的问题\r\n\r\n### //修复的问题\r\n\r\n';
    data = tpl.replace('VERSION', version) + data;
    fs.writeFileSync('./README.md', data, 'utf8');
}

/**
 * 格式化输出json数据
 * @param jsonData json数据
 * @return
 */
function prettyJson(jsonData) {
    return JSON.stringify(jsonData, null, ' ');
}
