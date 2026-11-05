// Source: test/test-cases/DomainTesting/Feature1/TC-REG-006.md
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
  it('[TC-REG-006] Từ chối đăng ký khi thiếu Mật khẩu', () => {
    const data = {
  "name": "Nguyễn Văn An",
  "email": "an.nguyen06@example.com",
  "password": ""
}

    submitRegistration(data)
    expectRegistrationRejected()
  })
})
