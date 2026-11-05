// Source: test/test-cases/BVATesting/Feature7/TC-BVA-FR07-001.md
// Requirement: FR-07
// Technique: Boundary Value Analysis


describe('Feature7 - Giỏ hàng', () => {
  // Blocked when CYPRESS_WEB_BASE_URL is not supplied by the runner.
  it('[TC-BVA-FR07-001] Hiển thị giỏ hàng trống tại biên 0 dòng', () => {
    const webBaseUrl = Cypress.expose('WEB_BASE_URL')
    cy.visit(`${webBaseUrl}/cart`)
    cy.contains(/giỏ.*trống/i).should('be.visible')
    cy.get('main img').should('be.visible')
  })
})
