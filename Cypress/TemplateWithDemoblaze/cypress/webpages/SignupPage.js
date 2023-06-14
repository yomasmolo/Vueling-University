/// <reference types='cypress-xpath' />

import "cypress-xpath/src/index";

export class SignupPage {
  // ELEMENTS

  inputName = () => cy.getId("sign-username"); // Search by ID
  inputPassword = () => cy.getId("sign-password"); // Search by ID
  btnSignup = () => cy.get("button[onclick='register()']"); // Search by CSS

  // FUNCTIONS
  fillFormSignup(name, pass) {
    this.inputName().clear().type(name, { force: true }).should("have.value", name); //Clear and force input text with an assert
    this.inputPassword().clear().type(pass).should("have.value", pass); //Clear and input text with an assert
    this.btnSignup().click();
  }
}
