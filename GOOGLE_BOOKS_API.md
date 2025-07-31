# AcerVi - Sistema de Gerenciamento de Acervo Pessoal

O **AcerVi** é uma aplicação React/TypeScript para gerenciar seu acervo pessoal de livros, com integração à Google Books API para descobrir novas leituras.

## 🏠 **Funcionalidades Principais**

### **Acervo Pessoal (Foco Principal)**
- ✅ **Gestão completa do seu acervo físico real**
- ✅ Status de leitura (Não Lido, Lendo, Lido, Quero Ler, Abandonado)
- ✅ Sistema de avaliações (1-5 estrelas)
- ✅ Controle de condição física (Novo, Seminovo, Usado, Danificado)
- ✅ Localização física dos livros (ex: "Estante A, prateleira 2")
- ✅ Notas pessoais e comentários
- ✅ Sistema de favoritos
- ✅ Controle de empréstimos
- ✅ Estatísticas do acervo
- ✅ Filtros avançados e busca

### **Descoberta de Novos Livros (Secundário)**
- 📚 **Botão "Pesquisar por Novas Leituras"**
- 🔍 Busca na Google Books API
- ➕ Adição rápida ao acervo pessoal
- 📝 Formulário completo para catalogação

## 📋 **Estrutura do Projeto**

```
src/
├── components/
│   ├── PersonalLibrary.tsx     # Componente principal do acervo
│   ├── PersonalLibrary.css     # Estilos do acervo
│   ├── BookSearch.tsx          # Busca na Google Books API
│   ├── BookSearch.css          # Estilos da busca
│   ├── BookSearchModal.tsx     # Modal para descobrir livros
│   └── BookSearchModal.css     # Estilos do modal
├── hooks/
│   ├── usePersonalLibrary.ts   # Hook principal do acervo
│   └── useGoogleBooks.ts       # Hook da Google Books API
├── services/
│   ├── personalLibraryService.ts # Gerenciamento de dados locais
│   └── googleBooksApi.ts       # Integração Google Books API
├── types/
│   ├── personalLibrary.ts      # Tipos do acervo pessoal
│   └── book.ts                 # Tipos da Google Books API
├── data/
│   └── sampleBooks.ts          # Dados de exemplo
└── pages/
    └── Home.tsx                # Página principal
```

## 🎯 **Fluxo de Uso**

### **1. Página Principal - Acervo Pessoal**
```tsx
// Componente principal que exibe seu acervo
<PersonalLibrary />
```

**Funcionalidades:**
- Dashboard com estatísticas do acervo
- Grid de livros com informações completas
- Filtros por status, condição, favoritos
- Busca textual no acervo
- Botão "📚 Pesquisar por Novas Leituras"

### **2. Descoberta de Novos Livros (Modal)**
```tsx
// Acionado pelo botão na página principal
<BookSearchModal 
  isOpen={true}
  onClose={() => setOpen(false)}
  onAddToLibrary={handleAddBook}
/>
```

**Funcionalidades:**
- Busca na Google Books API
- Visualização de resultados
- Formulário para adicionar ao acervo
- Definição de status, condição, localização, etc.

## 💾 **Gestão de Dados**

### **Armazenamento Local**
```typescript
// Todos os dados ficam no localStorage do navegador
const books = PersonalLibraryService.loadBooks();
PersonalLibraryService.saveBooks(books);
```

### **Tipos de Dados do Acervo**
```typescript
interface PersonalBook {
  // Informações básicas
  id: string;
  title: string;
  authors: string[];
  isbn?: string;
  
  // Gestão pessoal
  status: 'não-lido' | 'lendo' | 'lido' | 'abandonado' | 'quero-ler';
  rating?: number; // 1-5 estrelas
  condition: 'novo' | 'seminovo' | 'usado' | 'danificado';
  location?: string; // localização física
  personalNotes?: string;
  favorite?: boolean;
  
  // Controle de empréstimo
  loanedTo?: string;
  loanDate?: string;
}
```

## 🎨 **Interface do Usuário**

### **Dashboard do Acervo**
- **Header com estatísticas**: Total, Lidos, Lendo, Favoritos
- **Controles de filtro**: Status, Condição, Busca textual
- **Botão principal**: "📚 Pesquisar por Novas Leituras"
- **Grid responsivo**: Cards dos livros com todas as informações

### **Card do Livro**
- Capa do livro (quando disponível)
- Título e autor
- Status com cores diferenciadas
- Avaliação com estrelas
- Localização física
- Notas pessoais
- Controles rápidos (status, favorito, remover)

### **Modal de Descoberta**
- Interface de busca na Google Books API
- Resultados em grid
- Formulário completo para adicionar ao acervo

## 🚀 **Como Usar**

### **1. Primeira Vez**
```tsx
// Ao abrir pela primeira vez, você pode:
// 1. Adicionar livros manualmente
// 2. Carregar dados de exemplo
loadSampleData(); // 5 livros de exemplo
```

### **2. Gerenciar Acervo**
```typescript
const { 
  books, 
  stats, 
  addBook, 
  updateBook, 
  removeBook,
  setFilters 
} = usePersonalLibrary();

// Adicionar livro
addBook({
  title: "Meu Livro",
  authors: ["Autor"],
  status: "não-lido",
  condition: "novo"
});

// Atualizar status
updateBook(bookId, { status: "lido", rating: 5 });
```

### **3. Descobrir Novos Livros**
```typescript
// Buscar na Google Books API
const { searchBooks } = useGoogleBooks();
await searchBooks({ query: "javascript programming" });

// Adicionar ao acervo pessoal através do modal
```

## 📱 **Responsividade**

- **Desktop**: Grid com múltiplas colunas, filtros inline
- **Tablet**: Grid adaptativo, controles reorganizados  
- **Mobile**: Coluna única, filtros empilhados, interface otimizada

## � **Funcionalidades Avançadas**

### **Filtros e Busca**
- Busca textual (título, autor, notas)
- Filtro por status de leitura
- Filtro por condição física
- Filtro apenas favoritos
- Ordenação por diferentes campos

### **Estatísticas**
- Total de livros no acervo
- Livros lidos vs não lidos
- Livros favoritos
- Livros emprestados
- Média de avaliações
- Total de páginas lidas

### **Exportação/Importação**
```typescript
// Exportar dados
const jsonData = PersonalLibraryService.exportData();

// Importar dados
PersonalLibraryService.importData(jsonData);
```

## � **Casos de Uso**

1. **Bibliotecário Pessoal**: Catalogar e organizar sua biblioteca física
2. **Leitor Ávido**: Acompanhar progresso de leitura e descobrir novos livros
3. **Colecionador**: Controlar condição e localização dos exemplares
4. **Empréstimos**: Rastrear livros emprestados a amigos
5. **Estatísticas**: Analisar hábitos de leitura

---

**O AcerVi coloca seu acervo pessoal em primeiro lugar, com a Google Books API como ferramenta complementar para descobrir e adicionar novos títulos ao seu acervo real.**
