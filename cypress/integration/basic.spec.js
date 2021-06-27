describe('App Basic Feature Test', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('Looks fine', () => {
    cy.get('img[data-cy="website-icon"]:not([src*="fallback"])').should('have.length.above', 0)
  })
})
