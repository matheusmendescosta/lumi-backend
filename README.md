[![Github Badge](https://img.shields.io/badge/-Github-000?style=flat-square&logo=Github&logoColor=white&link=https://github.com/matheusmendescosta)](https://github.com/matheusmendescosta)
[![Linkedin Badge](https://img.shields.io/badge/-LinkedIn-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/matheusmendescosta/)](https://www.linkedin.com/in/matheusmendescosta/)

# 🚀 Desafio Técnico - API

Esta é uma API desenvolvida como parte de um desafio técnico. O projeto foi construído com foco em boas práticas de desenvolvimento, utilizando [Node.js / TypeScript / Express] *(ou substitua pelas tecnologias corretas)*.

## 🛠️ Tecnologias

- Node.js  
- TypeScript  
- Express
- Postgres
- Prisma ORM  
- Docker + Docker Compose

## 🔧 Como rodar o projeto

Siga os passos abaixo para rodar o ambiente localmente:

1. **Clone o repositório**

```bash
git clone https://github.com/seu-usuario/nome-do-repositorio.git
cd nome-do-repositorio
```

2. **Instale as dependências**
```
npm install
```

3. **Configure as variáveis de ambiente**
Crie um arquivo .env na raiz do projeto use o .env.exemple como referencia
```
#api
NODE_ENV=dev
API_PORT=3333
PRISMA_STUDIO_PORT=5555
#postgres volume
POSGRESDB_VOLUME_PATH=/pwd/.volumes
#postgres access
POSTGRES_PORT=5432
POSTGRES_USER=root
POSTGRES_PASSWORD=12345678A@
#postgres access gui
PGADMIN_DEFAULT_EMAIL=matheus@dev.com
PGADMIN_DEFAULT_PASSWORD=12345678A@
PGADMIN_LISTEN_PORT=8082
#prisma orm
DATABASE_URL="postgresql://root:12345678A@@postgresdb:5432/lumi_development?schema=public"
REDIS_PORT=6379
```

4. **Suba o ambiente com Docker**
```
docker-compose up
```
A aplicação estará disponível em: http://localhost:3333 (ou a porta configurada)