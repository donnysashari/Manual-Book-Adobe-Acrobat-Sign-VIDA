const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const port = 8000;

// MIME types
const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.pdf': 'application/pdf',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.ico': 'image/x-icon'
};

console.log('Checking PDF files in directory:');
const pdfFiles = [
    'Adobe_Sign_powered_by_VIDA-Digital_Signing_for_External_User.pdf',
    'Adobe_Sign_powered_by_VIDA_eKYC_Complete_Account_eSignature_Digital_Signature.pdf'
];
pdfFiles.forEach(file => {
    if (fs.existsSync(path.join(__dirname, file))) {
        console.log(`✅ Found: ${file}`);
    } else {
        console.log(`❌ Missing: ${file}`);
    }
});

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url);
    let pathname = parsedUrl.pathname;
    
    // Log all requests for debugging
    console.log(`📄 Request: ${pathname}`);
    
    // Default to index.html
    if (pathname === '/') {
        pathname = '/index.html';
    }
    
    // Auto-append .html extension if not present and no extension detected
    if (!path.extname(pathname) && pathname !== '/') {
        pathname += '.html';
    }
    
    // Decode URL for files with spaces and special characters
    pathname = decodeURIComponent(pathname);
    
    const filePath = path.join(__dirname, pathname);
    const ext = path.extname(pathname).toLowerCase();
    const mimeType = mimeTypes[ext] || 'application/octet-stream';
    
    // Special handling for PDF files
    if (ext === '.pdf') {
        console.log(`🔍 Looking for PDF: ${filePath}`);
        console.log(`📁 File exists: ${fs.existsSync(filePath)}`);
    }
    
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.log(`❌ Error loading ${pathname}:`, err.code);
            if (err.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end(`<h1>404 Not Found</h1><p>File: ${pathname}</p>`);
            } else {
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end('<h1>500 Internal Server Error</h1>');
            }
        } else {
            console.log(`✅ Serving ${pathname} (${mimeType})`);
            res.writeHead(200, { 
                'Content-Type': mimeType,
                'Access-Control-Allow-Origin': '*',
                'Content-Length': data.length
            });
            res.end(data);
        }
    });
});

server.listen(port, () => {
    console.log(`Adobe Manual Books server running at http://localhost:${port}/`);
    console.log('Press Ctrl+C to stop the server');
});
