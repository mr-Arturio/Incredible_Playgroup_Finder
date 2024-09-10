const { createServer } = require('https');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');
const path = require('path');

// Load SSL certificate and private key
const httpsOptions = {
  key: fs.readFileSync(path.join(__dirname, 'certs', 'localhost.key')),
  cert: fs.readFileSync(path.join(__dirname, 'certs', 'localhost.crt')),
};

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log('> Server running on https://localhost:3000');
  });
});
