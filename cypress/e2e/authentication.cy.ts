/// <reference types = "cypress" />

describe("User Authentication and Authorization", () => {
  it("Doesn't allow non-authenticated users to access the main content", () => {
    cy.visit("http://localhost:3000/dashboard");
    cy.wait(5000);
    cy.url().should("equal", "http://localhost:3000/dashboard");
    cy.get("#not-logged-in")
      .should("be.visible")
      .and("contain", "Not Logged In");
  });
});
