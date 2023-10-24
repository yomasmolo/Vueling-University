import { HomePage } from "../webpages/HomePage";
import { SelectFlightPage } from "../webpages/SelectFlightPage";

describe("Search Flight with mobile.vueling", () => {
  const homePage = new HomePage();
  const selectFlightPage = new SelectFlightPage();
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
    homePage.acceptCookies();
    homePage.closePromo();
  });

  it("TC01 - RT BCN-BEY 2ADT 1INF", () => {
    homePage.selectCalendarRT();
    homePage.selectRoute(data.origin, data.destination);
    homePage.countPassengers.paxBtn().click();
    homePage.verificationPage("/PassengerSelector");
    homePage.selectPassengers(data.adults, data.childs, data.infants);
    homePage.countPassengers.submitPaxBtn().click();
    homePage.searcher.calendar().click();
    homePage.selectLastDayAvailable(data.month);
    homePage.selectReturnDate();
    homePage.searcher.searchBtn().scrollIntoView().click();
    selectFlightPage.verificationPage("/SB");
    selectFlightPage.selectDepartureFlight();
    selectFlightPage.verifyAlert();
    //levelHomePage.searcher.searcherContainer().screenshot("SS_AFTER_FLIGHT_SELECTION");
  });

  after(() => {
    //cy.screenshot("SS_TEST_FINISHED");
  });

  afterEach(() => {
    cy.log("Fin Test Case");
  });
});
