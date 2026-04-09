# Teste Desenvolvedor Jr. IEXFY

## Bootstrap das aplicacoes

### Requisitos

Docker v. 29>

### Operacoes

Apos clonar o repositorio realize as seguintes operacoes no terminal:

- `cd teste_iexfy`
- crie um arquivo .env utilizando `touch ./frontend/.env`
- adicione o valor (VITE_API_URL="/api") utilizando `echo VITE_API_URL="/api" > ./frontend/.env`
- inicialize os container com o comando`docker compose up --build`

## Desafio Pratico

Implementar uma aplicacao fullstack de um painel de oportunidades comerciais

### Consideracoes Tecnicas

#### Frontend

- Interface para consumo de api simples, sem autenticacao e SEO 

- Criacao de oportunidade levara em conta a data no momento da criacao, sem ser permitido input do usuario

#### Backend

- API CRUD simples, com validacao/sanitizacao de dados; tratamento de erros e middleware de logging, utilizando banco de dados SQLite para permanencia de dados

- Deve ser utilizado modulo http, built-in node

- Database:
    Sqlite nao possui um data type similar ao "MONEY", entao valores monetarios serao salvos no formato "BIGING" para evitar erros de floating point -> 123.45 sera salvo como 12345, com o "casting" sendo realizado pelo backend

