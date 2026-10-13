// Source: test/test-cases/DomainTesting/Feature1/TC-REG-007.md
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
  webIt('[TC-REG-007] Từ chối mật khẩu ngắn hơn 8 ký tự', () => {
    const data = {
  "name": "Nguyễn Văn An",
  "email": "an.nguyen07@example.com",
  "password": "Aa1@abc"
}

    submitRegistration(data)
    expectRegistrationRejected()
  })
})
