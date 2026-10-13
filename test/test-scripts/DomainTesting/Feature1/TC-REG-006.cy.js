// Source: test/test-cases/DomainTesting/Feature1/TC-REG-006.md
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
  webIt('[TC-REG-006] Từ chối đăng ký khi thiếu Mật khẩu', () => {
    const data = {
  "name": "Nguyễn Văn An",
  "email": "an.nguyen06@example.com",
  "password": ""
}

    submitRegistration(data)
    expectRegistrationRejected()
  })
})
