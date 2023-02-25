/// <reference types="Cypress" />
/// <reference types="cypress-file-upload" />

describe('App Basic Feature Test', () => {
  it('Functions well', () => {
    cy.intercept('*.ico', { fixture: 'favicon.png' }).as('ico')
    cy.visit('/', {
      onBeforeLoad (win) {
        // only delete once on test start
        win.indexedDB.deleteDatabase('BookmarkDB')
      }
    })

    // alert
    cy.contains('WebNav config initiated').should('be.visible')
    cy.contains('WebNav has added some bookmarks for you').should('be.visible')
    cy.get('.v-alert__close > button').first().click({ waitForAnimations: true })
    cy.get('.v-alert__close > button').first().click({ waitForAnimations: true })
    cy.get('div.v-alert.success').should('not.exist')

    cy.wait('@ico')

    // icon display
    cy.get('img[data-cy="website-icon"]').should('be.visible')
    cy.get('img[data-cy="website-icon"][src*="fallback"]', {
      timeout: 10000
    }).should('have.length', 0)

    // import new bookmarks so that we have consistant test set
    // open drawer and dialog
    cy.get('[data-cy="button-drawer"]').click()
    cy.get('nav.v-navigation-drawer').should('be.visible')
    cy.get('[data-cy="button-import"]').click()
    // check overwrite existing
    cy.get('[data-cy="switch-overwrite-bookmark"]').click()
    cy.get('[data-cy="switch-overwrite-bookmark"] input').should('be.checked')
    // finally upload
    cy.get('[data-cy="input-file-bookmark"]').attachFile('bookmarks.json')
    cy.get('[data-cy="import-check"').click()

    // edit mode
    cy.get('[data-cy="button-edit-mode"]').click()
    // every edit button is shown
    cy.get('[data-cy="edit-one"]').should('have.length', 3)
    cy.get('[data-cy="edit-one"]').first().click()
    // remove it
    cy.get('[data-cy="delete"]').click()
    // no button there after dialog
    cy.get('[data-cy="edit-one"]').should('have.length', 0)
    // it is removed
    cy.get('img[data-cy="website-icon"]').should('have.length', 2)

    // reorder apply
    cy.get('[data-cy="button-edit-mode"]').click()
    cy.get('[data-cy="edit-one"]').first().click()
    cy.get('[data-cy="reorder"]').click()
    cy.get('[data-cy="title"]')
      .first()
      .then(titleDiv => {
        const title = titleDiv.text()
        cy.get('div.v-slider-thumb')
          .first()
          .type('{rightarrow}', { force: true, waitForAnimations: true })
        cy.get('[data-cy="reorder-slider"] input').should('have.value', 1)
        cy.get('[data-cy="title"]').eq(1).should('have.text', title)
        cy.get('[data-cy=reorder-apply]').click()
        cy.get('[data-cy="title"]').eq(1).should('have.text', title)
      })

    // reorder cancel
    // this time, use the rightclick way
    cy.get('[data-cy="nav-item"]').first().rightclick()
    cy.get('[data-cy="nav-item-action-reorder"]').click()
    cy.get('[data-cy="title"]')
      .first()
      .then(titleDiv => {
        const title = titleDiv.text()
        cy.get('div.v-slider-thumb')
          .first()
          .type('{rightarrow}', { force: true, waitForAnimations: true })
        cy.get('[data-cy="reorder-cancel"]').click()
        cy.get('[data-cy="title"]').eq(0).should('have.text', title)
      })

    // edit bookmark
    // this time, use the rightclick way
    cy.get('[data-cy="nav-item"]').first().rightclick()
    cy.get('[data-cy="nav-item-action-edit"]').click()
    cy.get('[data-cy="title"]')
      .first()
      .then(titleDiv => {
        const title = titleDiv.text().trim()
        const newTitle = 'Permission Denied'
        cy.get('[data-cy=input-title] input').should('have.value', title)
        cy.get('.v-toolbar-title').should('contain', title)
        cy.get('[data-cy=input-title] input').type(`{selectall}${newTitle}`)
        cy.get('.v-toolbar-title').should('contain', newTitle)
        cy.get('[data-cy=done]').click()
        cy.get('[data-cy="title"]').first().should('contain', newTitle)
      })

    // clear bookmarks
    cy.get('[data-cy="button-drawer"]').click()
    cy.get('[data-cy="button-clear"]').click()
    cy.get('[data-cy="clear-confirm"]').click()
    // dialog closed
    cy.get('[data-cy="clear-confirm"]').should('not.exist')
    // drawer closed
    cy.get('[data-cy="button-clear"]').should('not.be.visible')
    // bookmarks gone
    cy.get('img[data-cy="website-icon"]').should('not.exist')

    // add new bookmark
    cy.get('[data-cy="button-drawer"]').click()
    cy.get('[data-cy="button-new-bookmark"]').click()
    cy.get('[data-cy="input-url"] input').type('{selectall}https://www.bing.com')
    cy.intercept('*/www.bing.com', { fixture: 'www.bing.com.json' }).as('bing')
    cy.get('[data-cy="info-grab"]').click()
    cy.wait('@bing')
    cy.get('[data-cy="input-title"] input').should('contain.value', 'Bing')
    cy.get('[data-cy="done"]').click()
    cy.get('[data-cy="title"]').last().should('contain', 'Bing')

    // searching
    cy.get('[data-cy="search-input"] input').type('github')
    cy.intercept('https://www.bing.com/search*', { fixture: 'bing.html' }).as('bing-search')
    cy.get('[data-cy="search-with-it"]').click()
    cy.origin('www.bing.com', () => {
      cy.location('href').should('contain', 'https://www.bing.com/search?q=github')
      cy.go('back')
    })

    // Chrome auto complete
    cy.get('[data-cy="search-input"] input').should('have.value', 'github')
    // bookmarks are same as before leaving
    cy.get('img[data-cy="website-icon"]').should('have.length', 1)
  })
})
