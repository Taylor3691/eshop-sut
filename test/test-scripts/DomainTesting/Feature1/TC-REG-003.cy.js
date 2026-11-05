// Source: test/test-cases/DomainTesting/Feature1/TC-REG-003.md
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
  it('[TC-REG-003] Từ chối đăng ký khi thiếu Email', () => {
    const data = {
  "name": "Nguyễn Văn An",
  "email": "",
  "password": "Abcdef1@"
}

    submitRegistration(data)
    expectRegistrationRejected()
  })
})
