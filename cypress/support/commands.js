
Cypress.Commands.add('fillFormPersonalData', (firstName, lastName, formattedBirthDate, cpfNumber, email, password) => {
  cy.get('#signup-personal-data-firstName').type(firstName)
  cy.get('#signup-personal-data-lastName').type(lastName)
  cy.get('#signup-personal-data-birthDate').type(formattedBirthDate)
  cy.get('#signup-personal-data-cpf').type(cpfNumber)
  cy.get('#signup-personal-data-email').type(email)
  cy.get('#signup-personal-data-email-confirm').type(email)
  cy.get('#signup-personal-data-password').type(password, { log: false })
  cy.get('#signup-personal-data-password-confirm').type(password, { log: false })
  cy.get('[aria-controls="dropdown-button-1"]').click()
  cy.contains('[x-text="option.value"]', 'Advanced').click()
  cy.get('#signup-personal-data-lgpd').check()
  
});


Cypress.Commands.add('fillFormAddress', (CEP, number, complement) => {
  cy.get('#signup-address-cep').type(CEP).type('{enter}')
  cy.intercept(`GET`, `https://brasilapi.com.br/api/cep/v1/${CEP}`).as('getCEP')
  cy.wait('@getCEP')
  cy.get('#signup-address-number').type(number)
  cy.get('#signup-address-complement').type(complement)
  
});

Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})