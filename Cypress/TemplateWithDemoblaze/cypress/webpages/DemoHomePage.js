import "cypress-xpath/src/index";

export class DemoHomePage {
  // Elements
  //cookiesButton = () => cy.getId("onetrust-accept-btn-handler"); // Search by ID
  btnGalaxyS6 = () => cy.xpath("//a[text()='Samsung galaxy s6']"); // Search by XPATH
  btnSignup = () => cy.getId("signin2"); // Search by ID
  btnLogin = () => cy.getId("login2"); // Search by ID
  nameUserLoged = () => cy.getId("nameofuser"); // Search by ID

  // Methods
  // Start a function

  //acceptCookies() {
  //  this.cookiesButton().click().should("be.visible"); // Action click with an assert
  //}

  s6ProductPage() {
    this.btnGalaxyS6().click().should("be.visible"); // Action click with an assert
  }
  clickLogin() {
    this.btnLogin().click().should("be.visible"); // Action click with an assert
  }
  clickSignup() {
    this.btnSignup().click().should("be.visible"); // Action click with an assert
  }

  // Start a function with required args
  //loginEmail(pnr, email) {
  //  this.inputPNR().clear().type(pnr).should("have.value", pnr); // Clear the field, type something into it and assert the text inserted
  //  this.inputEmail().type(email).should("have.value", email); // Do the same as above, but without clearing the field
  //}
}
