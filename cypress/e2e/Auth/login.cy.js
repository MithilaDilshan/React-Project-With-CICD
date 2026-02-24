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
      cy.log("Starting login test with valid credentials");

      // Set up intercept
      cy.intercept("POST", "http://localhost:8070/api/auth/login").as(
        "loginRequest",
      );

      // Fill and submit the form
      loginPage.loginForm(this.data.loginUser);
      loginPage.Login();

      // Wait for request and validate response
      cy.wait("@loginRequest", { timeout: 30000 });

      // Separate validations
      cy.get("@loginRequest").then((interception) => {
        cy.log("Status:", interception.response.statusCode);
        cy.log("Body:", JSON.stringify(interception.response.body));
        cy.log("Request body:", JSON.stringify(interception.request.body));
        expect(interception.response.statusCode).to.eq(200);
      });

      // Check URL change
      cy.url({ timeout: 30000 }).should(
        "include",
        "/v3/student-dashboard/Test",
      );
    });

    it("should show error for invalid email", function () {
      loginPage.loginForm(this.data.logininvalid);
      loginPage.Login();

      cy.contains("User does not exists. Please create an account !").should(
        "be.visible",
      );
    });

    it("should verify backend is accessible", () => {
      cy.request({
        method: "GET",
        url: "http://localhost:8070/health",
        failOnStatusCode: false,
      }).then((response) => {
        cy.log("Backend health check:", response.status, response.body);
        expect(response.status).to.eq(200);
      });
    });
  });
});
