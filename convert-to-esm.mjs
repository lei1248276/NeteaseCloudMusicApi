const fs = require('fs');
const path = require('path');

const moduleDir = path.join(__dirname, 'module');

// 读取所有js文件
const files = fs.readdirSync(moduleDir).filter(file => file.endsWith('.js'));

files.forEach(file => {
    const filePath = path.join(moduleDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // 如果文件已经是 ESM 格式，跳过
    if (content.includes('export default')) {
        console.log(`${file} 已经是 ESM 格式`);
        return;
    }

    // 替换 require
    content = content.replace(/const\s+(\w+)\s*=\s*require\(['"]([^'"]+)['"]\)/g, 
        'import $1 from "$2"');

    // 替换 module.exports
    content = content.replace(/module\.exports\s*=/, 'export default');

    // 如果是异步函数，保持 async
    if (content.includes('async')) {
        content = content.replace(/export default async/g, 'export default async');
    }

    // 写回文件
    fs.writeFileSync(filePath, content);
    console.log(`已转换 ${file} 为 ESM 格式`);
});

console.log('转换完成！'); 
