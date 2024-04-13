import { faker } from '@faker-js/faker';
import { cpf } from 'cpf-cnpj-validator';

const firstName = faker.person.firstName();
const lastName = faker.person.lastName();
const email = faker.internet.email();
const cpfNumber = cpf.generate()
const password = faker.internet.password();

// função para formatar a data no formato dd/mm/aaaa
function formatDate(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}
const randomBirthDate = faker.date.between({ from: '1950-01-01', to: '2004-12-31' })
// formatar a data de nascimento para o formato dd/mm/aaaa
const formattedBirthDate = formatDate(randomBirthDate);
describe('signup page', () => {
  beforeEach(() => {
    cy.visit('https://qastage.buildbox.one/18/cadastro/')
    cy.contains('button', 'Fazer inscrição').click()
  });

  it('fill forms and submit sucessfully', () => {
    cy.fillFormPersonalData(firstName, lastName, formattedBirthDate, cpfNumber, email, password)
    cy.contains('h2', 'Endereço').should('be.visible')

    const CEP = '88051011'
    const number = '10'
    const complement = 'casa'

    cy.fillFormAddress(CEP, number, complement)
    cy.contains('h1', 'Thank you for joining us!').should('be.visible')
  });

  it('should not submit and show a message indicating a required field is missing', () => {
    cy.fillFormPersonalData(firstName, lastName, formattedBirthDate, cpfNumber, email, password)
    cy.get('#signup-personal-data-lastName').clear()
    cy.get('#signup_submit_button_1').click()
    cy.get('#signup-personal-data-lastName:invalid').should('exist')

  });

  it('password should be 5 characters or more', () => { //bug cypress, não está validando o campo, porém quando digitado manualmente não é permitido senhas com menos de 5 caracteres
    const password = 'abc'
    cy.fillFormPersonalData(firstName, lastName, formattedBirthDate, cpfNumber, email, password)
    cy.get('#signup-personal-data-lgpd').check()
    cy.get('#signup_submit_button_1').click()

  });

  it('fields name and lastname should only accept 4 or more characters', () => { //bug cypress (https://github.com/cypress-io/cypress/issues/14911) e (https://github.com/cypress-io/cypress/issues/6678)
    const firstName = 'ab'
    const lastName = 'bc'
    cy.fillFormPersonalData(firstName, lastName, formattedBirthDate, cpfNumber, email, password)
    cy.get('#signup_submit_button_1').click()
    cy.get('.input-error').should('be.visible')

  });

  it('doesnt submit when the email field has the wrong format', () => {
    const email = 'abcde'
    cy.fillFormPersonalData(firstName, lastName, formattedBirthDate, cpfNumber, email, password)
    cy.get('#signup_submit_button_1').click()
    cy.get('.input-error').should('be.visible')

  });

  it('email and CPF already in use', () => {
    const CEP = '88051011'
    const number = '10'
    const complement = 'casa'
    cy.fillFormPersonalData(firstName, lastName, formattedBirthDate, cpfNumber, email, password)
    cy.fillFormAddress(CEP, number, complement)

    cy.visit('https://qastage.buildbox.one/18/cadastro/')
    cy.contains('button', 'Fazer inscrição').click()

    cy.fillFormPersonalData(firstName, lastName, formattedBirthDate, cpfNumber, email, password)
    cy.get('.input-error').should('be.visible')

  });

  it('CEP not found', () => {
    const CEP = '33333333'
    const number = '10'
    const complement = 'casa'
    cy.fillFormPersonalData(firstName, lastName, formattedBirthDate, cpfNumber, email, password)
    cy.fillFormAddress(CEP, number, complement)
    cy.contains('.toast', 'CEP não encontrado.').should('be.visible')

  });

  it.only('wrong birthdate', () => {
    const formattedBirthDate = 'aaa'
    cy.fillFormPersonalData(firstName, lastName, formattedBirthDate, cpfNumber, email, password)
    cy.get('.input-error').should('be.visible')
  });
})

