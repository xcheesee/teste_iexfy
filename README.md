# Teste Desenvolvedor Jr. IEXFY

## Bootstrap das aplicacoes

### Requisitos

Docker v. 29>

### Operacoes

Apos clonar o repositorio realize as seguintes operacoes:

- va aa pasta do projeto
- crie um arquivo .env dentro da pasta "/frontend"
- adicione o valor 'VITE_API_URL="/api"' no .env criado
- inicialize os containers no root do projeto (onde docker-compose.yml esta localizado)

#### Linux

Utilizando bash:
- `cd teste_iexfy`
- `touch ./frontend/.env`
- `echo VITE_API_URL="/api" > ./frontend/.env`
- `docker compose up --build`

#### Windows

Utilizando o powershell:
- `cd teste_iexfy`
- `New-Item -Path ./frontend/.env -ItemType File -Force`
- `echo 'VITE_API_URL="/api"' > ./frontend/.env`
- `docker compose up --build`

## Desafio Pratico

Implementar uma aplicacao fullstack de um painel de oportunidades comerciais

### Consideracoes Tecnicas

#### Frontend

- Interface para consumo de api simples, sem autenticacao e SEO 

- Criacao de oportunidade levara em conta a data no momento da criacao, sem ser permitido input do usuario

- Por nao necessitar das features encontradas no Next.js(SSR, SEO optimization) e possuir um bundle relativamente pequeno (2 telas com alguns componentes), foi escolhido utilizar React.js + tailwind para desenvolvimento do frontend, utilizando um admin dashboard como baseline.

#### Backend

- API CRUD simples, com validacao/sanitizacao de dados; tratamento de erros e middleware de logging, utilizando banco de dados SQLite para permanencia de dados

- Deve ser utilizado modulo http, built-in node

- Database:
    - Sqlite nao possui um data type similar ao "MONEY", entao valores monetarios serao salvos no formato "BIGING" para evitar erros de floating point -> 123.45 sera salvo como 12345, com o "casting" sendo realizado pelo backend
    
    - Datas serao salvas em formato de texto no formato ISO 8601(YYYY-MM-DD HH:MM:SS.SSS)


### Features Futuras

- Caching de dados do banco
- Implementacao de autenticacao
- Implementar paginacao na API

