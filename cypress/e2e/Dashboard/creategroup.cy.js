import CreateGroup from "../../Pages/CreateGroup";
import loginPage from "../../Pages/loginPage";

describe("Research Management System", () => {
  describe("Student Group Creation Tests", () => {
    beforeEach(() => {
      loginPage.visit();

      cy.fixture("registrationData").then((data) => {
        loginPage.loginForm(data.loginUser);
        loginPage.Login();
      });

      cy.url({ timeout: 30000 }).should("include", "v3/student-dashboard/Test");
    });

    it("Create a group successfully", function () {
      cy.fixture("registrationData").then((Data) => {

      // Fill and submit the form
      CreateGroup.NavigateToGroup();
      CreateGroup.fillFormGroup(Data.groupData);
      CreateGroup.submitGroup();

        // Validate success message
        cy.contains("New Student Group Added").should("be.visible");

      });
    });
  });
});
