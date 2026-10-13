// Source: test/test-cases/BVATesting/Feature1/TC-BVA-FR01-001.md
// Requirement: FR-01
// Technique: Boundary Value Analysis

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
  webIt('[TC-BVA-FR01-001] Từ chối mật khẩu dài 7 ký tự', () => {
    const data = {
  "name": "Nguyễn Văn An",
  "email": "bva001@example.com",
  "password": "ABcd1!@"
}

    submitRegistration(data)
    expectRegistrationRejected()
  })
})
