// Source: test/test-cases/BVATesting/Feature1/TC-BVA-FR01-004.md
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
  it('[TC-BVA-FR01-004] Từ chối mật khẩu không có chữ hoa', () => {
    const data = {
  "name": "Nguyễn Văn An",
  "email": "bva004@example.com",
  "password": "abcdef12!@$%"
}

    submitRegistration(data)
    expectRegistrationRejected()
  })
})
