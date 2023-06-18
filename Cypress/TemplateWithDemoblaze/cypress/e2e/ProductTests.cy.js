import { DemoHomePage } from "../webpages/DemoHomePage"; // Webpage Import
import { ProductPage } from "../webpages/ProductPage"; // Webpage Import
import { CartPage } from "../webpages/CartPage"; // Webpage Import

// The container of the tests (must contain the same name as the file)
describe("ProductTests", () => {
  // * let/const for all the tests

  const demoHomePage = new DemoHomePage(); // Object of the webpage
  const producPage = new ProductPage(); // Object of the webpage
  const cartPage = new CartPage(); // Object of the webpage

  // This will be executed only once before and for all the tests
  before(() => {});

  // This will be executed before the execution of every test
  beforeEach(() => {
    // Must be included to go to the specified URL
    cy.visit("/");
  });

  // Independent Test Case
  xit("TC01 - Add product to cart", () => {
    // use x to not execute
    // Path added to the base URL
    cy.visit("/index.html");
    demoHomePage.s6ProductPage();
    producPage.verificationPage();
    producPage.addProductToCart();
  });
  // Independent Test Case
  it(" TC02 - Add product to cart and Purchase", () => {
    // Path added to the base URL
    cy.visit("/index.html");
    demoHomePage.s6ProductPage();
    producPage.verificationPage();
    producPage.addProductToCart();
    cartPage.verificationPage();
    cartPage.placeOrderAndFillform();
  });

  // This will be executed only once after and for all the tests
  after(() => {});

  // This will be executed after the execution of every test
  afterEach(() => {
    // This will save a screenshot into the screenshots folder
    //cy.screenshot(`Screenshot_PNR_${pnr}`);
  });
});
