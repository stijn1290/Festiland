describe('Registreren en inloggen', () => {
  it('een account registreren in de database', () => {
    cy.visit('http://localhost:5173/Registreren');
    cy.get('#email').type('testing.user@example.com');
    cy.get('#name').type('testUser');
    cy.get('#password').type('120opiQS');
    cy.get('#privacy').check();
    cy.get('#submit').click();
  })
  it('Inloggen met bestaand account', () => {
    cy.visit('http://localhost:5173/Inloggen');
    cy.get('#emailLogin').type('test@gmail.com ');
    cy.get('#passwordLogin').type('120opiQS');
    cy.get('#submitLogin').click();
  })
})