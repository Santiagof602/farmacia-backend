// Test script: login with admin@farmauy.com and attempt to create an article.
// Usage:
// 1) Start the server: `npm start` (or run the server in another terminal)
// 2) Run this test: `npm run test:admin`
// The script expects the server at http://localhost:3000

const http = require('http');

function request(options, body) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        let parsed = null;
        try { parsed = JSON.parse(data); } catch (e) { parsed = data; }
        resolve({ statusCode: res.statusCode, body: parsed });
      });
    });
    req.on('error', (err) => reject(err));
    if (body) req.write(typeof body === 'string' ? body : JSON.stringify(body));
    req.end();
  });
}

(async () => {
  try {
    console.log('1) Intentando ejecutar login con admin@farmauy.com');
    const loginData = { email: 'admin@farmauy.com', password: '12345678' };
    const loginRes = await request({
      hostname: 'localhost', port: 3000, path: '/users/login', method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, JSON.stringify(loginData));

    console.log('Login status:', loginRes.statusCode);
    console.log('Login body:', loginRes.body);

    if (!loginRes.body || !loginRes.body.token) {
      console.error('No se obtuvo token en la respuesta de login. Fin.');
      process.exit(1);
    }

    const token = loginRes.body.token;

    console.log('\n2) Intentando crear un artículo usando token admin...');
    const articleData = { name: 'Artículo de prueba admin', price: 9.99, stock: 5, categoryId: 1 };

    const createRes = await request({
      hostname: 'localhost', port: 3000, path: '/articles', method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }
    }, JSON.stringify(articleData));

    console.log('Create article status:', createRes.statusCode);
    console.log('Create article body:', createRes.body);

    console.log('\nResultado: revisá el status codes arriba. Si el create devuelve 201, la protección admin funciona y el admin puede crear artículos. Si devuelve 403, el token no tiene rol admin.');
  } catch (err) {
    console.error('Error durante las peticiones:', err);
    process.exit(1);
  }
})();