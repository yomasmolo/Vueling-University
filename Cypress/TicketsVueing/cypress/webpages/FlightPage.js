/// <reference types='cypress-xpath' />
import "cypress-xpath/src/index";
export class FlightPage {
  //Elements
  chooseOutboundFlight = (companyType) => cy.get(`#outboundFlightCardsContainer [class^=vy-icon-${companyType}]`);
  chooseReturnFlight = (companyType) => cy.get(`#inboundFlightCardsContainer [class^=vy-icon-${companyType}]`);
  chooseFee = (fee) => cy.get(`#${fee}FareBox`);
  continueBtn = () => cy.get(`#stvContinueButton`);
  // Methods
  selectOutboundRandomFlight(companyType) {
    this.chooseOutboundFlight(companyType)
      .its("length")
      .then((length) => {
        cy.log(length);
        const random = Math.floor(Math.random() * length);
        cy.log(random);
        this.chooseOutboundFlight(companyType).eq(random).should("be.visible");
        this.chooseOutboundFlight(companyType).eq(random).click();
      });
  }
  selectReturnRandomFlight(companyType) {
    this.chooseReturnFlight(companyType)
      .its("length")
      .then((length) => {
        cy.log(length);
        const random = Math.floor(Math.random() * length);
        cy.log(random);
        this.chooseReturnFlight(companyType).eq(random).should("be.visible");
        this.chooseReturnFlight(companyType).eq(random).click();
      });
  }
  selectFee(fee) {
    this.chooseFee(fee).should("be.visible");
    this.chooseFee(fee).click();
    this.continueBtn().click();
  }
}
