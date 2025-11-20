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
    console.log('1) Intentando login con test@farmauy.com');
    const loginData = { email: 'test@farmauy.com', password: '12345678' };
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

    console.log('\n2) Intentando crear una orden usando token...');
    // Ajustar articleId(s) según tu DB
    const orderData = { items: [{ articleId: 1, quantity: 1 }, { articleId: 2, quantity: 1 }] };

    const createRes = await request({
      hostname: 'localhost', port: 3000, path: '/orders', method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }
    }, JSON.stringify(orderData));

    console.log('Create order status:', createRes.statusCode);
    console.log('Create order body:', createRes.body);

    console.log('\n3) Intentando cancelar la orden como propietario (si se creó)');
    if (createRes.body && createRes.body.order && createRes.body.order.id) {
      const orderId = createRes.body.order.id;
      const cancelRes = await request({
        hostname: 'localhost', port: 3000, path: `/orders/${orderId}`, method: 'DELETE',
        headers: { 'Authorization': 'Bearer ' + token }
      });

      console.log('Cancel status:', cancelRes.statusCode);
      console.log('Cancel body:', cancelRes.body);
    } else {
      console.log('No se creó la orden, no se intentará cancelar');
    }

    console.log('\nTest de órdenes finalizado.');
  } catch (err) {
    console.error('Error durante las peticiones:', err);
    process.exit(1);
  }
})();