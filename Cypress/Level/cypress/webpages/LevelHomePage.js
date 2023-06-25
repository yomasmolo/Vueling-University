import "cypress-xpath/src/index";

export class LevelHomePage {
  btnCookies = () => cy.get("#ensCloseBanner");
  searcher = {
    searcherContainer: () => cy.getId("searcher-block"),
    travelType: () => cy.get('[data-target="dropdown-trip"]'),
    travelTypeOW: () => cy.getId("dropdown-trip"),
    origin: () => cy.get('[data-field="origin"]'),
    originList: () => cy.get(".origin .group-info:not(.hidden)"),
    destination: () => cy.get('[data-field="destination"]'),
    destinationList: () => cy.get(".destination .group-info:not(.hidden)"),
    departureDate: () => cy.get(".departure-date .input-value"),
    paxDropdown: () => cy.get(".searcher-passengers"),
    btnSubmit: () => cy.get("#searcher_submit_buttons"),
  };
  datepicker = {
    switchTripToOW: () => cy.get('.switch-position [value="RT"]'),
    switchTripToRT: () => cy.get('.switch-position [value="OW"]'),
    months: () => cy.get("span.month"),
    arrowNextMonth: () => cy.get("button.datepicker__next-action"),
    availableDays: () => cy.get(".is-available:not(.is-previous-month)"),
  };

  countPassengers = {
    adultNumber: () => cy.get("[data-field='adult'] .pax-count"),
    btnAdultPlus: () => cy.get("[data-field='adult'] .js-plus"),
    childNumber: () => cy.get("[data-field='child'] .pax-count"),
    btnChildPlus: () => cy.get("[data-field='child'] .js-plus"),
    infantNumber: () => cy.get("[data-field='infant'] .pax-count"),
    btnInfantPlus: () => cy.get("[data-field='infant'] .js-plus"),
    btnSubmit: () => cy.get("button.btn-pax"),
  };

  acceptCookies() {
    this.btnCookies().should("be.visible");
    this.btnCookies().click();
  }
  fillOriginAndDestination(origin, destination) {
    this.searcher.origin().type(origin);
    this.searcher.originList().first().should("be.visible");
    this.searcher.originList().first().click();

    this.searcher.destination().type(destination);
    this.searcher.destinationList().first().should("be.visible");
    this.searcher.destinationList().first().click();
  }
  switchTripToOW() {
    this.datepicker.switchTripToOW().click();
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });
  }

  selectMonthInCalendar(month) {
    this.datepicker.months().should("be.visible");
    this.datepicker
      .months()
      .invoke("text")
      .then((monthName) => {
        Cypress.on("uncaught:exception", (err, runnable) => {
          return false;
        });

        if (monthName !== month) {
          this.datepicker.arrowNextMonth().click();
          return this.selectMonthInCalendar(month);
        }

        cy.scrollTo("top");
      });
  }

  selectFirstDayAvailable() {
    this.datepicker.availableDays().first().click();
  }

  selectPassengers(adults, childs, infants) {
    this.countPassengers.adultNumber().then((elemento) => {
      const adultNumber = elemento.text();
      if (adults !== adultNumber) {
        this.countPassengers.btnAdultPlus().click();
        this.selectPassengers(adults, childs, infants);
      }
    });
    this.countPassengers.childNumber().then((elemento) => {
      const childNumber = elemento.text();
      if (childs !== childNumber) {
        this.countPassengers.btnChildPlus().click();
        this.selectPassengers(adults, childs, infants);
      }
    });
    this.countPassengers.infantNumber().then((elemento) => {
      const infantNumber = elemento.text();
      if (infants !== infantNumber) {
        this.countPassengers.btnInfantPlus().click();
        this.selectPassengers(adults, childs, infants);
      }
    });
  }
  submitPassengersAndSearch() {
    this.countPassengers.btnSubmit().should("be.visible");
    this.countPassengers.btnSubmit().click();
    this.searcher.btnSubmit().should("be.visible");
    this.searcher.btnSubmit().click();
  }
}
