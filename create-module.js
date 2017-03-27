/**
 * 功能：自动创建新的模块
 * 命令：node create-module.js xx xx
 * 实现：读取template下的模版文件生成到对应的目录
 * 
 */
const fs = require('fs');
const baseDir = './src';
const baseTempDir = './template';
const folderSep = '/';
const moduleFolders = [
    'actions',
    'columns',
    'components',
    'conditinos',
    'constants',
    'dispatcher',
    'forms',
    'img',
    'reqs',
    'scss',
    'stores'
];

var folderName = 'abc';
var moduleName = "Abc";

try {
    var args = process.argv.splice(2);
    if (args.length < 1) {
        console.log('请输入目录名称');
        return;
    }
    folderName = args[0];
    if (!/^[a-z]{1}[a-z0-9]*$/.test(folderName)) {
        console.log('输入的目录名称不正确，需要字母＋数字');
        return;
    }
    if (args.length > 1) {
        moduleName = args[1];
    } else {
        moduleName = folderName;
    }
    moduleName = moduleName.substring(0, 1).toUpperCase() + moduleName.substring(1);
    if (!/^[A-Z]{1}[a-zA-Z0-9]*$/.test(moduleName)) {
        console.log('输入的模块名称不正确，需要字母＋数字');
        return;
    }

    const targetPath = baseDir + folderSep + folderName;

    if (fs.existsSync(targetPath)) {
        console.log('目录已存在' + targetPath);
    } else {
        fs.mkdirSync(targetPath);
        console.log('成功创建目录' + targetPath);
    }

    moduleFolders.map(function(item, i) {
        const folder = targetPath + folderSep + item;
        if (fs.existsSync(folder)) {
            console.log('目录已存在' + folder);
        } else {
            fs.mkdirSync(folder);
            console.log('成功创建目录' + folder);
        }
    })

    const templateFiles = fs.readdirSync(baseTempDir);
    templateFiles.map(function(file, i) {
        const subFilePath = baseTempDir + folderSep + file;
        const stat = fs.statSync(subFilePath);
        if (stat.isFile()) {
            copyFile(file, baseTempDir, targetPath);
        } else if (stat.isDirectory()) {
            const subFiles = fs.readdirSync(subFilePath);
            subFiles.map(function(sfile, i) {
                const subStat = fs.statSync(subFilePath + folderSep + sfile);
                if (subStat.isFile()) {
                    copyFile(sfile, subFilePath, targetPath + folderSep + file)
                }
            })
        }
    })
} catch (ex) {
    console.log(ex);
}

function copyFile(fileName, sourcePath, targetPath) {
    var fileContent = fs.readFileSync(sourcePath + folderSep + fileName, 'utf8');
    fileContent = fileContent.replace(/\[ROUTERPATH\]/g, getRouterPath(folderName, moduleName));
    fileContent = fileContent.replace(/\[MODULE\]/g, moduleName);
    fileName = fileName.replace('Template', moduleName);
    fs.writeFileSync(targetPath + folderSep + fileName, fileContent, 'utf8');
}

function getRouterPath(folderName, moduleName) {
    if (folderName == moduleName.toLowerCase()) {
        return folderName;
    } else {
        return folderName + '-' + moduleName.toLowerCase();
    }
}
