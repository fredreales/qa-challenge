# Desafio de Automação de Testes - Cadastro em Aplicação Web

Este projeto contém casos de teste automatizados desenvolvidos para validar o processo de cadastro em uma Aplicação Web, conforme especificado no desafio.

## Desafio

O desafio consistia em acessar o link da aplicação teste e desenvolver casos de teste automatizados que cobrissem diferentes cenários de cadastro, incluindo entradas válidas e inválidas, verificação de campos obrigatórios, validação de formatos de dados, entre outros aspectos relevantes para garantir a funcionalidade da tela de cadastro.


## Abordagem

Para abordar o desafio, utilizei o framework de testes Cypress devido à sua simplicidade e poder para realizar testes de interface de usuário de forma eficaz. Os casos de teste foram desenvolvidos para cobrir os seguintes aspectos:

- Validação de campos obrigatórios
- Verificação de formatos de dados (por exemplo, e-mail válido)
- Testes com entradas válidas e inválidas
- Uso de comandos personalizados para aumentar a reusabilidade dos testes

Os testes foram organizados em suites e casos individuais para garantir uma cobertura abrangente do processo de cadastro.

## Executando Localmente

Para executar este projeto localmente e executar os testes automatizados usando o Cypress, siga estas etapas:

### Clonar o Repositório
```bash
git clone https://github.com/fredreales/qa-challenge.git
```
### Instalar as Dependências

Navegue até o diretório do projeto clonado:
```bash
cd qa-challenge
```
```bash
npm install
```
### Executar o Cypress
```bash
npx cypress open
```
Dentro do Cypress Test Runner, você encontrará um arquivo de teste com o nome de signup.cy.js disponível. Clique no arquivo de teste  para executar
