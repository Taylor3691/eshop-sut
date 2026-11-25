const fs = require('fs');
const path = require('path');

const baseUrl = 'http://127.0.0.1:3100';
const outputDir = process.argv[2];
if (!outputDir) throw new Error('Output directory argument is required');
fs.mkdirSync(outputDir, { recursive: true });

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function sanitize(value) {
  if (Array.isArray(value)) return value.map(sanitize);
  if (value && typeof value === 'object') {
    const copy = {};
    for (const [key, item] of Object.entries(value)) {
      if (/^(password|token)$/i.test(key)) copy[key] = '<redacted>';
      else copy[key] = sanitize(item);
    }
    return copy;
  }
  return value;
}

async function request(method, route, body, token) {
  const timestamp = new Date().toISOString();
  const headers = {};
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  if (token) headers.Authorization = 'Bearer <redacted>';
  const response = await fetch(baseUrl + route, {
    method,
    headers: {
      ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  const raw = await response.text();
  let parsed;
  try { parsed = JSON.parse(raw); } catch { parsed = raw; }
  return {
    timestamp,
    method,
    url: baseUrl + route,
    request: { headers, body: sanitize(body) },
    response: { status: response.status, body: sanitize(parsed) },
  };
}

async function waitForBackend() {
  for (let attempt = 0; attempt < 30; attempt++) {
    try {
      const response = await fetch(baseUrl + '/api/products');
      if (response.ok) return;
    } catch {}
    await sleep(250);
  }
  throw new Error('Backend did not become ready on port 3100');
}

async function createUser(tag) {
  const email = `${tag}.${Date.now()}@eshop.test`;
  const password = 'BugTest123!';
  const registration = await request('POST', '/api/register', {
    name: `${tag} Test User`, email, password,
  });
  const login = await request('POST', '/api/login', { email, password });
  const tokenRaw = await fetch(baseUrl + '/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const tokenBody = await tokenRaw.json();
  if (!tokenBody.token) throw new Error(`Could not log in ${email}`);
  return { email, password, token: tokenBody.token, registration, login };
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function renderStep(step, index) {
  return `<section class="step">
    <div class="step-title">Step ${index + 1}: ${escapeHtml(step.method)} ${escapeHtml(step.url)}</div>
    <div class="timestamp">${escapeHtml(step.timestamp)}</div>
    <div class="columns">
      <div><h3>Request</h3><pre>${escapeHtml(JSON.stringify(step.request, null, 2))}</pre></div>
      <div><h3>Response - HTTP ${step.response.status}</h3><pre>${escapeHtml(JSON.stringify(step.response.body, null, 2))}</pre></div>
    </div>
  </section>`;
}

function writeEvidence(bug) {
  const html = `<!doctype html><html lang="vi"><head><meta charset="utf-8">
  <title>${escapeHtml(bug.id)} runtime evidence</title>
  <style>
  *{box-sizing:border-box} body{margin:0;background:#eef2f7;color:#172033;font:14px/1.35 Segoe UI,Arial,sans-serif}
  main{width:1500px;margin:0 auto;padding:22px} header{background:#162238;color:white;padding:18px 22px;border-radius:12px;margin-bottom:14px}
  h1{font-size:25px;margin:0 0 7px}.meta{color:#b9c9e4}.summary{display:grid;grid-template-columns:1fr 1fr 160px;gap:12px;margin-bottom:14px}
  .card{background:white;border-radius:10px;padding:12px 14px;border:1px solid #d7dfeb}.pass{background:#e5f8eb;color:#146c2e;font-weight:700;text-align:center;font-size:20px;display:flex;align-items:center;justify-content:center}
  .step{background:white;border:1px solid #d7dfeb;border-radius:10px;margin:10px 0;padding:12px}.step-title{font-weight:700;color:#0b57a3}.timestamp{color:#637086;font-size:12px;margin:3px 0 8px}
  .columns{display:grid;grid-template-columns:1fr 1fr;gap:12px}h3{font-size:13px;margin:0 0 5px;color:#4b596f}pre{margin:0;background:#111827;color:#e5edf8;padding:10px;border-radius:7px;white-space:pre-wrap;word-break:break-word;max-height:225px;overflow:hidden;font:12px/1.25 Consolas,monospace}
  footer{color:#526078;text-align:center;padding:9px}
  </style></head><body><main>
  <header><h1>${escapeHtml(bug.id)} - ${escapeHtml(bug.title)}</h1><div class="meta">Runtime API evidence | ${escapeHtml(bug.runAt)} | ${escapeHtml(baseUrl)} | disposable SQLite database</div></header>
  <div class="summary"><div class="card"><b>Expected</b><br>${escapeHtml(bug.expected)}</div><div class="card"><b>Observed</b><br>${escapeHtml(bug.observed)}</div><div class="card pass">${bug.reproduced ? 'REPRODUCED' : 'NOT REPRODUCED'}</div></div>
  ${bug.steps.map(renderStep).join('\n')}
  <footer>Generated from actual HTTP requests. Tokens and passwords are redacted.</footer>
  </main></body></html>`;
  fs.writeFileSync(path.join(outputDir, `${bug.id}.html`), html, 'utf8');
}

async function main() {
  await waitForBackend();
  const products = await request('GET', '/api/products');
  const product = products.response.body[0];
  const results = [];

  // BUG-01
  const login1 = await request('POST', '/api/login', { email: 'test@eshop.com', password: 'Test1234!' });
  const tokenFetch1 = await fetch(baseUrl + '/api/login', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({email:'test@eshop.com',password:'Test1234!'}) });
  const token1 = (await tokenFetch1.json()).token;
  const profile1 = await request('GET', '/api/users/me', undefined, token1);
  const adminUsers = await request('GET', '/api/admin/users', undefined, token1);
  results.push({ id:'BUG-01', title:'Non-admin user can access Admin APIs', runAt:new Date().toISOString(), expected:'A user-role token must receive HTTP 403.', observed:`User role=${profile1.response.body.role}; GET /api/admin/users returned HTTP ${adminUsers.response.status} with ${adminUsers.response.body.length} users.`, reproduced:profile1.response.body.role==='user' && adminUsers.response.status===200, steps:[login1,profile1,adminUsers] });

  // BUG-02
  const u2 = await createUser('bug02');
  const before2 = await request('GET', '/api/users/me', undefined, u2.token);
  const update2 = await request('PUT', '/api/users/me', { name:'BUG-02 Test User', shipping_address:'Runtime evidence address', phone:'0900000000', role:'admin' }, u2.token);
  const after2 = await request('GET', '/api/users/me', undefined, u2.token);
  results.push({ id:'BUG-02', title:'User can self-assign the admin role', runAt:new Date().toISOString(), expected:'The server must reject or ignore role changes from a normal user.', observed:`Role changed from ${before2.response.body.role} to ${after2.response.body.role}; update returned HTTP ${update2.response.status}.`, reproduced:before2.response.body.role==='user' && after2.response.body.role==='admin', steps:[before2,update2,after2] });

  // BUG-03
  const u3 = await createUser('bug03');
  const add3 = await request('POST', '/api/cart', { id:product.id, name:product.name, price:product.price, quantity:1 }, u3.token);
  const checkout3 = await request('POST', '/api/checkout', { total_amount:1, shipping_address:'BUG-03 runtime evidence' }, u3.token);
  const orders3 = await request('GET', '/api/orders/my-orders', undefined, u3.token);
  const order3 = orders3.response.body.find((order) => order.id === checkout3.response.body.orderId);
  results.push({ id:'BUG-03', title:'Checkout accepts client-controlled total_amount', runAt:new Date().toISOString(), expected:`Backend must calculate ${product.price} from the cart and ignore total_amount=1.`, observed:`Checkout returned HTTP ${checkout3.response.status}; order ${order3.id} was stored with total_amount=${order3.total_amount}.`, reproduced:Number(order3.total_amount)===1, steps:[products,add3,checkout3,orders3] });

  // BUG-04
  const u4 = await createUser('bug04');
  const add4 = await request('POST', '/api/cart', { id:product.id, name:product.name, price:product.price, quantity:1 }, u4.token);
  const before4 = await request('GET', '/api/cart', undefined, u4.token);
  const checkout4 = await request('POST', '/api/checkout', { total_amount:product.price, shipping_address:'BUG-04 runtime evidence' }, u4.token);
  const after4 = await request('GET', '/api/cart', undefined, u4.token);
  results.push({ id:'BUG-04', title:'Cart remains populated after checkout', runAt:new Date().toISOString(), expected:'GET /api/cart must return [] after successful checkout.', observed:`Cart had ${before4.response.body.length} item before checkout and ${after4.response.body.length} item after checkout.`, reproduced:before4.response.body.length>0 && after4.response.body.length>0, steps:[add4,before4,checkout4,after4] });

  // BUG-05
  const u5 = await createUser('bug05');
  const cartItem5 = { id:product.id, name:product.name, price:product.price, quantity:1 };
  const add51 = await request('POST', '/api/cart', cartItem5, u5.token);
  const add52 = await request('POST', '/api/cart', cartItem5, u5.token);
  const cart5 = await request('GET', '/api/cart', undefined, u5.token);
  const matching5 = cart5.response.body.filter((item) => item.id === product.id);
  results.push({ id:'BUG-05', title:'Adding the same product creates duplicate rows', runAt:new Date().toISOString(), expected:'Cart must contain one row with quantity=2.', observed:`Cart contains ${matching5.length} rows for product ID ${product.id}, each with quantity=${matching5.map(x=>x.quantity).join(',')}.`, reproduced:matching5.length===2, steps:[add51,add52,cart5] });

  // BUG-06
  const coupon6 = await request('POST', '/api/apply-coupon', { code:'SAVE10', total_amount:1000000 });
  results.push({ id:'BUG-06', title:'Percentage coupon calculation returns invalid amount', runAt:new Date().toISOString(), expected:'SAVE10 must return discount_amount=100000 and final_amount=900000.', observed:`discount_amount=${coupon6.response.body.discount_amount}; final_amount=${coupon6.response.body.final_amount}.`, reproduced:coupon6.response.body.discount_amount===-9000000 && coupon6.response.body.final_amount===10000000, steps:[coupon6] });

  // BUG-07
  const email7 = `bug07.${Date.now()}@eshop.test`;
  const password7 = 'BugTest123!';
  const reg7 = await request('POST', '/api/register', { name:'BUG-07 Test User', email:email7, password:password7 });
  const wrong71 = await request('POST', '/api/login', { email:email7, password:'WrongPassword1!' });
  const wrong72 = await request('POST', '/api/login', { email:email7, password:'WrongPassword2!' });
  const correct73 = await request('POST', '/api/login', { email:email7, password:password7 });
  await sleep(31000);
  const correct74 = await request('POST', '/api/login', { email:email7, password:password7 });
  results.push({ id:'BUG-07', title:'Login lockout triggers early and lasts over 30 seconds', runAt:new Date().toISOString(), expected:'Two failed logins must not lock the account; lock duration after three failures must be 30 seconds.', observed:`Wrong attempts returned ${wrong71.response.status}/${wrong72.response.status}; correct password immediately returned ${correct73.response.status}; correct password after 31 seconds returned ${correct74.response.status}.`, reproduced:wrong71.response.status===401 && wrong72.response.status===401 && correct73.response.status===403 && correct74.response.status===403, steps:[reg7,wrong71,wrong72,correct73,correct74] });

  const report = { generatedAt:new Date().toISOString(), baseUrl, results };
  fs.writeFileSync(path.join(outputDir, 'reproduction-results.json'), JSON.stringify(report, null, 2), 'utf8');
  for (const bug of results) writeEvidence(bug);
  console.log(JSON.stringify(results.map(({id,reproduced,observed}) => ({id,reproduced,observed})), null, 2));
  if (results.some((bug) => !bug.reproduced)) process.exitCode = 2;
}

main().catch((error) => { console.error(error); process.exit(1); });
