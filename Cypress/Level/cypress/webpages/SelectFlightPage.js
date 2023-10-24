import "cypress-xpath/src/index";

export class SelectFlightPage {
  fareBtn = () => cy.get(`.mat-button-type`);

  verificationPage(pathname) {
    cy.location("pathname").should("eq", pathname);
  }

  selectFare(fare) {
    this.fareBtn().contains(fare).click();
  }
}
