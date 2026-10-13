// Source: test/test-cases/DomainTesting/Feature7/TC-CART-002.md
// Requirement: FR-07
// Technique: Equivalence Partitioning

const hasWebBaseUrl = Boolean(Cypress.expose('WEB_BASE_URL'))
const webIt = hasWebBaseUrl ? it : it.skip

describe('Feature7 - Giỏ hàng', () => {
  // Blocked when CYPRESS_WEB_BASE_URL is not supplied by the runner.
  webIt('[TC-CART-002] Hiển thị trạng thái giỏ hàng trống', () => {
    const webBaseUrl = Cypress.expose('WEB_BASE_URL')
    cy.visit(`${webBaseUrl}/cart`)
    cy.contains(/giỏ.*trống/i).should('be.visible')
    cy.get('main img').should('be.visible')
  })
})
