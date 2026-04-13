# Teste Desenvolvedor Jr. IEXFY

## Desafio Pratico

Implementar uma aplicação fullstack de um painel de oportunidades comerciais

### Bootstrap das aplicações

#### Requisitos

Docker v. 29>

#### Operações

Após clonar o repositório realize as seguintes operações:

- Vá à pasta do projeto

- crie um arquivo .env dentro da pasta "/frontend"

- adicione o valor 'VITE_API_URL="/api"' no .env criado

- inicialize os containers no root do projeto (onde docker-compose.yml este localizado)

##### Linux

Utilizando bash:

- `cd teste_iexfy`

- `touch ./frontend/.env`

- `echo VITE_API_URL="/api" > ./frontend/.env`

- `docker compose up --build`

##### Windows

Utilizando o powershell:

- `cd teste_iexfy`

- `New-Item -Path ./frontend/.env -ItemType File -Force`

- `echo 'VITE_API_URL="/api"' > ./frontend/.env`

- `docker compose up --build`


**Acesse a Aplicacao na URL http://localhost:5173**

**Backend: http://localhost:3000**

## Desafio Logico

## Execucao das funcoes

### Requisitos

Node v. 25>

#### Analise de Vendas

- va a pasta do projeto
- na pasta "logica", execute o comando `node vendasParses.js`

#### Funcao recursiva

- va a pasta do projeto
- na pasta "logica", execute o comando `node arrFlattener.js`

## Considerações Técnicas

- Sera utilizado docker para orquestracao dos ambientes de desenvolvimento

### Frontend

- Interface para consumo de api simples, sem autenticação e SEO 

- Criação de oportunidade levara em conta a data no momento da criação, sem ser permitido input do usuário

- Por não necessitar das features encontradas no Next.js(SSR, SEO optimization) e possuir um bundle relativamente pequeno (2 telas com alguns componentes), foi escolhido utilizar React.js + tailwind para desenvolvimento do frontend, utilizando um admin dashboard como baseline.

### Backend

- API CRUD simples, com validação/sanitização de dados; tratamento de erros e middleware de logging, utilizando banco de dados SQLite para permanência de dados

- Deve ser utilizado modulo http, built-in node

- Sera utilizado Padrao MVC, Com implementacoes de Controllers, Services e Models, para implementar separation of concerns da melhor maneira possivel

- Database:

    - Sqlite não possui um data type similar ao "MONEY", então valores monetários serão salvos no formato "BIGING" para evitar erros de floating point -> 123.45 será salvo como 12345, com o "casting" sendo realizado pelo backend

    

    - Datas serão salvas em formato de texto no formato ISO 8601(YYYY-MM-DD HH:MM:SS.SSS)

### Features Futuras

- Caching de dados do banco

- Implementação de autenticação

- Implementar paginacao na API
