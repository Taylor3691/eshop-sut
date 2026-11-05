// Source: test/test-cases/DomainTesting/Feature1/TC-REG-001.md
// Requirement: FR-01
// Technique: Equivalence Partitioning

const {
  ensureRegistered,
  expectRegistrationRejected,
  expectRegistrationSucceeded,
  submitRegistration,
} = require('../../support/registration')


describe('Feature1 - Đăng ký tài khoản', () => {
  // Blocked when CYPRESS_WEB_BASE_URL is not supplied by the runner.
  it('[TC-REG-001] Đăng ký tài khoản thành công', () => {
    const data = {
  "name": "Nguyễn Văn An",
  "email": "an.nguyen01@example.com",
  "password": "Abcdef1@"
}

    cy.intercept('POST', '**/api/register').as('register')
    submitRegistration(data)
    expectRegistrationSucceeded()
  })
})
