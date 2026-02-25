import loginPage from "../../Pages/loginPage";
import registrationPage from "../../Pages/registrationPage";
import UIpage from "../../Pages/UIpage";

describe("Research Management System", () => {
  describe("UI Tests", () => {
    beforeEach(() => {
      loginPage.visit();

      cy.fixture("registrationData").then((data) => {
        loginPage.elements.Lemail().should("be.visible");
        loginPage.elements.Lpassword().should("be.visible");
        loginPage.elements.LoginBtn().should("be.visible");

        loginPage.loginForm(data.loginUser);
        loginPage.Login();
      });

      cy.url({ timeout: 30000 }).should("include", "v3/student-dashboard/Test");
    });

    it("Dashboard UI elements are visible", function () {
        UIpage.uielements.NavGroup().should("be.visible");
        UIpage.uielements.ReqSuper().should("be.visible");
        UIpage.uielements.SubmitDocs().should("be.visible");
        UIpage.uielements.SubmitPres().should("be.visible");
        UIpage.uielements.LogOut().should("be.visible");
        UIpage.uielements.Heading().should("be.visible");
        UIpage.uielements.Logo().should("be.visible");
      
    });
  });
});
