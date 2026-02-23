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
      
      cy.intercept("POST", "http://localhost:8070/api/auth/login").as("loginRequest");

      loginPage.loginForm(this.data.loginUser);
      loginPage.Login();

      cy.wait("@loginRequest", { timeout: 30000 }).its("response.statusCode").should("eq", 200);

      cy.url({ timeout: 30000 }).should("include", "/v3/student-dashboard/Test");

      // cy.contains('button', 'Sign Out', { timeout: 30000 }).should(
      //   "be.visible",
      // );
    });

    it("should show error for invalid email", function () {
      loginPage.loginForm(this.data.logininvalid);
      loginPage.Login();

      cy.contains("User does not exists. Please create an account !").should(
        "be.visible",
      );
    });
  });
});
