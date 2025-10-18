import { faker } from '@faker-js/faker';

export const generateUser = () => {
    return {
        nome: faker.person.fullName(),
        email: faker.internet.email(),         
        senha: faker.internet.password(), 
        primeiroNome: faker.person.firstName(),
        ultimoNome: faker.person.lastName(),
        empresa: faker.company.name(),
        endereco: faker.location.streetAddress(),
        cidade: faker.location.city(),           
        estado: faker.location.state(),         
        cep : faker.location.zipCode(),          
        telefone: faker.phone.number()  
    }
}


export function getRandomNumber() {
    return new Date().getTime();
}

export function getRandomEmail() {
    return `qa-tester-${getRandomNumber()}@qatester.com`;
}
