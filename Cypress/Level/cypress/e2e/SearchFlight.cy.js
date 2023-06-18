import { LevelHomePage } from "../webpages/LevelHomePage";

describe("Search Flight with flyLevel", () => {
  const levelHomePage = new LevelHomePage();
  const origin = "BCN";
  const destination = "EZE";
  let data;
  before(() => {
    cy.fixture("flightData").then((jsonData) => {
      data = jsonData;
    });
  });

  beforeEach(() => {
    cy.visit("", {
      headers: {
        accept: "/",
        "user-agent": "axios/0.27.2",
      },
    });
    levelHomePage.acceptCookies();
  });

  it("TC01 - OW BCN-EZE 2ADT 1INF", () => {
    levelHomePage.fillOriginAndDestination(data.origin, data.destination);
    levelHomePage.searcher.searcherContainer().screenshot("SS_AFTER_FLIGHT_SELECTION");
    levelHomePage.switchTripToOW();
    levelHomePage.selectMonthInCalendar(data.month);
    levelHomePage.selectFirstDayAvailable();
    levelHomePage.searcher.paxDropdown().click();
    levelHomePage.selectPassengers(data.adults, data.childs, data.infants);
    levelHomePage.searcher.searcherContainer().screenshot("SS_AFTER_PASSENGERS");
    levelHomePage.submitPassengersAndSearch();
  });

  after(() => {
    cy.screenshot("SS_TEST_FINISHED");
  });

  afterEach(() => {
    cy.log("Fin Test Case");
  });
});
