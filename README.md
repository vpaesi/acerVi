# 📚 AcerVi - Sistema de Gerenciamento de Acervo Pessoal

<div align="center">
  
  ![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?style=for-the-badge&logo=typescript)
  ![Vite](https://img.shields.io/badge/Vite-6.3-646CFF?style=for-the-badge&logo=vite)
  
  **Sistema profissional para catalogação e gerenciamento de bibliotecas pessoais**
  
  [🚀 Demo](#demo) • [📖 Funcionalidades](#funcionalidades) • [🛠️ Instalação](#instalação) • [📱 Screenshots](#screenshots)
  
</div>

---

## 🎯 **Sobre o AcerVi**

O **AcerVi** é uma aplicação web moderna desenvolvida para bibliotecários e entusiastas de livros que desejam organizar e catalogar seus acervos pessoais de forma profissional. Combina ferramentas de catalogação bibliotecária tradicionais com uma interface moderna e intuitiva.

### 🎪 **Público-Alvo**
- **Bibliotecários** que querem gerenciar acervos pessoais
- **Colecionadores de livros** que precisam de controle detalhado
- **Leitores ávidos** que querem acompanhar seu progresso
- **Pesquisadores** que precisam organizar bibliografia especializada

## ✨ **Funcionalidades**

### 📋 **Gestão Profissional do Acervo**
- ✅ **Sistema CDU (Classificação Decimal Universal)** completo
- ✅ **Códigos Cutter** para catalogação precisa
- ✅ **Números de chamada** automatizados
- ✅ **Status de leitura** (Não Lido, Lendo, Lido, Quero Ler, Abandonado)
- ✅ **Controle de condição física** (Novo, Seminovo, Usado, Danificado)
- ✅ **Localização física** detalhada (estante, prateleira, posição)
- ✅ **Sistema de favoritos** e avaliações
- ✅ **Controle de empréstimos** com histórico
- ✅ **Notas pessoais** e comentários

### 🔍 **Descoberta e Adição de Livros**
- 📚 **Integração Google Books API** com paginação
- 🔎 **Busca avançada** por título, autor, ISBN
- ➕ **Formulário completo** para catalogação profissional
- 🏷️ **Classificação automática CDU** baseada em categorias
- 📸 **Capas automáticas** dos livros

### 📊 **Análises e Relatórios**
- 📈 **Dashboard com estatísticas** completas
- 🎯 **Filtros avançados** por múltiplos critérios
- 🔍 **Busca textual** em todos os campos
- 📱 **Visualizações responsivas** (grade e estante virtual)
- 💾 **Exportação/importação** de dados

### 🎨 **Interface Moderna**
- 🎯 **Sidebar lateral** com controles organizados
- 📱 **Design responsivo** para todos os dispositivos
- 🎪 **Modo estante virtual** para visualização imersiva
- ⚡ **Interações fluidas** com transições suaves
- 🌈 **Sistema de cores** intuitivo por status

## 🛠️ **Instalação**

### **Pré-requisitos**
- Node.js 18+ 
- npm ou yarn

### **Setup Local**
```bash
# 1. Clone o repositório
git clone https://github.com/vpaesi/acerVi.git
cd acerVi

# 2. Instale as dependências
npm install

# 3. Execute em modo desenvolvimento
npm run dev

# 4. Acesse no navegador
# http://localhost:5173
```

### **Build para Produção**
```bash
npm run build
npm run preview
```

## 📚 **Estrutura do Projeto**

```
src/
├── components/              # Componentes React
│   ├── PersonalLibrary.tsx     # Componente principal
│   ├── BookSearchModal.tsx     # Modal de busca Google Books
│   ├── EditBookModal.tsx       # Modal de edição de livros
│   ├── BookshelfView.tsx       # Visualização em estante
│   └── Carousel.tsx            # Carrossel de livros
├── hooks/                   # Custom Hooks
│   ├── usePersonalLibrary.ts   # Hook principal do acervo
│   └── useGoogleBooks.ts       # Hook da Google Books API
├── services/                # Serviços e APIs
│   ├── personalLibraryService.ts # Gerenciamento local
│   ├── googleBooksApi.ts       # API Google Books
│   └── cduService.ts           # Sistema CDU
├── types/                   # Definições TypeScript
│   ├── personalLibrary.ts      # Tipos do acervo
│   └── book.ts                 # Tipos da API
├── data/                    # Dados estáticos
│   └── sampleBooks.ts          # Livros de exemplo
└── pages/                   # Páginas da aplicação
    └── HomePage.tsx            # Página principal
```

## 🎯 **Fluxo de Uso**

### **1. Primeiro Acesso**
1. **Carregue dados de exemplo** ou comece com acervo vazio
2. **Configure sua classificação** usando o sistema CDU
3. **Defina localizações físicas** das suas estantes

### **2. Adicionando Livros**
1. **Clique em "📚 Pesquisar por Novas Leituras"**
2. **Busque na Google Books API** por título/autor
3. **Preencha informações profissionais** (CDU, localização, condição)
4. **Adicione ao seu acervo** com classificação completa

### **3. Gerenciamento Diário**
1. **Use o sidebar** para filtrar e navegar
2. **Atualize status** conforme vai lendo
3. **Edite informações** usando o modal completo
4. **Controle empréstimos** de forma organizada

## 📱 **Screenshots**

### **Interface Principal**
- **Sidebar organizacional** com estatísticas e filtros
- **Grid de livros** com informações CDU e Cutter
- **Header moderno** com controle de menu

### **Modal de Busca**
- **Integração Google Books** com paginação
- **Resultados visuais** com capas dos livros
- **Formulário profissional** para catalogação

### **Visualização Estante**
- **Estante virtual 3D** agrupada por classificação CDU
- **Cores por status** para identificação rápida
- **Interação intuitiva** para edição

## 🎓 **Sistema de Classificação**

### **CDU (Classificação Decimal Universal)**
```
0xx - Generalidades (Informática, Jornalismo)
1xx - Filosofia e Psicologia  
2xx - Religião
3xx - Ciências Sociais
4xx - Linguística
5xx - Ciências Exatas e Naturais
6xx - Ciências Aplicadas e Medicina
7xx - Arte e Recreação
8xx - Literatura
9xx - Geografia e História
```

### **Códigos Cutter**
- **Geração automática** baseada no sobrenome do autor
- **Padronização internacional** para localização
- **Números de chamada** completos (CDU + Cutter)

## 💾 **Tecnologias**

### **Frontend**
- **React 18.3** com Hooks e Context API
- **TypeScript 5.5** para tipagem segura
- **Vite 6.3** para build rápido e desenvolvimento
- **CSS3** com variáveis e grid moderno

### **Serviços**
- **Google Books API** para descoberta de livros
- **localStorage** para persistência de dados
- **Service Workers** para cache offline

### **Ferramentas**
- **ESLint** para qualidade de código
- **Prettier** para formatação consistente
- **Husky** para git hooks

## 🚀 **Deploy**

### **Vercel (Recomendado)**
```bash
npm install -g vercel
vercel --prod
```

### **Netlify**
```bash
npm run build
# Upload da pasta dist/
```

### **GitHub Pages**
```bash
npm run build
npm run deploy
```

## 🤝 **Contribuição**

1. **Fork** o projeto
2. **Crie sua branch** (`git checkout -b feature/nova-funcionalidade`)
3. **Commit suas mudanças** (`git commit -m 'feat: adiciona nova funcionalidade'`)
4. **Push para a branch** (`git push origin feature/nova-funcionalidade`)
5. **Abra um Pull Request**

## 📄 **Licença**

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👥 **Autores**

- **Vitória Camargo** - *Desenvolvimento inicial* - [@vpaesi](https://github.com/vpaesi)

## 🙏 **Agradecimentos**

- **Google Books API** pela base de dados de livros
- **Sistema CDU** pela classificação bibliotecária
- **Comunidade React** pelas ferramentas e bibliotecas

---

<div align="center">
  
  **📚 Organize seu acervo com a precisão de um bibliotecário profissional 📚**
  
  [⭐ Star este projeto](https://github.com/vpaesi/acerVi) • [🐛 Reportar Bug](https://github.com/vpaesi/acerVi/issues) • [💡 Sugerir Feature](https://github.com/vpaesi/acerVi/issues)
  
</div>
