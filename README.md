# EM DESENVOLVIMENTO
> _Na branch dev | E em análise quanto manter front e back no mesmo repositório_
---
# 📚 AcerVi — Seu acervo pessoal de livros

O **AcerVi** é uma aplicação web para catalogar e consultar livros de forma pessoal. Diferente de uma biblioteca, este sistema é voltado exclusivamente para o uso individual, permitindo que você organize seu próprio acervo com riqueza de detalhes.

---

## ✨ Funcionalidades

- Cadastro de livros com campos personalizados
- Consulta e organização do acervo
- Interface simples e responsiva
- Estrutura de catalogação inspirada nos padrões:
  - **MARC21**
  - **Cutter**
  - **CDU**

---

## ⚙️ Tecnologias Utilizadas

### Backend

- [Spring Boot (via Spring Initializr)](https://start.spring.io/)
- PostgreSQL
- pgAdmin
- Postman (para testes de API)

### Frontend

- React
- Bootstrap

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos

- Java 17+
- Maven
- PostgreSQL
- Node.js e npm

### Instruções

#### Backend

```bash
cd backend
mvn install
mvn spring-boot:run
```

> ⚠️ **Atenção:** Certifique-se de configurar a conexão com o banco de dados PostgreSQL no arquivo `application.properties`.

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

## 🗃 Estrutura do Projeto

```bash
acerVi/
├── backend/
│   └── src/
│       └── main/
│           └── java/
│               └── com/
│                   └── acervi/
│                       └── ...
├── frontend/
│   └── src/
│       ├── components/
│       ├── pages/
│       └── ...
```

## 📌 Observações
* O AcerVi não é um sistema de biblioteca com empréstimos ou controle de usuários.

* A proposta é uma catalogação detalhada e pessoal, próxima dos padrões bibliotecários, mas adaptada para uso individual.

* O projeto está em constante evolução e novas funcionalidades podem ser adicionadas conforme a necessidade.

## 🛠 Contribuição
Sinta-se à vontade para abrir issues ou enviar pull requests. Toda sugestão é bem-vinda!
