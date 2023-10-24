import "cypress-xpath/src/index";

export class SelectFlightPage {
  fareBtn = () => cy.get(`.mat-button-type`);
  sepSpan = (day) => cy.xpath(`(//span[contains(text(), "SEP")])[${day}]`);
  daysWithFlights = () => cy.get(`.date-content:not(.no-flights)`);
  days = () => cy.get(`[class="date-box cdk-virtual-item ng-star-inserted"]`);
  body = () => cy.get(`*[class*="ui-mobile-viewport"]`);
  card = () => cy.get(`.mat-card.mat-focus-indicator`);
  alertBtn = () => cy.get(`[class="mat-focus-indicator common-button mat-flat-button mat-button-base mat-primary"]`);

  verificationPage(pathname) {
    cy.location("pathname", { timeout: 10000 }).should("eq", pathname);
  }

  selectDepartureFlight() {
    this.sepSpan(2).click();
    this.card().click();
    this.verificationPage("/SB/Index/Return");
    this.sepSpan(3).click();
    this.card().click();
  }
  verifyAlert() {
    this.alertBtn().should("be.visible");
    this.alertBtn().click();
  }
  selectFare(fare) {
    this.verificationPage("/SB/Index/PushTo");
    this.fareBtn().contains(fare).click();
  }
}
