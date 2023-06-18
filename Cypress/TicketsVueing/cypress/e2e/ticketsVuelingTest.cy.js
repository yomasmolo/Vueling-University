import { TicketsVuelingHomePage } from "../webpages/TicketsVuelingHomePage";

describe("TicketsVuelingTest", () => {
  const ticketsVuelingHomePage = new TicketsVuelingHomePage();
  /* const cityCodeOrigin = "BCN";
  const cityCodeDestination = "ATH";
  const month = "agosto";
  const passengers = "2";
  const infants = "1"; */
  let dataVueling = {};

  before(() => {
    cy.fixture("dataVueling").then((data) => {
      dataVueling = data;
      /* dataVueling = {
        citycodeOrigin: data.cityCodeOrigin,
        cityCodeDestination: data.cityCodeDestination,
        month: data.month,
        passengers: data.passengers,
        infants: data.infants,
      }; */
    });
  });

  beforeEach(() => {
    cy.visit("/");
    ticketsVuelingHomePage.acceptCookies();
  });

  xit("TC0 - Choose Origin, destination and Day to go", () => {
    cy.log(dataVueling.cityCodeDestination);
    ticketsVuelingHomePage.chooseOWOption();
    ticketsVuelingHomePage.chooseOriginDestination(dataVueling.cityCodeOrigin, dataVueling.cityCodeDestination);
    ticketsVuelingHomePage.selectFirstDayAvailable(dataVueling.month);
    ticketsVuelingHomePage.divSearcher().screenshot(`Buscador de ${dataVueling.cityCodeOrigin + " a " + dataVueling.cityCodeDestination}`);
    ticketsVuelingHomePage.SelectPassengersAndSearch(dataVueling.passengers, dataVueling.infants);
  });

  it("TC1 - Choose Origin, Destination and Days", () => {
    cy.log(dataVueling.cityCodeDestination);
    ticketsVuelingHomePage.chooseRTOption();
    ticketsVuelingHomePage.chooseOriginDestination(dataVueling.cityCodeOrigin, dataVueling.cityCodeDestination);
    ticketsVuelingHomePage.selectFirstDayAndLastDay(dataVueling.month);
    ticketsVuelingHomePage.divSearcher().screenshot(`Buscador de ${dataVueling.cityCodeOrigin + " a " + dataVueling.cityCodeDestination}`);
    ticketsVuelingHomePage.SelectPassengersAndSearch(dataVueling.passengers, dataVueling.infants);
  });

  after(() => {});

  afterEach(() => {
    cy.screenshot(`Final_Screenshot_`);
    cy.addContext("Screenshot taken. You can see it in ./cypress/screenshots");
  });
});
