class RegistrationPage {

  visit() {
    cy.visit(Cypress.env('groupPath'))
  }

  elements = {
    GroupName: () => cy.get("input[id='groupName']"),
    EmailS1: () => cy.get("input[id='studentEmail_1']"),
    NameS1: () => cy.get("input[id='studentName_1']"),
    EmailS2: () => cy.get("input[id='studentEmail_2']"),
    NameS2: () => cy.get("input[id='studentName_2']"),
    EmailS3: () => cy.get("input[id='studentEmail_3']"),
    NameS3: () => cy.get("input[id='studentName_3']"),
    EmailS4: () => cy.get("input[id='studentEmail_4']"),
    NameS4: () => cy.get("input[id='studentName_4']"),
    
    SubmitGroup: () => cy.contains('button', 'Submit'),
    NavGroup: () => cy.contains('Create Groups')
  }

  fillFormGroup(data) {
    this.elements.GroupName().clear().type(data.groupName)
    this.elements.EmailS1().clear().type(data.emailS1)
    this.elements.NameS1().clear().type(data.nameS1)
    this.elements.EmailS2().clear().type(data.emailS2)
    this.elements.NameS2().clear().type(data.nameS2)
    this.elements.EmailS3().clear().type(data.emailS3)
    this.elements.NameS3().clear().type(data.nameS3)
    this.elements.EmailS4().clear().type(data.emailS4)
    this.elements.NameS4().clear().type(data.nameS4)
  }

  submitGroup() {
    this.elements.SubmitGroup().click()
  }

  NavigateToGroup() {
    this.elements.NavGroup().should('be.visible')
    this.elements.NavGroup().click()
  }
}

export default new RegistrationPage()
