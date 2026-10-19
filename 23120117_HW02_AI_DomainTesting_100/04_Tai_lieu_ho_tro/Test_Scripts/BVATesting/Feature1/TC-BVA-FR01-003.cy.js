// Source: test/test-cases/BVATesting/Feature1/TC-BVA-FR01-003.md
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
  it('[TC-BVA-FR01-003] Đăng ký thành công với mật khẩu dài 9 ký tự', () => {
    const data = {
  "name": "Nguyễn Văn An",
  "email": "bva003@example.com",
  "password": "ABcde12!@"
}

    cy.intercept('POST', '**/api/register').as('register')
    submitRegistration(data)
    expectRegistrationSucceeded()
  })
})
