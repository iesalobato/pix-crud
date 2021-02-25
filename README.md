# pix-crud
Aplicação que simula o cadastro, edição e exclusão de pagamentos PIX utilizando os frameworks Angular e AdonisJS

## Features
1. Cadastrar, editar e excluir pagamentos
2. Aplicar a lógica de porcentagem correspondente a cada pagamento em relação ao montante por data
3. Exibir uma lista de pagamentos cadastrados 

## Estrutura
1. pix-frontend: desenvolvido em Angular
2. pix-backend: desenvolvido em AdonisJS

## Pré-requisitos
Antes de começar, é necessário ter instalado em sua máquina a ferramenta Node.js (https://nodejs.org/en/download/). Assim, será possível instalar os frameworks utilizados para o desenvolvimento.
1. Angular: npm install -g @angular/cli
2. AdonisJS: npm install -g @adonisjs/cli

## Rodar o projeto
### Download do projeto
1. git clone https://github.com/iesalobato/pix-crud
2. git checkout master (para utilizar o branch master)

### Front-end
1. cd loja-frontend
2. npm install --save-dev @angular-devkit/build-angular
3. npm start

### Back-end
1. cd loja-backend
2. npm i @adonisjs/ignitor
3. Fazer uma cópia do arquivo .env.example e renomea-lo para .env
4. Configurar a conexão com o banco de dados no arquivo .env
5. adonis migration:run
6. adonis serve --dev
