/// <reference types="cypress" />

describe('My e2e Test', () => {
  it('Visits http://localhost:3000/', () => {
    cy.visit('/');
    cy.contains('About US').click();
    cy.contains('Form Page').click();
    cy.contains('Home Page').click();
  });

  it('form fills out correctly', () => {
    cy.visit('/form');
    cy.get('[type="submit"]').click();
    cy.get('[placeholder="name product: Phone..."]').type('Aphone TEST');
    cy.get('[placeholder="set a price"]').type('55555');
    cy.get('[data-testid="description-input"]').type('Description TEST');
    cy.get('[data-testid="date-input"]').type('2010-10-10');
    cy.get('[data-testid="rule-input"]').click();
    cy.get('[type="radio"]').last().check();
    cy.get('[data-testid="category-select-input"]').select('laptops');
    cy.get('input[type=file]').selectFile('src/assets/img/default.png', { force: true });
    cy.get('[type="submit"]').click();
  });
  it('open modal', () => {
    cy.visit('/');
    cy.contains('iPhone 9').click();
    cy.contains('Stock: 94');
    cy.get('[class="product-modal__close-btn"]').click();
  });
  it('search', () => {
    cy.visit('/');
    cy.get('[placeholder="Search..."]').type('30{enter}');
    cy.contains('About US').click();
    cy.contains('Form Page').click();
    cy.contains('Home Page').click();
    cy.get('[placeholder="Search..."]').should('have.value', '30');
  });
  it('error page', () => {
    cy.visit('/RS');
    cy.contains('Page not found 404');
  });
  it('Does not do much!', () => {
    cy.visit('/');
    expect(true).to.equal(true);
  });
});
