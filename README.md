# Delivery Tracker — Programação Web II

**Instituto Federal de Alagoas (IFAL) — Campus Maceió**

API REST desenvolvida em Node.js e Express como projeto prático da disciplina de Programação Web II.

O projeto evolui ao longo do semestre, aplicando arquitetura em camadas, Repository Pattern, injeção de dependências e persistência de dados.

## 1. Tecnologias utilizadas

- Node.js
- Express
- JavaScript (ES Modules)
- Prisma ORM 6.19.0
- SQLite
- Git e GitHub Actions

## 2. Arquitetura do projeto

A aplicação segue uma arquitetura em camadas:

```text
src/
├── config/          # Configuração do Prisma Client
├── controllers/     # Tratamento das requisições e respostas HTTP
├── database/        # Implementação anterior em memória
├── repositories/    # Acesso aos dados (memória e Prisma)
├── routes/          # Rotas e injeção de dependências
├── services/        # Regras de negócio
└── utils/           # Utilitários e tratamento de erros

prisma/
├── schema.prisma    # Modelos e relacionamentos do banco
└── migrations/      # Histórico de alterações do banco
```

O Composition Root está localizado em `src/routes/index.js`, sendo responsável por instanciar os Repositories, Services e Controllers.

## 3. Evolução do projeto

### Capítulo 4 — Arquitetura em camadas

**Atividade 05 — Entregas**

Implementação das operações de entregas, validações, transições de status e histórico.

**Atividade 06 — Motoristas e injeção de dependências**

Implementação do cadastro de motoristas, atribuição às entregas, Repository Pattern e injeção de dependências.

A persistência era realizada em arrays na memória da aplicação.

### Capítulo 5 — Persistência com Prisma

**Atividade 07 — Prisma e SQLite**

Substituição dos Repositories em memória por implementações que utilizam Prisma ORM e SQLite.

Foram implementados:

- Modelos `Entrega`, `Motorista` e `Evento`.
- Relacionamentos entre motoristas, entregas e eventos.
- Restrições de unicidade para CPF.
- Migrations versionadas.
- Repositories Prisma.
- Persistência dos dados após reiniciar a aplicação.
- Preservação das regras de negócio e dos contratos HTTP.

## 4. Como executar o projeto

### Pré-requisitos

- Node.js e npm instalados.
- Git, caso deseje clonar o repositório.

### Passo 1 — Instalar as dependências

No terminal, dentro da pasta do projeto:

```bash
npm install
```

### Passo 2 — Configurar as variáveis de ambiente

Copie o arquivo `.env.example` e crie um arquivo `.env` na raiz do projeto.

O conteúdo necessário é:

```env
DATABASE_URL="file:./dev.db"
```

O SQLite utiliza um arquivo local como banco de dados, não sendo necessário instalar um servidor separado.

### Passo 3 — Criar o banco de dados

Execute:

```bash
npx prisma migrate deploy
```

Esse comando aplica as migrations existentes, criando as tabelas necessárias no SQLite.

### Passo 4 — Gerar o Prisma Client

Execute:

```bash
npx prisma generate
```

### Passo 5 — Iniciar a API

Execute:

```bash
npm start
```

Por padrão, a API estará disponível em:

`http://localhost:3000`

A aplicação respeita a variável de ambiente `PORT`, quando configurada.

### Passo 6 — Visualizar os dados

Para abrir a interface visual do Prisma:

```bash
npx prisma studio
```

## 5. Endpoints

### Entregas

| Método | Endpoint | Descrição |
|---|---|---|
| POST | `/api/entregas` | Criar uma entrega |
| GET | `/api/entregas` | Listar entregas |
| GET | `/api/entregas/:id` | Buscar entrega por ID |
| PATCH | `/api/entregas/:id/avancar` | Avançar status |
| PATCH | `/api/entregas/:id/cancelar` | Cancelar entrega |
| PATCH | `/api/entregas/:id/atribuir` | Atribuir motorista |
| GET | `/api/entregas/:id/historico` | Consultar histórico |

### Motoristas

| Método | Endpoint | Descrição |
|---|---|---|
| POST | `/api/motoristas` | Cadastrar motorista |
| GET | `/api/motoristas` | Listar motoristas |
| GET | `/api/motoristas/:id` | Buscar motorista |
| GET | `/api/motoristas/:id/entregas` | Consultar entregas do motorista |

### Verificação da API

`GET /api/health`

Resposta esperada:

```json
{
  "status": "ok"
}
```

## 6. Regras de negócio

A aplicação preserva as validações estabelecidas no Capítulo 4:

- Origem e destino não podem ser iguais.
- Não é permitido cadastrar entregas ativas duplicadas.
- O CPF de cada motorista deve ser único.
- Apenas motoristas ativos podem receber entregas.
- Motoristas só podem ser atribuídos a entregas com status `CRIADA`.
- As transições de status devem respeitar o ciclo estabelecido.
- Cada mudança relevante deve ser registrada no histórico.

Os erros seguem o formato:

```json
{
  "erro": "Mensagem do erro"
}
```

## 7. Testes automatizados

O projeto utiliza um autograder de conformidade.

Com o servidor em execução, utilize o PowerShell:

```powershell
$env:BASE_URL="http://localhost:3000"; node autograder/check.mjs
```

**Resultado obtido no desenvolvimento da Atividade 07: 122/122 pontos.**

Os testes verificam as rotas e os comportamentos esperados da API REST.

A persistência também foi verificada por meio de cadastro e recuperação de registros em processos Node.js separados.

## 8. Versionamento e persistência

O arquivo `prisma/schema.prisma` e a pasta `prisma/migrations/` são versionados no Git.

Os arquivos `.env`, `dev.db` e a pasta `node_modules/` não devem ser enviados ao repositório.

A aplicação utiliza Prisma ORM com SQLite para manter os dados armazenados independentemente da execução do servidor.

---

**Disciplina:** Programação Web II — IFAL/Maceió  
**Projeto:** Delivery Tracker  
**Atividade:** 07 — Persistência com Prisma e SQLite