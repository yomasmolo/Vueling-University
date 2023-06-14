/// <reference types='cypress-xpath' />

import "cypress-xpath/src/index";

export class ProductPage {
  btnAddCart = () => cy.get(".btn-success"); // Search by CSS
  btnCart = () => cy.getId("cartur"); // Search by ID

  addProductToCart() {
    this.btnAddCart().click().should("be.visible"); // Action click with an assert
    this.btnCart().click().should("be.visible"); // Action click with an assert
  }
  verificationPage() {
    cy.location("pathname", { timeout: 10000 }).should("eq", "/prod.html"); // Assert with timeout
  }
}
