/// <reference types='cypress-xpath' />
import "cypress-xpath/src/index";
export class PassengersPage {
  //Elements
  firstpassengerName = (i) => cy.get(`#ContactViewControlGroupMainContact_BoxPassengerInformationView_TextBoxFirstName_${i}`);
  firstpassengerLastname = (i) => cy.get(`#ContactViewControlGroupMainContact_BoxPassengerInformationView_TextBoxLastName_${i}`);
  infantNameInput = (i) => cy.get(`#ContactViewControlGroupMainContact_BoxPassengerInformationView_TextBoxFirstName_${i}_${i}`);
  infantLastnameInput = (i) => cy.get(`#ContactViewControlGroupMainContact_BoxPassengerInformationView_TextBoxLastName_${i}_${i}`);
  infantBirthdate = (i) => cy.get(`[name="birthDate${i + 1}_${i + 1}"]`);
  readyBtn = (btnPosition) => cy.get(`[position="${btnPosition}"]`);
  selectCountry = () =>
    cy.get(`#ContactViewControlGroupMainContact_BoxPassengerInformationView_BoxContactInformationView_DropDownListCountry`);
  phoneInput = () => cy.get(`#ContactViewControlGroupMainContact_BoxPassengerInformationView_BoxContactInformationView_TextBoxHomePhone`);
  emailInput = () =>
    cy.get(`#ContactViewControlGroupMainContact_BoxPassengerInformationView_BoxContactInformationView_TextBoxEmailAddress`);
  checkboxPrivPol = () => cy.get(`#checkboxAcceptsPrivPolLabel`);
  submitBtn = () => cy.get(`#ContactViewControlGroupMainContact_BoxPassengerInformationView_LinkButtonSubmit`);
  // Methods
  fillForm(name, lastname, infantName, infantLastname, passengers, infants, country, email) {
    let btnPosition = 0;
    for (var i = 0; i < passengers; i++) {
      this.firstpassengerName(i).should("be.visible").type(name);
      this.firstpassengerLastname(i).should("be.visible").type(lastname);

      if (infants > 0) {
        this.infantNameInput(i).should("be.visible").type(infantName);
        this.infantLastnameInput(i).should("be.visible").type(infantLastname);
        this.infantBirthdate(i).should("be.visible").type("25/08/2022");
        infants--;
      }
      btnPosition++;
      this.readyBtn(btnPosition).should("be.visible").click();
    }
    this.selectCountry().should("be.visible");
    this.selectCountry().select(country);
    this.phoneInput().type("649292444");
    this.emailInput().type(email);
    this.checkboxPrivPol().should("be.visible").click();
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });
    this.submitBtn().should("be.visible").click();
  }
}
