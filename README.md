# README.md

## 📌 Medical Integration API

API REST desenvolvida com NestJS, TypeORM e SQLite para simular integração de pedidos, documentos e exames médicos.

O projeto implementa regras de negócio relacionadas à integração de exames médicos, controle de duplicidade e vínculo de documentos.

---

# 🚀 Tecnologias Utilizadas

* Node.js
* NestJS
* TypeORM
* SQLite
* Docker
* Docker Compose
* TypeScript

---

# 📂 Estrutura do Projeto

```txt
src/
 ├── pedidos/
 ├── documentos/
 ├── exames/
 ├── app.module.ts
 └── main.ts
```

---

# ⚙️ Pré-requisitos

Antes de executar o projeto, é necessário possuir instalado:

* Node.js (versão 20+ recomendada)
* Docker Desktop
* npm

---

# ▶️ Executando Localmente

## 1. Clonar o projeto

```bash
git clone <url-do-repositorio>
```

---

## 2. Instalar dependências

```bash
npm install
```

---

## 3. Executar aplicação

Modo desenvolvimento:

```bash
npm run start:dev
```

Modo produção:

```bash
npm run build
npm run start:prod
```

---

# 🐳 Executando com Docker

## Buildar e subir containers

```bash
docker compose up --build
```

---

## Encerrar containers

```bash
docker compose down
```

---

# 🗄️ Banco de Dados

O projeto utiliza SQLite.

O banco é criado automaticamente em:

```txt
data/database.sqlite
```

---

# 📌 Endpoints

---

## Pedidos

### Criar pedido

```http
POST /pedidos
```

### Buscar todos os pedidos

```http
GET /pedidos
```

### Buscar pedido por código

```http
GET /pedidos/:codigoPedido
```

---

## Documentos

### Criar documento

```http
POST /documentos
```

### Buscar documentos por pedido

```http
GET /documentos/:codigoPedido
```

---

## Exames

### Criar exame

```http
POST /exames
```

### Buscar exame por accession number

```http
GET /exames/:accessionNumber
```

---

# 📥 Exemplos de Requisição

---

## Criar Pedido

```json
{
  "codigoPedido": 1,
  "accessionNumber": "ACC001",
  "nomePaciente": "João Silva",
  "dataNascimento": "1990-01-01",
  "sexo": "M",
  "codUnidade": 10
}
```

---

## Criar Documento

```json
{
  "codigoDocumento": 100,
  "codigoPedido": 1,
  "nomeDocumento": "Laudo.pdf",
  "documento": "BASE64_TESTE"
}
```

---

## Criar Exame

```json
{
  "accessionNumber": "ACC001",
  "codigoPedido": 1,
  "nomePaciente": "João Silva",
  "modalidade": "RX",
  "status": "FINALIZADO"
}
```

---

# ✅ Regras de Negócio Implementadas

* Pedido salvo como integrado ou não integrado
* Validação de duplicidade de pedidos
* Validação de duplicidade de documentos
* Documento vinculado automaticamente após integração do exame
* Integração automática de pedidos quando exame correspondente existe
* Validação de existência de pedido para exames e documentos

---

# 🧪 Cenários Cobertos

## 1. Pedido sem exame correspondente

Resultado:

* pedido salvo como não integrado

---

## 2. Pedido com exame já existente

Resultado:

* pedido salvo como integrado

---

## 3. Documento recebido antes do exame

Resultado:

* documento salvo como não vinculado

---

## 4. Exame recebido posteriormente

Resultado:

* pedido atualizado para integrado
* documentos vinculados automaticamente

---

## 5. Documento duplicado

Resultado:

* erro de duplicidade retornado pela API

---

# 📌 Observações

* O projeto utiliza `synchronize: true` do TypeORM para facilitar desenvolvimento local.
* Em ambiente produtivo, o ideal seria utilizar migrations.
* O banco SQLite pode ser removido para recriação automática do schema durante desenvolvimento.

---

# 👨‍💻 Autor

Jônatas Abreu
