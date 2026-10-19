// Source: test/test-cases/DomainTesting/Feature1/TC-REG-004.md
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
  it('[TC-REG-004] Từ chối đăng ký với Email sai định dạng', () => {
    const data = {
  "name": "Nguyễn Văn An",
  "email": "user.example.com",
  "password": "Abcdef1@"
}

    submitRegistration(data)
    expectRegistrationRejected()
  })
})
