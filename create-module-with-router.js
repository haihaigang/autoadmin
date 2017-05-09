/**
 * 功能：自动创建新的模块，并更新路由
 * 命令：node create-module-with-router.js xx xx
 * 实现：调用创建新的模块和更新路由两个命令
 * 
 */
const child_process = require('child_process');

var args = process.argv.splice(2);
var item = {};

if (args.length > 0) {
    item.module = args[0];
}
if (args.length > 1) {
    item.template = args[1];
}
if (args.length > 2) {
    item.desc = args[2];
}

child_process.execSync('node create-module.js ' + item.module + ' ' + item.template + ' ' + item.desc);

child_process.execSync('node generate-router.js');