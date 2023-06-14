/// <reference types='cypress-xpath' />

import "cypress-xpath/src/index";

export class TicketsVuelingHomePage {
  // Elements
  cookiesButton = () => cy.getId("onetrust-accept-btn-handler");
  inputOrigin = () => cy.get("input#AvailabilitySearchInputSearchView_TextBoxMarketOrigin1");
  inputDestination = () => cy.get("input#AvailabilitySearchInputSearchView_TextBoxMarketDestination1");
  options = (cityCode) => cy.get("a[data-id-code="+cityCode+"]");
  btnOW = () => cy.get("label[for=AvailabilitySearchInputSearchView_OneWay]");
  dayAvailable = () => cy.xpath("(//td[@data-handler='selectDay'])[1]");
  monthToLeft = () => cy.xpath("//div[@class='ui-datepicker-group ui-datepicker-group-first']//span[@class='ui-datepicker-month']");
  btnNextMonth = () => cy.get("a[title='Siguiente']");
  selectPassengers = () => cy.getId("adtSelectorDropdown");
  selectInfants = () => cy.getId("AvailabilitySearchInputSearchView_DropDownListPassengerType_INFANT");
  btnSearchFlight = () => cy.getId("AvailabilitySearchInputSearchView_btnClickToSearchNormal");
  
  // Methods
  acceptCookies() {
    this.cookiesButton().click().should("be.visible");
  }

  chooseOWOption() {
    this.btnOW().click();
  }

  chooseOrigin(cityCodeOrigin, cityCodeDestination) {
    this.inputOrigin().click().should("be.visible"); // Action click with an assert
    this.inputOrigin().clear().type(cityCodeOrigin).should("have.value", cityCodeOrigin);
    this.options(cityCodeOrigin).click();

    this.inputDestination().clear().type(cityCodeDestination).should("have.value", cityCodeDestination);
    this.options(cityCodeDestination).click();
  }

  selectFirstDayAvailable(month) {
    this.monthToLeft().then((elemento) => {
      const texto = elemento.text();
      if (texto != month) {
        this.btnNextMonth().click();
        this.selectFirstDayAvailable(month);
      }
    });
    this.dayAvailable().click({force: true});
  }

  SelectPassengersAndSearch(passengers, infants) {
    this.selectPassengers().select(passengers, { force: true }).should('have.value', passengers);
    this.selectInfants().select(infants, { force: true }).should('have.value', infants);
    this.btnSearchFlight().click();
  }

}
