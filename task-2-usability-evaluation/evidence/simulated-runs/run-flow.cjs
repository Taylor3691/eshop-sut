const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const fs = require('fs');
const path = require('path');
const base = path.resolve('task-2-usability-evaluation/evidence');
const people = [
 ['P01','Phạm Bảo Huy'],['P02','Trần Anh Khoa'],['P03','Tô Thành Long'],['P04','Nguyễn Minh Hiếu'],['P05','Nguyễn Viết Toàn'],['P06','Nguyễn Minh Tú'],['P07','Cao Trọng Khang']
];
(async()=>{
 const outcomes=[];
 for (const [id,name] of people) {
  const email = `${id.toLowerCase()}-sim-${Date.now()}@example.test`;
  const pass='Test1234!';
  const reg=await fetch('http://localhost:3000/api/register',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({name,email,password:pass})});
  const registration=await reg.text();
  const videoDir=path.join(base,'session-recordings');
  const browser=await chromium.launch({headless:true});
  const context=await browser.newContext({recordVideo:{dir:videoDir,size:{width:1280,height:800}},viewport:{width:1280,height:800}});
  const page=await context.newPage();
  const steps=[];
  const snap=async label=>{await page.screenshot({path:path.join(base,'screenshots',`${id}-${label}.png`),fullPage:true});};
  try {
   await page.goto('http://localhost:5173/login');
   await page.locator('input').nth(0).fill(email); await page.locator('input').nth(1).fill(pass); await page.locator('button[type=submit]').click();
   await page.waitForURL('http://localhost:5173/'); steps.push('login:PASS'); await snap('01-login-home');
   await page.locator('button').filter({hasText:'Thêm vào giỏ'}).first().click();
   await page.locator('header a[href="/cart"]').click(); await page.waitForTimeout(200); steps.push('cart:PASS'); await snap('02-cart');
   const checkout=page.locator('button.bg-green-500'); await checkout.click(); await page.waitForURL('**/checkout');
   await page.locator('input[placeholder]').fill('SAVE10'); await page.locator('button.bg-orange-500').click(); await page.waitForTimeout(500);
   const couponText=await page.locator('main').innerText(); steps.push(couponText.includes('Tiết kiệm')?'coupon:PASS':'coupon:FAIL'); await snap('03-coupon-checkout');
   await page.locator('button.bg-green-600').click(); await page.locator('h2.text-green-600').waitFor({timeout:10000}); steps.push('checkout:PASS'); await snap('04-checkout-success');
   await page.locator('header a[href="/profile"]').click(); await page.waitForTimeout(800);
   const orderText=await page.locator('main').innerText(); steps.push(/#\d+/.test(orderText)?'verify-order:PASS':'verify-order:FAIL'); await snap('05-order-history');
   await page.locator('header button.bg-red-500').click(); await page.waitForTimeout(300); steps.push((await page.evaluate(()=>localStorage.getItem('token')))===null?'logout:PASS':'logout:FAIL'); await snap('06-logout');
  } catch(e) { steps.push(`FAIL:${e.message}`); await snap('failure').catch(()=>{}); }
  await context.close();
  const videoTmp=await page.video().path().catch(()=>null);
  await browser.close();
  const videoFinal=path.join(videoDir,`${id}-simulated.webm`); if(videoTmp && fs.existsSync(videoTmp)) fs.copyFileSync(videoTmp,videoFinal);
  outcomes.push({id,name,registration:reg.status,registrationBody:registration,steps,video:`session-recordings/${id}-simulated.webm`});
  console.log(JSON.stringify(outcomes[outcomes.length-1]));
 }
 fs.writeFileSync(path.join(base,'simulated-runs','run-results.json'),JSON.stringify(outcomes,null,2));
})();



