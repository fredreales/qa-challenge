import { faker } from '@faker-js/faker'
import { cpf } from 'cpf-cnpj-validator'

const firstName = faker.person.firstName()
const lastName = faker.person.lastName()
const email = faker.internet.email()
const cpfNumber = cpf.generate()
const password = faker.internet.password()

// função para formatar a data no formato dd/mm/aaaa
function formatDate(date) {
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}
const randomBirthDate = faker.date.between({ from: '1950-01-01', to: '2004-12-31' })
// formatar a data de nascimento para o formato dd/mm/aaaa
const formattedBirthDate = formatDate(randomBirthDate);
describe('signup page', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('baseUrl'))
    cy.contains('button', 'Fazer inscrição').click()
  });

  it('preenche formularios e envia', () => {
    cy.fillFormPersonalData(firstName, lastName, formattedBirthDate, cpfNumber, email, password)
    cy.get('#signup_submit_button_1').click()
    cy.contains('h2', 'Endereço').should('be.visible')

    const CEP = '88051011'
    const number = '10'
    const complement = 'casa'

    cy.fillFormAddress(CEP, number, complement)
    cy.get('#signup_submit_button_3').click()
    cy.contains('h1', 'Thank you for joining us!').should('be.visible')
  });

  it('nao deve enviar quando um campo required esta vazio, mostrando uma mensagem', () => {
    cy.fillFormPersonalData(firstName, lastName, formattedBirthDate, cpfNumber, email, password)
    cy.get('#signup-personal-data-lastName').clear()
    cy.get('#signup_submit_button_1').click()
    cy.get('#signup-personal-data-lastName:invalid').should('exist')
  });


  it('nao deve submeter quando o campo email esta no formato errado', () => {
    const email = 'abcde'
    cy.fillFormPersonalData(firstName, lastName, formattedBirthDate, cpfNumber, email, password)
    cy.get('#signup_submit_button_1').click()
    cy.get('.input-error').should('be.visible')
  });

  it('email e/ou CPF ja estao em uso', () => {
    cy.fillFormPersonalData(firstName, lastName, formattedBirthDate, cpfNumber, email, password)
    cy.get('.input-error').should('be.visible')
  });

  it('CEP nao encontrado', () => {
    const CEP = '33333333'
    const number = '10'
    const complement = 'casa'
    const email = 'teste@teste.com'
    const cpfNumber = '864.038.780-00'
    cy.fillFormPersonalData(firstName, lastName, formattedBirthDate, cpfNumber, email, password)
    cy.get('#signup_submit_button_1').click()
    cy.fillFormAddress(CEP, number, complement)
    cy.contains('.toast', 'CEP não encontrado.').should('be.visible')
  });

  it('data de nascimento no formato errado', () => {
    const formattedBirthDate = '32/13/2025'
    cy.fillFormPersonalData(firstName, lastName, formattedBirthDate, cpfNumber, email, password)
    cy.get('.input-error').should('be.visible')
  });

  it.only('campo senha deve ter 5 caracteres ou mais', () => { //bug cypress, não está validando o campo, porém quando digitado manualmente não é permitido senhas com menos de 5 caracteres
    const password = 'abcd'
    cy.get('#signup-personal-data-password').type(password)
    cy.get('#signup-personal-data-password').should('have.attr', 'data-too-short', 'Insira uma senha válida')  //minlenght=5
    cy.get('.input-error').should('be.visible')
  });

  it('campo nome/sobrenome devem poossuir 4 caracteres ou mais', () => { //bug cypress (https://github.com/cypress-io/cypress/issues/14911) e (https://github.com/cypress-io/cypress/issues/6678)
    const firstName = 'abc'
    cy.get('#signup-personal-data-firstName').type(firstName)
    cy.get('#signup-personal-data-firstName').should('have.attr', 'data-too-short', 'Preencha corretamente') //minlenght=4
    cy.get('.input-error').should('be.visible')
  });

})

