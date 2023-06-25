import { TicketsVuelingHomePage } from "../webpages/TicketsVuelingHomePage";
import { FlightPage } from "../webpages/FlightPage";
import { PassengersPage } from "../webpages/PassengersPage";

describe("TicketsVuelingTest", () => {
  const ticketsVuelingHomePage = new TicketsVuelingHomePage();
  const flightPage = new FlightPage();
  const passengersPage = new PassengersPage();
  /* const cityCodeOrigin = "BCN";
  const cityCodeDestination = "ATH";
  const month = "agosto";
  const passengers = "2";
  const infants = "1"; */
  let dataVueling = {};
  let firstNameRandom;
  let lastNameRandom;
  let emailRandom;
  let telephoneRandom;
  let infantName;
  let infantLastname;

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
    firstNameRandom = cy.getRandomFirstName();
    lastNameRandom = cy.getRandomLastName();
    infantName = cy.getRandomFirstName();
    infantLastname = cy.getRandomLastName();
    emailRandom = cy.generateRandomName() + "@mailinator.com";
    telephoneRandom = cy.getRandomNumber();
  });

  xit("TC0 - Choose Origin, destination and Day to go", () => {
    cy.log(dataVueling.cityCodeDestination);
    ticketsVuelingHomePage.chooseOWOption();
    ticketsVuelingHomePage.chooseOriginDestination(dataVueling.cityCodeOrigin, dataVueling.cityCodeDestination);
    ticketsVuelingHomePage.selectFirstDayAvailable(dataVueling.month);
    ticketsVuelingHomePage.divSearcher().screenshot(`Buscador de ${dataVueling.cityCodeOrigin + " a " + dataVueling.cityCodeDestination}`);
    ticketsVuelingHomePage.SelectPassengersAndSearch(dataVueling.passengers, dataVueling.infants);
  });

  xit("TC1 - Choose Origin, Destination and Days", () => {
    cy.log(dataVueling.cityCodeDestination);
    ticketsVuelingHomePage.chooseRTOption();
    ticketsVuelingHomePage.chooseOriginDestination(dataVueling.cityCodeOrigin, dataVueling.cityCodeDestination);
    ticketsVuelingHomePage.selectFirstDayAndLastDay(dataVueling.month);
    ticketsVuelingHomePage.divSearcher().screenshot(`Buscador de ${dataVueling.cityCodeOrigin + " a " + dataVueling.cityCodeDestination}`);
    ticketsVuelingHomePage.SelectPassengersAndSearch(dataVueling.passengers, dataVueling.infants);
  });
  it("TC2 - Booking Flight Choosing Origin, Destination and Days", () => {
    cy.log(dataVueling.cityCodeDestination);
    ticketsVuelingHomePage.chooseRTOption();
    ticketsVuelingHomePage.chooseOriginDestination(dataVueling.cityCodeOrigin, dataVueling.cityCodeDestination);
    ticketsVuelingHomePage.selectFirstDayAndLastDay(dataVueling.month);
    //ticketsVuelingHomePage.divSearcher().screenshot(`Buscador de ${dataVueling.cityCodeOrigin + " a " + dataVueling.cityCodeDestination}`);
    ticketsVuelingHomePage.SelectPassengersAndSearch(dataVueling.passengers, dataVueling.infants);
    flightPage.selectOutboundRandomFlight(dataVueling.companyType);
    flightPage.selectReturnRandomFlight(dataVueling.companyType);
    flightPage.selectFee(dataVueling.fee);
    passengersPage.fillForm(
      firstNameRandom,
      lastNameRandom,
      infantName,
      infantLastname,
      dataVueling.passengers,
      dataVueling.infants,
      dataVueling.country,
      emailRandom
    );
  });

  after(() => {});

  afterEach(() => {
    //cy.screenshot(`Final_Screenshot_`);
    //cy.addContext("Screenshot taken. You can see it in ./cypress/screenshots");
  });
});
