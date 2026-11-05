// The backend URL is confirmed by backend/server.js and README.md.
const API_URL = 'http://localhost:3000/api'

const couponForm = () =>
  cy.contains('h3', 'Tạo mã giảm giá mới').parent('form')

function loginAsAdminApi({ email, password }) {
  return cy.request({
    method: 'POST',
    url: `${API_URL}/login`,
    body: {
      email,
      password,
    },
    log: false,
  }).then(({ body }) => {
    // Assert only derived values so Cypress does not expose the bearer token in its log.
    expect(typeof body.token, 'admin token type').to.eq('string')
    expect(Boolean(body.token), 'admin token presence').to.eq(true)
    return body.token
  })
}

function cleanupCouponByCode(code, credentials) {
  if (!code) return cy.wrap(null, { log: false })

  return loginAsAdminApi(credentials).then((token) =>
    cy.request({
      method: 'GET',
      url: `${API_URL}/coupons`,
      headers: { Authorization: `Bearer ${token}` },
      log: false,
    }).then(({ body }) => {
      body
        .filter((coupon) => coupon.code === code)
        .forEach((coupon) => {
          cy.request({
            method: 'DELETE',
            url: `${API_URL}/admin/coupons/${coupon.id}`,
            headers: { Authorization: `Bearer ${token}` },
            log: false,
          })
        })
    }),
  )
}

function createCouponViaApi(data, credentials) {
  return loginAsAdminApi(credentials).then((token) =>
    cy.request({
      method: 'POST',
      url: `${API_URL}/admin/coupons`,
      headers: { Authorization: `Bearer ${token}` },
      body: data,
      failOnStatusCode: false,
      log: false,
    }),
  )
}

function ensureCoupon(data, credentials) {
  return cleanupCouponByCode(data.code, credentials)
    .then(() => createCouponViaApi(data, credentials))
    .its('status')
    .should('eq', 200)
}

function openCouponAdmin({ email, password }) {
  cy.intercept('POST', '**/api/login').as('adminLogin')
  cy.intercept('GET', '**/api/coupons').as('loadCoupons')
  cy.visit(Cypress.expose('ADMIN_BASE_URL'))
  cy.get('input[placeholder="Email"]').type(email)
  cy.get('input[placeholder="Password"]').type(password, { log: false })
  cy.contains('button', 'Login').click()
  cy.wait('@adminLogin').its('response.statusCode').should('eq', 200)
  cy.wait('@loadCoupons').its('response.statusCode').should('eq', 200)
  cy.contains('li', 'Mã Giảm Giá').click()
  cy.contains('h2', 'Quản lý Mã Giảm Giá').should('be.visible')
}

function submitCouponViaUi(data, credentials) {
  openCouponAdmin(credentials)
  cy.intercept('POST', '**/api/admin/coupons').as('createCoupon')

  couponForm().within(() => {
    const code = data.code ?? ''
    const discountValue = data.discount_value ?? ''
    const minimum = data.min_order_amount ?? ''
    const expiry = data.expired_at ?? ''
    const maximum = data.max_uses_per_user ?? ''

    if (code !== '') cy.get('input[placeholder="Mã coupon (VD: SAVE10)"]').type(code)
    cy.get('select').select(data.type)
    if (discountValue !== '') {
      const discountPlaceholder =
        data.type === 'percent'
          ? 'Giá trị % (VD: 10)'
          : 'Số tiền (VD: 50000)'
      cy.get(`input[placeholder="${discountPlaceholder}"]`).type(discountValue)
    }
    cy.get('input[placeholder="Đơn tối thiểu (₫)"]').clear()
    if (minimum !== '') {
      cy.get('input[placeholder="Đơn tối thiểu (₫)"]').type(minimum)
    }
    if (expiry !== '') cy.get('input[placeholder="Ngày hết hạn"]').type(expiry)
    cy.get('input[placeholder="Số lần dùng tối đa/người"]').clear()
    if (maximum !== '') {
      cy.get('input[placeholder="Số lần dùng tối đa/người"]').type(maximum)
    }
    cy.contains('button', 'Tạo mã').click()
  })
}

function expectCouponCreated(code, displayedType) {
  cy.wait('@createCoupon').its('response.statusCode').should('eq', 200)
  cy.contains('tbody tr', code)
    .should('be.visible')
    .and('contain.text', displayedType)
}

function expectCouponRejectedByApi() {
  cy.wait('@createCoupon')
    .its('response.statusCode')
    .should('be.gte', 400)
}

function expectCouponRejectedByBrowser() {
  couponForm().find(':invalid').should('have.length.at.least', 1)
}

module.exports = {
  cleanupCouponByCode,
  createCouponViaApi,
  ensureCoupon,
  expectCouponCreated,
  expectCouponRejectedByApi,
  expectCouponRejectedByBrowser,
  submitCouponViaUi,
}

