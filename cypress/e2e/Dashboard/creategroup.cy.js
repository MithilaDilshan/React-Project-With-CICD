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
        const uniqueGroupName = `${Data.groupData.groupName}_${Date.now()}`;

        const updatedGroupData = {
          ...Data.groupData,
          groupName: uniqueGroupName,
        };

        // Fill and submit the form
        CreateGroup.NavigateToGroup();
        CreateGroup.fillFormGroup(updatedGroupData);
        CreateGroup.submitGroup();

        // Validate success message
        cy.contains("New Student Group Added").should("be.visible");
      });
    });
  });
});
