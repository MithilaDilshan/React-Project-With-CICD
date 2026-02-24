import registrationPage from "../../Pages/registrationPage";

describe("Research Management System", () => {
  describe("Student Registration UI Tests", () => {
    beforeEach(() => {
      registrationPage.visit();
    });

    it("should display all required fields", () => {
      registrationPage.elements.username().should("be.visible");
      registrationPage.elements.email().should("be.visible");
      registrationPage.elements.password().should("be.visible");
      registrationPage.elements.rePassword().should("be.visible");
      registrationPage.elements.registerBtn().should("be.visible");
    });
  });

  describe("Student Registration Functional Tests", () => {
    beforeEach(() => {
      registrationPage.visit();
      cy.fixture("registrationData").as("data");
    });

    it("should register with valid data", function () {
      registrationPage.fillForm(this.data.validUser);
      registrationPage.submit();
      registrationPage.backToLogin();

      // Adjust based on your app behavior
      cy.url().should("not.include", "register");
    });

    it("should show error for invalid email", function () {
      registrationPage.fillForm(this.data.invalidEmail);
      registrationPage.submit();

      cy.get("input[name='email']").then(($input) => {
        const message = $input[0].validationMessage;
        cy.log("Browser validation message:", message);

        // Assert expected text
        expect(message).to.contain(
          "Please include an '@' in the email address",
        );
      });
    });

    it("should show error when passwords mismatch", function () {
      registrationPage.fillForm(this.data.passwordMismatch);
      registrationPage.submit();

      cy.contains("Password did not match").should("exist");
    });
  });
});
