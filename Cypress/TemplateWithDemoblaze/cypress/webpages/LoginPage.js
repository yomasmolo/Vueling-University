import "cypress-xpath/src/index";

export class LoginPage {
  // ELEMENTS

  inputUserName = () => cy.getId("loginusername"); // Search by ID
  inputUserPassword = () => cy.getId("loginpassword"); // Search by ID
  btnLogin = () => cy.get("button[onclick='logIn()']"); // Search by CSS

  // FUNCTIONS
  fillLogInForm(name, pass) {
    this.inputUserName().clear().type(name, { force: true }).should("have.value", name); //Clear and input text with an assert
    this.inputUserPassword().clear().type(pass).should("have.value", pass); //Clear and input text with an assert
    this.btnLogin().click().should("be.visible");
  }
}
