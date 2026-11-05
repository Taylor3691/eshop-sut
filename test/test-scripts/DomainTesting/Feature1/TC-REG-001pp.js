// Source: test/test-cases/DomainTesting/Feature1/TC-REG-001.md
// Requirement: FR-01
// Technique: Equivalence Partitioning

const assert = require('node:assert/strict')
const puppeteer = require('puppeteer')

const WEB_BASE_URL = process.env.WEB_BASE_URL || 'http://localhost:5173'

async function testSuccessfulRegistration() {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 300,
    defaultViewport: null,
    args: ['--start-maximized']
  })

  try {
    const page = await browser.newPage()
    const data = {
      name: 'Nguyễn Văn An',
      email: 'an.nguyen01@example.com',
      password: 'Abcdef1@',
    }

    await page.goto(`${WEB_BASE_URL}/register`, {
      waitUntil: 'networkidle0',
    })

    const [nameInput, emailInput] = await page.$$('form input[type="text"]')
    assert.ok(nameInput, 'Không tìm thấy ô Họ Tên')
    assert.ok(emailInput, 'Không tìm thấy ô Email')

    await nameInput.type(data.name)
    await emailInput.type(data.email)
    await page.type('input[type="password"]', data.password)

    const [registerResponse] = await Promise.all([
      page.waitForResponse(
        (response) =>
          response.request().method() === 'POST' &&
          response.url().includes('/api/register'),
      ),
      page.click('form button[type="submit"]'),
    ])

    assert.equal(
      registerResponse.status(),
      200,
      `Đăng ký thất bại: API trả về HTTP ${registerResponse.status()}`,
    )

    await page.waitForFunction(() => window.location.pathname === '/login')
    assert.equal(new URL(page.url()).pathname, '/login')

    console.log('[TC-REG-001] PASS - Đăng ký tài khoản thành công')
  } finally {
    await browser.close()
  }
}

testSuccessfulRegistration().catch((error) => {
  console.error('[TC-REG-001] FAIL - Đăng ký tài khoản không thành công')
  console.error(error)
  process.exitCode = 1
})
