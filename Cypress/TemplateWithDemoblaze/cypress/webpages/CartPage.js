import "cypress-xpath/src/index";

export class CartPage {
  btnPlaceOrder = () => cy.get(".btn-success"); // Search by CSS
  inputName = () => cy.getId("name"); // Search by ID
  inputCountry = () => cy.getId("country"); // Search by ID
  inputCity = () => cy.getId("city"); // Search by ID
  inputCard = () => cy.getId("card"); // Search by ID
  inputMonth = () => cy.getId("month"); // Search by ID
  inputYear = () => cy.getId("year"); // Search by ID
  btnPurchase = () => cy.get("[onclick='purchaseOrder()']"); // Search by CSS
  btnOk = () => cy.get(".confirm"); // Search by CSS

  placeOrderAndFillform() {
    // Using fixtures is considered as best practice.
    // Define scenarios in .json objects and use the data instead of hard-coding it
    this.btnPlaceOrder().click().should("be.visible");
    cy.fixture("placeOrderFormData").then((data) => {
      this.inputName().type(data.name);
      this.inputCountry().type(data.country);
      this.inputCity().type(data.city);
      this.inputCard().type(data.card);
      this.inputMonth().type(data.month);
      this.inputYear().type(data.year);
    });
    this.btnPurchase().click().should("be.visible"); // Action click with an assert
    this.btnOk().click().should("be.visible"); // Action click with an assert
  }
  verificationPage() {
    cy.location("pathname", { timeout: 10000 }).should("eq", "/cart.html"); // Assert with timeout
  }
}
