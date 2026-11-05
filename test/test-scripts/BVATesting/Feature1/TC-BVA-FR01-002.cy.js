// Source: test/test-cases/BVATesting/Feature1/TC-BVA-FR01-002.md
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
  it('[TC-BVA-FR01-002] Đăng ký thành công với mật khẩu dài 8 ký tự', () => {
    const data = {
  "name": "Nguyễn Văn An",
  "email": "bva002@example.com",
  "password": "ABcd12!@"
}

    cy.intercept('POST', '**/api/register').as('register')
    submitRegistration(data)
    expectRegistrationSucceeded()
  })
})
