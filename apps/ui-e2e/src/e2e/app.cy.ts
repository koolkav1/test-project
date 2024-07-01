import { getGreeting } from '../support/app.po';

describe('ui-e2e', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {

   cy.get('h1').should('contain', 'Welcome to City Finder');
  });
  it('should be able to navigate to search-cities page', () => {
    cy.get('.search-link').click();
    cy.wait(100);
    cy.get('h1').should('contain', 'Search for Your Favourite City');
  });

  it('should be able to search for cities', () => {
    cy.visit('/search-cities');
    cy.wait(1000);
    cy.get('input').click().type('l').wait(10).type('e').wait(10);
    cy.get('.suggestions-list-item').should('be.visible');
  });
});
