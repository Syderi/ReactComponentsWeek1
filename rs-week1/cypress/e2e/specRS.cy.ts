/// <reference types="cypress" />
// @ts-check

describe('My e2e Test', () => {
  // it('Does not do much!', () => {
  //   expect(true).to.equal(false);
  // });

  it('Visits http://localhost:3000/', () => {
    cy.visit('/');
  });
});
