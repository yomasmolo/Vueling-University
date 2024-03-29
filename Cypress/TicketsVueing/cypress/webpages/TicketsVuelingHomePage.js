/// <reference types='cypress-xpath' />

import "cypress-xpath/src/index";

export class TicketsVuelingHomePage {
  // Elements
  cookiesButton = () => cy.getId("onetrust-accept-btn-handler");
  inputOrigin = () => cy.get("input#AvailabilitySearchInputSearchView_TextBoxMarketOrigin1");
  inputDestination = () => cy.get("input#AvailabilitySearchInputSearchView_TextBoxMarketDestination1");
  options = (cityCode) => cy.get("[data-id-code=" + cityCode + "]");
  btnOW = () => cy.get(`[for="AvailabilitySearchInputSearchView_OneWay"]`);
  btnRT = () => cy.get(`[for="AvailabilitySearchInputSearchView_RoundTrip"]`);
  dayAvailable = () => cy.get("[data-handler='selectDay']");
  monthToLeft = () => cy.get("div.ui-datepicker-group-first span.ui-datepicker-month");
  btnNextMonth = () => cy.get("a[title='Siguiente']");
  listAdults = () => cy.get(`.adt_select_button#DropDownListPassengerType_ADT_PLUS`);
  listChilds = () => cy.get(`.column_4.buscador_pasajeros_childs`);
  selectPassengers = () => cy.getId("adtSelectorDropdown");
  selectInfants = () => cy.getId("AvailabilitySearchInputSearchView_DropDownListPassengerType_INFANT");
  btnSearchFlight = () => cy.getId("AvailabilitySearchInputSearchView_btnClickToSearchNormal");
  divSearcher = () => cy.getId("buscador");

  // Methods
  acceptCookies() {
    this.cookiesButton().click().should("be.visible");
  }

  chooseOWOption() {
    this.btnOW().click();
  }
  chooseRTOption() {
    this.btnRT().click();
  }

  chooseOriginDestination(cityCodeOrigin, cityCodeDestination) {
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
    this.dayAvailable().first().click({ force: true });
  }

  selectFirstDayAndLastDay(month) {
    this.monthToLeft().then((elemento) => {
      const texto = elemento.text();
      if (texto != month) {
        this.btnNextMonth().click();
        this.selectFirstDayAvailable(month);
      }
    });
    this.dayAvailable().first().click({ force: true });
    this.dayAvailable().eq(28).click({ force: true });
  }

  SelectPassengersAndSearch(passengers, infants) {
    this.listAdults().click();
    this.selectPassengers().select(passengers).should("have.value", passengers);
    this.listChilds().click();
    this.selectInfants().select(infants).should("have.value", infants);
    this.btnSearchFlight().click();
  }
}
