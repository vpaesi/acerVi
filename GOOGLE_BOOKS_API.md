# Google Books API - Componentes React

Este projeto implementa componentes React para integração com a Google Books API, permitindo buscar e exibir informações de livros.

## 📋 Estrutura do Projeto

```
src/
├── components/
│   ├── BookSearch.tsx       # Componente principal de busca
│   └── BookSearch.css       # Estilos do componente
├── hooks/
│   └── useGoogleBooks.ts    # Hook personalizado para API
├── services/
│   └── googleBooksApi.ts    # Serviço da Google Books API
├── types/
│   └── book.ts             # Interfaces TypeScript
└── pages/
    └── Home.tsx            # Exemplo de uso
```

## 🚀 Funcionalidades

### GoogleBooksService
Serviço para interagir com a Google Books API:

- `searchBooks(params)` - Busca geral com parâmetros customizáveis
- `searchByTitle(title)` - Busca por título específico
- `searchByAuthor(author)` - Busca por autor
- `searchByISBN(isbn)` - Busca por ISBN
- `getBookById(id)` - Busca livro específico por ID

### BookSearch Component
Componente React com interface completa de busca:

- Busca por diferentes critérios (geral, título, autor, ISBN)
- Exibição em grid responsivo
- Loading states e tratamento de erros
- Callback para seleção de livros
- Informações detalhadas dos livros (capa, título, autor, etc.)

### useGoogleBooks Hook
Hook personalizado que encapsula a lógica da API:

```typescript
const {
  books,
  loading,
  error,
  totalItems,
  searchBooks,
  searchByTitle,
  searchByAuthor,
  searchByISBN,
  getBookById,
  clearResults,
  clearError
} = useGoogleBooks();
```

## 💻 Como Usar

### 1. Busca Simples
```tsx
import { BookSearch } from '../components/BookSearch';

function MyComponent() {
  const handleBookSelect = (book) => {
    console.log('Livro selecionado:', book);
  };

  return (
    <BookSearch 
      onBookSelect={handleBookSelect}
      maxResults={10}
    />
  );
}
```

### 2. Usando o Hook Diretamente
```tsx
import { useGoogleBooks } from '../hooks/useGoogleBooks';

function MyComponent() {
  const { books, loading, error, searchByTitle } = useGoogleBooks();

  const handleSearch = async () => {
    await searchByTitle('Harry Potter');
  };

  return (
    <div>
      <button onClick={handleSearch}>Buscar</button>
      {loading && <p>Carregando...</p>}
      {error && <p>Erro: {error}</p>}
      {books.map(book => (
        <div key={book.id}>{book.volumeInfo.title}</div>
      ))}
    </div>
  );
}
```

### 3. Usando o Serviço Diretamente
```typescript
import { GoogleBooksService } from '../services/googleBooksApi';

// Busca geral
const results = await GoogleBooksService.searchBooks({
  query: 'javascript programming',
  maxResults: 10,
  orderBy: 'relevance'
});

// Busca por ISBN
const book = await GoogleBooksService.searchByISBN('9780134685991');
```

## 🎨 Personalização CSS

O componente inclui estilos CSS responsivos. Você pode personalizar as seguintes classes:

- `.book-search` - Container principal
- `.search-inputs` - Container dos inputs de busca
- `.books-grid` - Grid dos resultados
- `.book-card` - Card individual do livro
- `.book-image` - Container da imagem
- `.book-info` - Informações do livro

## 📚 Tipos de Busca Disponíveis

1. **Busca Geral**: Busca em todos os campos
2. **Por Título**: Busca específica no título (`intitle:`)
3. **Por Autor**: Busca específica no autor (`inauthor:`)
4. **Por ISBN**: Busca específica por ISBN (`isbn:`)

## 🔧 Parâmetros de Busca

```typescript
interface BookSearchParams {
  query: string;                    // Termo de busca (obrigatório)
  maxResults?: number;              // Máximo de resultados (padrão: 10)
  startIndex?: number;              // Índice inicial para paginação
  orderBy?: 'relevance' | 'newest'; // Ordenação
  filter?: 'partial' | 'full' | 'free-ebooks' | 'paid-ebooks' | 'ebooks';
  langRestrict?: string;            // Código do idioma (ex: 'pt', 'en')
  printType?: 'all' | 'books' | 'magazines';
}
```

## 📱 Responsividade

O componente é totalmente responsivo:
- Desktop: Grid com múltiplas colunas
- Tablet: Grid adaptativo
- Mobile: Coluna única, inputs empilhados

## ⚠️ Limitações da API

- Google Books API: 1000 requisições/dia (gratuito)
- Alguns livros podem não ter todas as informações
- Imagens podem não estar disponíveis para todos os livros

## 🛠️ Exemplo Completo

Veja o arquivo `src/pages/Home.tsx` para um exemplo completo de implementação com:
- Busca de livros
- Seleção e exibição de detalhes
- Interface responsiva
