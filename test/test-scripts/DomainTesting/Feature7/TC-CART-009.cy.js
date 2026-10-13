// Source: test/test-cases/DomainTesting/Feature7/TC-CART-009.md
// Requirement: FR-07
// Technique: Equivalence Partitioning

const hasWebBaseUrl = Boolean(Cypress.expose('WEB_BASE_URL'))
const webIt = hasWebBaseUrl ? it : it.skip

describe('Feature7 - Giỏ hàng', () => {
  // Blocked when CYPRESS_WEB_BASE_URL is not supplied by the runner.
  webIt('[TC-CART-009] Tiếp tục mua sắm về trang chủ', () => {
    const webBaseUrl = Cypress.expose('WEB_BASE_URL')
    cy.visit(`${webBaseUrl}/cart`)
    cy.contains('a', 'Tiếp tục mua sắm').click()
    cy.location('pathname').should('eq', '/')
  })
})
