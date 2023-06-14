import { TicketsVuelingHomePage } from "../webpages/TicketsVuelingHomePage";

describe("TicketsVuelingTest", () => {

  const ticketsVuelingHomePage = new TicketsVuelingHomePage();
  const cityCodeOrigin = "BCN";
  const cityCodeDestination = "ATH";
  const month = "agosto";
  const passengers = "2";
  const infants = "1";

  before(() => {});


  beforeEach(() => {
    cy.visit("/");
    ticketsVuelingHomePage.acceptCookies();
  });

  it("Choose Origin and Day", () => {
    ticketsVuelingHomePage.chooseOWOption();
    ticketsVuelingHomePage.chooseOrigin(cityCodeOrigin, cityCodeDestination);
    ticketsVuelingHomePage.selectFirstDayAvailable(month);
    ticketsVuelingHomePage.SelectPassengersAndSearch(passengers, infants);
  });



  after(() => {});

  afterEach(() => {
    //cy.screenshot(`Screenshot_PNR_${pnr}`);
  });
});
