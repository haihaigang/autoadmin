/**
 * 功能：自动生成项目目录结构
 * 命令：node generate-module.js
 * 实现：读取robots/structure.json文件获取目录结构，生成到pages下
 * 
 */
const fs = require('fs');
const child_process = require('child_process');

try {
    var structures = getStructures();

    structures.map((item, i) => {
        console.log('exec: node create-module.js ' + item.module + ' ' + item.template + ' ' + item.desc);
        child_process.execSync('node create-module.js ' + item.module + ' ' + item.template + ' ' + item.desc);
    });
    console.log('count: ' + structures.length)
    child_process.execSync('node generate-router.js');
} catch (e) {
    console.log(e)
}

// 从文件中获取项目的目录结构
function getStructures() {
    var data = fs.readFileSync('./src/robots/structure.json');
    // 清除文件头部的注释
    data = data.toString().replace(/\/.*[^\/]*.*\//, '');
    return JSON.parse(data);
}
