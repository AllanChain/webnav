import './commands'

Cypress.on('window:before:load', win => {
  win.indexedDB.deleteDatabase('BookmarkDB')
  Object.defineProperty(win.navigator, 'language', { value: 'en-US' })
  cy.spy(win.console, 'error')
  cy.spy(win.console, 'warn')
})

afterEach(() => {
  cy.window().then((win) => {
    expect(win.console.error).to.have.callCount(0)
    expect(win.console.warn).to.have.callCount(0)
  })
})
