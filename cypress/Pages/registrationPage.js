class RegistrationPage {

  visit() {
    cy.visit(Cypress.env('registrationPath'))
  }

  elements = {
    username: () => cy.get("input[name='username']"),
    email: () => cy.get("input[name='email']"),
    password: () => cy.get("input[name='password']"),
    rePassword: () => cy.get("input[name='repassword']"),
    registerBtn: () => cy.contains('button', 'REGISTER'),
    loginLink: () => cy.contains('Already have an account')
  }

  fillForm(data) {
    this.elements.username().clear().type(data.username)
    this.elements.email().clear().type(data.email)
    this.elements.password().clear().type(data.password)

    const rePass = data.rePassword || data.password
    this.elements.rePassword().clear().type(rePass)
  }

  submit() {
    this.elements.registerBtn().click()
  }

  backToLogin() {
    this.elements.loginLink().should('be.visible')
    this.elements.loginLink().click()
  }
}

export default new RegistrationPage()
