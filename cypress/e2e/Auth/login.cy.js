import loginPage from "../../Pages/loginPage";

describe("Research Management System", () => {
  describe("Student Login UI Tests", () => {
    beforeEach(() => {
      loginPage.visit();
    });

    it("should display all required fields", () => {
      loginPage.elements.Lemail().should("be.visible");
      loginPage.elements.Lpassword().should("be.visible");
    });
  });

  describe("Student Login Functional Tests", () => {
    beforeEach(() => {
      loginPage.visit();
      cy.fixture("registrationData").as("data");
    });

    it("should login with valid data", function () {
      loginPage.loginForm(this.data.loginUser);
      loginPage.Login();
      cy.wait(5000); // Adjust based on your app's response time

      // Adjust based on your app behavior
      cy.title().should("include", "SLIIT Research Portal");

      // Log out after successful login
      cy.contains('button', 'Sign Out', { timeout: 15000 })
        .should('be.visible')
    });

    it("should show error for invalid email", function () {
      loginPage.loginForm(this.data.logininvalid);
      loginPage.Login();

      cy.contains("User does not exists. Please create an account !").should("be.visible");
    });
  });
});
