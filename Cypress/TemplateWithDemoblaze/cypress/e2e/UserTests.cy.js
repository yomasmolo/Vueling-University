import { DemoHomePage } from "../webpages/DemoHomePage"; // Webpage Import
import { SignupPage } from "../webpages/SignupPage"; // Webpage Import
import { LoginPage } from "../webpages/LoginPage"; // Webpage Import

// The container of the tests (must contain the same name as the file)
describe("UserTests", () => {
  // * let/const for all the tests

  const demoHomePage = new DemoHomePage(); // Object of the webpage
  const signupPage = new SignupPage(); // Object of the webpage
  const loginPage = new LoginPage(); // Object of the webpage
  let newUserName = cy.getRandomString(8);
  let newUserPass = cy.getRandomString(8);
  const name = "marcvueling";
  const pass = "marcvueling";

  // This will be executed only once before and for all the tests
  before(() => {});

  // This will be executed before the execution of every test
  beforeEach(() => {
    cy.visit("/"); // Must be included to go to the specified URL
  });

  it("TC01 - User sign up", () => {
    demoHomePage.clickSignup();
    signupPage.fillFormSignup(newUserName, newUserPass);
  });

  it("TC02 - User login and check if is loged", () => {
    demoHomePage.clickLogin();
    loginPage.fillLogInForm(name, pass);
    demoHomePage.nameUserLoged().should("have.text", "Welcome " + name);
  });

  // This will be executed only once after and for all the tests
  after(() => {});

  // This will be executed after the execution of every test
  afterEach(() => {
    cy.log("Fin Test Case"); // Message after each test
    // This will save a screenshot into the screenshots folder
    //cy.screenshot(`Screenshot_PNR_${pnr}`);
  });
});
