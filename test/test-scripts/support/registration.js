const registerForm = () => cy.contains('button', 'Đăng Ký').closest('form')

const registerField = (label) =>
  registerForm().contains('label', label).parent().find('input')

function openRegistration() {
  const webBaseUrl = Cypress.expose('WEB_BASE_URL')
  cy.visit(`${webBaseUrl}/register`)
  cy.contains('h2', 'Đăng Ký Tài Khoản').should('be.visible')
}

function submitRegistration({ name, email, password }) {
  openRegistration()

  if (name !== '') registerField('Họ Tên').type(name)
  if (email !== '') registerField('Email').type(email)
  if (password !== '') registerField('Mật khẩu').type(password, { log: false })

  registerForm().contains('button', 'Đăng Ký').click()
}

function expectRegistrationRejected() {
  cy.location('pathname').should('eq', '/register')
}

function expectRegistrationSucceeded() {
  cy.wait('@register').its('response.statusCode').should('eq', 200)
  cy.location('pathname').should('eq', '/login')
}

function ensureRegistered(data) {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3000/api/register',
    body: data,
    failOnStatusCode: false,
  }).its('status').should('be.oneOf', [200, 500])
}

module.exports = {
  ensureRegistered,
  expectRegistrationRejected,
  expectRegistrationSucceeded,
  submitRegistration,
}

