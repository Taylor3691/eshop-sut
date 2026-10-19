// Source: test/test-cases/DomainTesting/Feature17/TC-COUPON-010.md
// Requirement: FR-17
// Technique: Equivalence Partitioning

const {
  cleanupCouponByCode,
  createCouponViaApi,
  ensureCoupon,
  expectCouponCreated,
  expectCouponRejectedByApi,
  expectCouponRejectedByBrowser,
  submitCouponViaUi,
} = require('../../support/coupon')

describe('Feature17 - Quản lý Mã Giảm Giá', () => {
  afterEach(() => {
    cy.env(['ADMIN_EMAIL', 'ADMIN_PASSWORD'], { log: false }).then(
      ({ ADMIN_EMAIL, ADMIN_PASSWORD }) => {
        if (ADMIN_EMAIL && ADMIN_PASSWORD) {
          cleanupCouponByCode("EP_MIN_EMPTY", { email: ADMIN_EMAIL, password: ADMIN_PASSWORD })
        }
      },
    )
  })

  // Blocked at runtime when CYPRESS_ADMIN_BASE_URL, CYPRESS_ADMIN_EMAIL, or CYPRESS_ADMIN_PASSWORD is missing.
  it('[TC-COUPON-010] Từ chối tạo mã khi thiếu min_order_amount', function () {
    cy.env(['ADMIN_EMAIL', 'ADMIN_PASSWORD'], { log: false }).then(
      ({ ADMIN_EMAIL, ADMIN_PASSWORD }) => {
        const adminBaseUrl = Cypress.expose('ADMIN_BASE_URL')
        if (!adminBaseUrl || !ADMIN_EMAIL || !ADMIN_PASSWORD) this.skip()
        const credentials = { email: ADMIN_EMAIL, password: ADMIN_PASSWORD }

        const data = {
      "code": "EP_MIN_EMPTY",
      "type": "fixed",
      "discount_value": "10",
      "expired_at": "2099-12-31",
      "max_uses_per_user": "2"
    }
    
        cleanupCouponByCode("EP_MIN_EMPTY", credentials)
        submitCouponViaUi(data, credentials)
        expectCouponRejectedByApi()
      },
    )
  })
})
