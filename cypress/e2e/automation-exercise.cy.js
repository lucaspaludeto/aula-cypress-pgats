/// <reference types="cypress" />

//import 'cypress-file-upload'

import userData from '../fixtures/example.json'
import { getRandomNumber, getRandomEmail, generateUser } from '../support/helpers'

let user;


describe('Automation Exercise', () => {
    beforeEach(() => {
        user = generateUser()
        cy.visit('https://automationexercise.com')
        cy.get('a[href="/login"]').click()
    });

    it('Exemplos de Logs', () => {
        cy.log(`STEP 1 :: PGATS AUTOMACAO WEB CY LOG`)
        cy.log(`STEP 1 :: PGATS AUTOMACAO WEB CY LOG`)

        cy.log(`getRandomNumber: ${getRandomNumber()}`)
        cy.log(`getRandomEmail: ${getRandomEmail()}`)

        cy.log(`Nome do usuário: ${userData.name}`)
        cy.log(`Email do usuário: ${userData.email}`)

    })


    it.only('Cadastrar um usuário', () => {
        //const timestamp = new Date().getTime()

        cy.get('[data-qa="signup-name"]').type(user.nome)
        cy.get('[data-qa="signup-email"]').type(user.email)

        cy.contains('button', 'Signup').click()

        cy.get('input[type=radio]').check('Mr')
        
        cy.get('input#password').type(user.senha, { log: false })

        cy.get('select[data-qa=days]').select('20')
        cy.get('select[data-qa=months]').select('September')
        cy.get('select[data-qa=years]').select('1990')

        cy.get('input[type=checkbox]#newsletter').check()
        cy.get('input[type=checkbox]#optin').check()

        cy.get('input#first_name').type(user.primeiroNome)
        cy.get('input#last_name').type(user.ultimoNome)
        cy.get('input#company').type(user.empresa)
        cy.get('input#address1').type(user.endereco)
        cy.get('select#country').select('Canada')
        cy.get('input#city').type(user.cidade)
        cy.get('input#state').type(user.estado)
        cy.get('[data-qa="zipcode"]').type(user.cep)
        cy.get('[data-qa="mobile_number"]').type(user.telefone)

        //Act
        cy.get('[data-qa="create-account"]').click()

        //Assert
        cy.url().should('includes', 'account_created')
        cy.contains('b', 'Account Created!')
    });

    it('Login de Usuário com e-mail e senha corretos', () => {
        cy.get(`[data-qa="login-email"]`).type('qa-tester-1759530301877@qatester.com')
        cy.get(`[data-qa="login-password"]`).type(`12345`)

        cy.get(`[data-qa="login-button"]`).click();

        cy.get('i.fa-user').parent().should('contain', 'QA Tester')
    });

    it('Login de Usuário com e-mail válido e senha inválida', () => {
        cy.get(`[data-qa="login-email"]`).type('qa-tester-1759530301877@qatester.com')
        cy.get(`[data-qa="login-password"]`).type(`54321`)

        cy.get(`[data-qa="login-button"]`).click();

        cy.get('.login-form > form > p').should('contain', 'Your email or password is incorrect!')
    });

    it('Logout de Usuário', () => {
        cy.get(`[data-qa="login-email"]`).type('qa-tester-1759530301877@qatester.com')
        cy.get(`[data-qa="login-password"]`).type(`12345`)

        cy.get(`[data-qa="login-button"]`).click();

        // Act
        cy.get('a[href="/logout"').parent().should('be.visible').click()

        // Assert
        cy.url().should('contain', 'login')
    });

    it('Login de Usuário com e-mail e senha corretos', () => {
        cy.get(`[data-qa="signup-name"]`).type('QA Tester')
        cy.get(`[data-qa="signup-email"]`).type(`qa-tester-1759530301877@qatester.com`)

        cy.get(`[data-qa="signup-button"]`).click();

        cy.get('.signup-form > form > p').should('contain', 'Email Address already exist!')
    });

    
    it('Envio de um formulário de contato (Contact Us)', () => {
        cy.get(`a[href*="contact"]`).click()

        cy.get('[data-qa="name"]').type(userData.name);
        cy.get('[data-qa="email"]').type(userData.email);
        cy.get('[data-qa="subject"]').type('Teste Campo Subject');
        cy.get('[data-qa="message"]').type('Testando o campo de mensagem...');
        //cy.get('input[name="upload_file"]').attachFile(['imagem-exemplo.jpg'])

        cy.fixture('imagem-exemplo.jpg').as('arquivo')
        cy.get('input[type=file]').selectFile('@arquivo')


        cy.get(`[data-qa="submit-button"]`).click();

        cy.get('.status').should('be.visible')
        cy.get('.status').should('have.text', 'Success! Your details have been submitted successfully.')
    });


    
});     