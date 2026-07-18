const http = require('http');
const fs = require('fs');
const path = require('path');
const mime = {
    'html': 'text/html',
    'css': 'text/css',
    'js': 'application/javascript',
    'svg': 'image/svg+xml',
    'ico': 'image/x-icon',
    'png': 'image/png',
    'jpg': 'image/jpeg',
    'json': 'application/json'
};
http.createServer((req, res) => {
    let filePath = path.join('.', req.url === '/' ? 'index.html' : req.url);
    try {
        let content = fs.readFileSync(filePath);
        let ext = path.extname(filePath).slice(1);
        res.writeHead(200, { 'Content-Type': mime[ext] || 'text/plain' });
        res.end(content);
    } catch (e) {
        res.writeHead(404);
        res.end('Not Found');
    }
}).listen(8080, () => console.log('Server running at http://localhost:8080'));
