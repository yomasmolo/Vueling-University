import "cypress-xpath/src/index";

export class HomePage {
  cookiesBtn = () => cy.getId(`onetrust-accept-btn-handler`);
  body = () => cy.get(`.ui-mobile-viewport`);
  closeImg = () => cy.get(`.promo-splash_close`);
  searcher = {
    searcherContainer: () => cy.get(`.seacher-container.ng-star-inserted`),
    btnOneWay: () => cy.get(`.mat-ripple.mat-tab-label`).first(),
    btnRoundTrip: () => cy.get(`.mat-ripple.mat-tab-label`).last(),
    selectOrigin: () => cy.get(`[data-testid="stationDeparture"]`),
    selectDestination: () => cy.get(`[data-testid="stationArrival"]`),
    inputSearchCity: () => cy.get(`.ng-pristine .sticky-container__searcher-container__searcher`),
    selectCity: () => cy.get(`.station-data__name-country__name-connection__name`),
    calendar: () => cy.get(`[data-testid="departureDate"]`),
    searchBtn: () => cy.get(`.mat-focus-indicator.common-button`),
  };
  datepicker = {
    daysAvl: () => cy.get(`.mbsc-cal-slide-a [data-full].mbsc-btn-e:not(.vy-date-disabled)`),
    firstDayMonth: () => cy.get(`.mbsc-cal-slide-a [data-full].mbsc-cal-cell.mbsc-cal-day.mbsc-btn-e`),
    arrowNextMonth: () => cy.get(`[aria-label="Next Month"]`),
    continueBtn: () => cy.get(`.mat-focus-indicator.common-button`),
  };

  countPassengers = {
    paxBtn: () => cy.get(`[data-testid="paxSelectorDisplay"]`),
    number: () => cy.get(`[class="container-general__passenger-container__controls-amount__amount"]`),
    btnAdultPlus: () => cy.getId(`addIconAdult`),
    btnChildPlus: () => cy.getId(`addIconChild`),
    btnInfantPlus: () => cy.getId(`addIconInf`),
    submitPaxBtn: () => cy.get(`.mat-focus-indicator.common-button`),
  };

  acceptCookies() {
    this.cookiesBtn().click().should("be.visible");
  }
  closePromo() {
    this.body().then((body) => {
      if (body.find('[class="splash-dialog"]').length > 0) {
        this.closeImg().click();
      }
    });
  }
  verificationPage(pathname) {
    cy.location("pathname").should("eq", pathname);
  }
  selectCalendarOW() {
    this.searcher.btnOneWay().scrollIntoView().should("be.visible");
    this.searcher.btnOneWay().scrollIntoView().click();
  }
  selectCalendarRT() {
    this.searcher.btnRoundTrip().scrollIntoView().should("be.visible");
    this.searcher.btnRoundTrip().scrollIntoView().click();
  }

  selectRoute(orig, dest) {
    this.searcher.selectOrigin().click();
    this.verificationPage("/StationsModular/Departure");
    this.searcher.inputSearchCity().type(orig);
    this.searcher.selectCity().contains(orig).click();
    this.verificationPage("/StationsModular/Arrival");
    this.searcher.inputSearchCity().type(dest);
    this.searcher.selectCity().contains(dest).click();
  }

  changeMonth(monthNum) {
    this.datepicker
      .firstDayMonth()
      .first()
      .invoke("attr", "data-full")
      .then(($attr) => {
        let date = new Date($attr);
        let month = date.getMonth() + 1;
        cy.log(month);
        cy.log(monthNum);
        this.datepicker.firstDayMonth().should("be.visible");
        if (month < monthNum) {
          this.datepicker.arrowNextMonth().click();
          cy.wait(500); // Hay que saltar una animación de calendario
          this.changeMonth(monthNum);
        }
      });
  }

  selectLastDayAvailable(monthNum) {
    this.verificationPage("/Home/Calendar");
    this.changeMonth(monthNum);
    this.datepicker.daysAvl().last().click();
  }
  selectReturnDate() {
    this.datepicker.arrowNextMonth().click();
    this.datepicker.daysAvl().first().click();
    this.datepicker.continueBtn().click();
  }

  selectPassengers(adults, childs, infants) {
    this.countPassengers
      .number()
      .first()
      .then((elemento) => {
        const adultNumber = elemento.text();
        if (adults !== adultNumber) {
          this.countPassengers.btnAdultPlus().click();
          this.selectPassengers(adults, childs, infants);
        }
      });
    this.countPassengers
      .number()
      .eq(1)
      .then((elemento) => {
        const childNumber = elemento.text();
        if (childs !== childNumber) {
          this.countPassengers.btnChildPlus().click();
          this.selectPassengers(adults, childs, infants);
        }
      });
    this.countPassengers
      .number()
      .last()
      .then((elemento) => {
        const infantNumber = elemento.text();
        if (infants !== infantNumber) {
          this.countPassengers.btnInfantPlus().click();
          this.selectPassengers(adults, childs, infants);
        }
      });
  }
}
