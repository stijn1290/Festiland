describe('Zoeken', () => {
  it('Zoeken naar een gebruiker', () => {
    cy.visit('http://localhost:5173/Inloggen');
    cy.get('#emailLogin').type('test@gmail.com ');
    cy.get('#passwordLogin').type('120opiQS');
    cy.get('#submitLogin').click();
    cy.url().should('include', '/');
    cy.visit('http://localhost:5173/users');
    cy.get('#userSearch').type('levi eeftink');
  })
})