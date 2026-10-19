// Source: test/test-cases/DomainTesting/Feature17/TC-COUPON-002.md
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
          cleanupCouponByCode("EP_FIXED_NEW", { email: ADMIN_EMAIL, password: ADMIN_PASSWORD })
        }
      },
    )
  })

  // Blocked at runtime when CYPRESS_ADMIN_BASE_URL, CYPRESS_ADMIN_EMAIL, or CYPRESS_ADMIN_PASSWORD is missing.
  it('[TC-COUPON-002] Tạo mã giảm giá loại fixed', function () {
    cy.env(['ADMIN_EMAIL', 'ADMIN_PASSWORD'], { log: false }).then(
      ({ ADMIN_EMAIL, ADMIN_PASSWORD }) => {
        const adminBaseUrl = Cypress.expose('ADMIN_BASE_URL')
        if (!adminBaseUrl || !ADMIN_EMAIL || !ADMIN_PASSWORD) this.skip()
        const credentials = { email: ADMIN_EMAIL, password: ADMIN_PASSWORD }

        const data = {
      "code": "EP_FIXED_NEW",
      "type": "fixed",
      "discount_value": "50000",
      "expired_at": "2027-12-31",
      "min_order_amount": "100000",
      "max_uses_per_user": "2"
    }
    
        cleanupCouponByCode("EP_FIXED_NEW", credentials)
        submitCouponViaUi(data, credentials)
        expectCouponCreated(data.code, "Cố định")
      },
    )
  })
})
