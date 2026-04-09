# Teste Desenvolvedor Jr. IEXFY

## Desafio Pratico

Implementar uma aplicacao fullstack de um painel de oportunidades comerciais

### Consideracoes Tecnicas

#### Frontend

- Interface para consumo de api, 

#### Backend

- API CRUD simples, com validacao/sanitizacao de dados; tratamento de erros e middleware de logging, utilizando banco de dados SQLite para permanencia de dados

- Deve ser utilizado modulo http, built-in node

- Database:
    Sqlite nao possui um data type similar ao "MONEY", entao valores monetarios serao salvos no formato "BIGING" para evitar erros de floating point -> 123.45 sera salvo como 12345

