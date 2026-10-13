// Source: test/test-cases/DomainTesting/Feature1/TC-REG-005.md
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
  webIt('[TC-REG-005] Từ chối đăng ký với Email đã tồn tại', () => {
    const data = {
  "name": "Nguyễn Văn An",
  "email": "existing.user@example.com",
  "password": "Abcdef1@"
}

    ensureRegistered(data)
    submitRegistration(data)
    expectRegistrationRejected()
  })
})
