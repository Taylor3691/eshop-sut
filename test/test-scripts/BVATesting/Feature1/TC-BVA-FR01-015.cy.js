// Source: test/test-cases/BVATesting/Feature1/TC-BVA-FR01-015.md
// Requirement: FR-01
// Technique: Boundary Value Analysis

const {
  ensureRegistered,
  expectRegistrationRejected,
  expectRegistrationSucceeded,
  submitRegistration,
} = require('../../support/registration')

const hasWebBaseUrl = Boolean(Cypress.expose('WEB_BASE_URL'))
const webIt = hasWebBaseUrl ? it : it.skip

describe('Feature1 - Đăng ký tài khoản', () => {
  // Blocked when CYPRESS_WEB_BASE_URL is not supplied by the runner.
  webIt('[TC-BVA-FR01-015] Đăng ký thành công với hai ký tự đặc biệt hợp lệ', () => {
    const data = {
  "name": "Nguyễn Văn An",
  "email": "bva015@example.com",
  "password": "ABcdefgh12!@"
}

    cy.intercept('POST', '**/api/register').as('register')
    submitRegistration(data)
    expectRegistrationSucceeded()
  })
})
