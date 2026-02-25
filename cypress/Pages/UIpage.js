class RegistrationPage {
  visit() {
    cy.visit(Cypress.env("dashboardPath"));
  }

  uielements = {
    NavGroup: () => cy.contains("Create Groups"),
    ReqSuper: () => cy.contains("Request Supervisor"),
    SubmitDocs: () => cy.contains("Submit Documents"), 
    SubmitPres: () => cy.contains("Submit Presentation"),
        LogOut: () => cy.contains("button", "Sign Out"),
    Heading: () => cy.get("h1").contains("Dashboard"),
    Logo: () => cy.get("div[class='logo']"),

  };
}

export default new RegistrationPage();
