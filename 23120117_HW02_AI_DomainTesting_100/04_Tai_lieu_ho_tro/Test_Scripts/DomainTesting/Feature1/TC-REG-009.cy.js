// Source: test/test-cases/DomainTesting/Feature1/TC-REG-009.md
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
  it('[TC-REG-009] Từ chối mật khẩu thiếu chữ thường', () => {
    const data = {
  "name": "Nguyễn Văn An",
  "email": "an.nguyen09@example.com",
  "password": "ABCDEF1@"
}

    submitRegistration(data)
    expectRegistrationRejected()
  })
})
