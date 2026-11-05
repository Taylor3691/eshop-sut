// Source: test/test-cases/BVATesting/Feature1/TC-BVA-FR01-011.md
// Requirement: FR-01
// Technique: Boundary Value Analysis

const {
  ensureRegistered,
  expectRegistrationRejected,
  expectRegistrationSucceeded,
  submitRegistration,
} = require('../../support/registration')


describe('Feature1 - Đăng ký tài khoản', () => {
  // Blocked when CYPRESS_WEB_BASE_URL is not supplied by the runner.
  it('[TC-BVA-FR01-011] Đăng ký thành công với một chữ số', () => {
    const data = {
  "name": "Nguyễn Văn An",
  "email": "bva011@example.com",
  "password": "ABcdefg1!@$%"
}

    cy.intercept('POST', '**/api/register').as('register')
    submitRegistration(data)
    expectRegistrationSucceeded()
  })
})
