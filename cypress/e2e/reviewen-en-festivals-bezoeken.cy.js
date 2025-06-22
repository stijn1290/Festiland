describe('Reviewen en festivals bezoeken', () => {
    it('Een festival bezoeken via de festivals pagina', () => {
        cy.visit('http://localhost:5173');
        cy.get('#Dominator').get('#clickFestival').click();
    })
    it('Een review plaatsen onder een post van een festival', () => {
        //inloggen
        cy.visit('http://localhost:5173/Inloggen');
        cy.get('#emailLogin').type('test@gmail.com ');
        cy.get('#passwordLogin').type('120opiQS');
        cy.get('#submitLogin').click();
        //review plaatsen
        cy.visit('http://localhost:5173/Dominator/posts');
        cy.get('#post-sdssad').get('#star-3').click();
    })
})