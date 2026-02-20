class RegistrationPage {

  visit() {
    cy.visit(Cypress.env('loginPath'))
  }

  elements = {
    Lemail: () => cy.get("input[name='email']"),
    Lpassword: () => cy.get("input[name='password']"),
    LoginBtn: () => cy.contains('button', 'SUBMIT'),
    logOut: () => cy.contains('button', 'Sign Out')
  }

  loginForm(data) {
    this.elements.Lemail().clear().type(data.email)
    this.elements.Lpassword().clear().type(data.password)
  }

  Login() {
    this.elements.LoginBtn().click()
  }

  LogOut() {
    this.elements.logOut().should('be.visible')
    this.elements.logOut().click()
  }
}

export default new RegistrationPage()
