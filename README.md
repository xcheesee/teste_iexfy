# Teste Desenvolvedor Jr. IEXFY

## Bootstrap das aplicações

### Requisitos

Docker v. 29>

### Operações

Após clonar o repositório realize as seguintes operações:

- Vá à pasta do projeto

- crie um arquivo .env dentro da pasta "/frontend"

- adicione o valor 'VITE_API_URL="/api"' no .env criado

- inicialize os containers no root do projeto (onde docker-compose.yml este localizado)

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

Implementar uma aplicação fullstack de um painel de oportunidades comerciais

### Considerações Técnicas

#### Frontend

- Interface para consumo de api simples, sem autenticação e SEO 

- Criação de oportunidade levara em conta a data no momento da criação, sem ser permitido input do usuário

- Por não necessitar das features encontradas no Next.js(SSR, SEO optimization) e possuir um bundle relativamente pequeno (2 telas com alguns componentes), foi escolhido utilizar React.js + tailwind para desenvolvimento do frontend, utilizando um admin dashboard como baseline.

#### Backend

- API CRUD simples, com validação/sanitização de dados; tratamento de erros e middleware de logging, utilizando banco de dados SQLite para permanência de dados

- Deve ser utilizado modulo http, built-in node

- Database:

    - Sqlite não possui um data type similar ao "MONEY", então valores monetários serão salvos no formato "BIGING" para evitar erros de floating point -> 123.45 será salvo como 12345, com o "casting" sendo realizado pelo backend

    

    - Datas serão salvas em formato de texto no formato ISO 8601(YYYY-MM-DD HH:MM:SS.SSS)

### Features Futuras

- Caching de dados do banco

- Implementação de autenticação

- Implementar paginacao na API