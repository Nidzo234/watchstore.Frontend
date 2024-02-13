describe('template spec', () => {
  it('visit the home page', () => {
    cy.visit('http://localhost:3000/')
    cy.get('[data-testid="cypress-title"]').should('exist')
    .should('have.text', "Сите продукти")
  });


  it('render the products', ()=>{
    cy.visit('http://localhost:3000/')
    cy.get('[data-testid="cypress-productCard"]').should('exist')
  });

  it('should register a new user and then login', () => {
    cy.visit('http://localhost:3000/register');


    cy.get('[data-testid="cypress-password"]').should('exist')
    cy.get('[data-testid="username"]').type('newuser');
    cy.get('[data-testid="email"]').type('newuser@example.com');
    cy.get('[data-testid="cypress-password"]').type('password123');
    cy.get('button[type="submit"]').click();


    cy.url().should('include', '/login');


    cy.visit('http://localhost:3000/login');


    cy.get('[data-testid="cypress-email"]').type('newuser@example.com');
    cy.get('[data-testid="cypress-password"]').type('password123');
    cy.get('button[type="submit"]').click();

    // Check if login was successful
    cy.url().should('include', '/');
    cy.contains('Сите продукти').should('exist');


    cy.visit('http://localhost:3000/shoppingCartProducts');
    cy.wait(2000); 
    let initialCartValue = -1;
    cy.get('[data-testid="cypress-totalPrice"]').invoke('text').then(text => {
      initialCartValue = parseFloat(text);
    });


    cy.visit('http://localhost:3000');

    cy.get('[data-testid="cypress-details-button"]').first().click();
    cy.url().should('include','http://localhost:3000/product/')
    let productValue = 0;
    cy.wait(500); 
    cy.get('[data-testid="cypress-productPrice"]').should('exist').invoke('text').then(text => {
      initialCartValue = parseFloat(text);
    });
    cy.get('[data-testid="cypress-addButton"]').click();
    cy.get('[data-testid="cypress-modalbutton"]').click();

    let updatedCartValue = 0;
    cy.wait(2000); 
    cy.get('[data-testid="cypress-totalPrice"]').should('exist').invoke('text').then(text => {
      updatedCartValue = parseFloat(text);
    });
    expect(updatedCartValue).to.be.greaterThan(initialCartValue);
    expect(updatedCartValue).to.be.equal(productValue);
    initialCartValue = updatedCartValue;
    cy.get('[data-testid="cypress-delete"]').first().click();
    cy.wait(2000); 
    cy.get('[data-testid="cypress-totalPrice"]').should('exist').invoke('text').then(text => {
      updatedCartValue = parseFloat(text);
    });


  });






})