// Source: test/test-cases/DomainTesting/Feature1/TC-REG-011.md
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
  it('[TC-REG-011] Từ chối mật khẩu thiếu ký tự đặc biệt yêu cầu', () => {
    const data = {
  "name": "Nguyễn Văn An",
  "email": "an.nguyen11@example.com",
  "password": "Abcdef12"
}

    submitRegistration(data)
    expectRegistrationRejected()
  })
})
