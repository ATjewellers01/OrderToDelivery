const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'src', 'app', 'pages');
const files = fs.readdirSync(targetDir);

files.forEach(file => {
    if (file.endsWith('.tsx')) {
        const filePath = path.join(targetDir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        
        // We want to replace the literal string "\n" with actual newlines
        // Only within the getOrdersData function to be safe
        const startMarker = 'const getOrdersData = () => {';
        const endMarker = 'return newData;';
        
        let startIdx = content.indexOf(startMarker);
        if (startIdx !== -1) {
            let endIdx = content.indexOf(endMarker, startIdx);
            if (endIdx !== -1) {
                // Find the closing brace of the function after the return statement
                let funcEndIdx = content.indexOf('};', endIdx) + 2;
                let functionBody = content.substring(startIdx, funcEndIdx);
                
                // Replace literal \n with real newline
                let fixedBody = functionBody.split('\\n').join('\n');
                
                content = content.substring(0, startIdx) + fixedBody + content.substring(funcEndIdx);
                
                fs.writeFileSync(filePath, content, 'utf8');
                console.log('Fixed ' + file);
            }
        }
    }
});
