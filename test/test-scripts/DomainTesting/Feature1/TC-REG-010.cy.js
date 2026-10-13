// Source: test/test-cases/DomainTesting/Feature1/TC-REG-010.md
// Requirement: FR-01
// Technique: Equivalence Partitioning

const {
  ensureRegistered,
  expectRegistrationRejected,
  expectRegistrationSucceeded,
  submitRegistration,
} = require('../../support/registration')

const hasWebBaseUrl = Boolean(Cypress.expose('WEB_BASE_URL'))
const webIt = hasWebBaseUrl ? it : it.skip

describe('Feature1 - Đăng ký tài khoản', () => {
  // Blocked when CYPRESS_WEB_BASE_URL is not supplied by the runner.
  webIt('[TC-REG-010] Từ chối mật khẩu thiếu chữ số', () => {
    const data = {
  "name": "Nguyễn Văn An",
  "email": "an.nguyen10@example.com",
  "password": "Abcdefg@"
}

    submitRegistration(data)
    expectRegistrationRejected()
  })
})
