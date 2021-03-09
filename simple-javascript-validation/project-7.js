const http = require('http');
const fs = require('fs');
const { parse } = require('querystring');
const { url } = require('inspector');

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    switch (req.url) {
      case '/':
        readFromFileSystem('./index.html', res);
        break;
      case '/assets/css/5.css':
        readFromFileSystem('./assets/css/5.css', res);
        break;
      case '/assets/img/1.png':
        readFromFileSystem('./assets/img/1.png', res);
        break;
      case '/assets/vazir-font-v16.1.0/Vazir-Light.woff':
        readFromFileSystem('./assets/vazir-font-v16.1.0/Vazir-Light.woff', res);
        break;
      case '/assets/javascript/submitForm.js':
        readFromFileSystem('./assets/javascript/submitForm.js', res);
        break;
    }
  } else if (req.url === '/post' && req.method === 'POST') {
    // POST handler
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );

    //read Post Body
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      body = parse(body);
      fetchUserInput(body, res);
    });
  }
});

function readFromFileSystem(path, res) {
  fs.readFile(path, (err, data) => {
    if (err) return;
    res.write(data);
    res.end();
  });
}

function fetchUserInput(body, res) {
  fs.readFile('./userInformation.json', 'utf8', (err, data) => {
    if (err) return;
    if (body.username === ''.trim() || body.password === ''.trim()) {
      return setStatusCodeToRes('emptyfield', res);
    }
    let userDatabase = JSON.parse(data);
    const user = userDatabase.find((item) => {
      return item.userName === body.username;
    });
    if (user) {
      if (user.password === body.password) {
        return setStatusCodeToRes('success', res);
      }

      return setStatusCodeToRes('wrongpassword', res);
    }
    return setStatusCodeToRes('usernotfound', res);
  });
}

function setStatusCodeToRes(status, res) {
  res.write(status);
  res.end();
}

server.listen(3000, () => {
  console.log('Server Is Running ... ');
});
