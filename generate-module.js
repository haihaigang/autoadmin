const fs = require('fs');
const child_process = require('child_process');

try {
    var structures = getStructures();

    structures.map((item, i) => {
        child_process.execSync('node create-module.js ' + item.module + ' ' + item.template + ' ' + item.desc);
    });
} catch (e) {
    console.log(e)
}

function getStructures() {
    var data = fs.readFileSync('./src/robots/structure.json');
    return JSON.parse(data);
}
