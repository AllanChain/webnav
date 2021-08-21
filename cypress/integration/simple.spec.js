/// <reference types="Cypress" />
describe('Default view', () => {
  it('Looks fine without intercept', () => {
    cy.visit('/')
    cy.get('img[data-cy="website-icon"]:not([src*="fallback"])', {
      timeout: 10000
    }).should('have.length.above', 0)
  })
})
