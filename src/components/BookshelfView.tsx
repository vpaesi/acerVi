import { PersonalBook } from '../types/personalLibrary';
import './BookshelfView.css';

interface BookshelfViewProps {
  books: PersonalBook[];
  onUpdateStatus: (id: string, status: PersonalBook['status']) => void;
  onToggleFavorite: (id: string, current?: boolean) => void;
  onRemove: (id: string) => void;
}

export const BookshelfView: React.FC<BookshelfViewProps> = ({
  books,
  onUpdateStatus,
  onToggleFavorite,
  onRemove,
}) => {
  // Agrupa livros por classificação CDU principal (primeira classificação)
  const groupedBooks = books.reduce((groups, book) => {
    const mainCategory = book.cduCode ? book.cduCode.charAt(0) : 'sem-classificacao';
    if (!groups[mainCategory]) {
      groups[mainCategory] = [];
    }
    groups[mainCategory].push(book);
    return groups;
  }, {} as Record<string, PersonalBook[]>);

  // Ordena as categorias
  const sortedCategories = Object.keys(groupedBooks).sort((a, b) => {
    if (a === 'sem-classificacao') return 1;
    if (b === 'sem-classificacao') return -1;
    return a.localeCompare(b);
  });

  const getCategoryName = (categoryCode: string): string => {
    if (categoryCode === 'sem-classificacao') return 'Sem Classificação';
    
    const categoryMap: Record<string, string> = {
      '0': 'Generalidades',
      '1': 'Filosofia e Psicologia',
      '2': 'Religião',
      '3': 'Ciências Sociais',
      '4': 'Linguística',
      '5': 'Ciências Exatas e Naturais',
      '6': 'Ciências Aplicadas e Medicina',
      '7': 'Arte e Recreação',
      '8': 'Literatura',
      '9': 'Geografia e História'
    };
    
    return categoryMap[categoryCode] || `Categoria ${categoryCode}`;
  };

  return (
    <div className="bookshelf-container">
      {sortedCategories.map(category => (
        <BookshelfSection
          key={category}
          title={`${category !== 'sem-classificacao' ? category + ' - ' : ''}${getCategoryName(category)}`}
          books={groupedBooks[category]}
          onUpdateStatus={onUpdateStatus}
          onToggleFavorite={onToggleFavorite}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
};

interface BookshelfSectionProps {
  title: string;
  books: PersonalBook[];
  onUpdateStatus: (id: string, status: PersonalBook['status']) => void;
  onToggleFavorite: (id: string, current?: boolean) => void;
  onRemove: (id: string) => void;
}

const BookshelfSection: React.FC<BookshelfSectionProps> = ({
  title,
  books,
  onUpdateStatus,
  onToggleFavorite,
  onRemove,
}) => {
  // Organiza livros em prateleiras (máximo 8 livros por prateleira para visualização)
  const booksPerShelf = 8;
  const shelves: PersonalBook[][] = [];
  
  for (let i = 0; i < books.length; i += booksPerShelf) {
    shelves.push(books.slice(i, i + booksPerShelf));
  }

  return (
    <div className="bookshelf-section">
      <h3 className="section-title">{title}</h3>
      <div className="bookshelf">
        {shelves.map((shelf, shelfIndex) => (
          <div key={shelfIndex} className="shelf">
            <div className="shelf-books">
              {shelf.map(book => (
                <BookSpine
                  key={book.id}
                  book={book}
                  onUpdateStatus={onUpdateStatus}
                  onToggleFavorite={onToggleFavorite}
                  onRemove={onRemove}
                />
              ))}
            </div>
            <div className="shelf-board"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

interface BookSpineProps {
  book: PersonalBook;
  onUpdateStatus: (id: string, status: PersonalBook['status']) => void;
  onToggleFavorite: (id: string, current?: boolean) => void;
  onRemove: (id: string) => void;
}

const BookSpine: React.FC<BookSpineProps> = ({
  book,
  onUpdateStatus,
  onToggleFavorite,
  onRemove,
}) => {
  const getStatusColor = (status: PersonalBook['status']) => {
    switch (status) {
      case 'lido': return '#28a745';
      case 'lendo': return '#007bff';
      case 'quero-ler': return '#ffc107';
      case 'não-lido': return '#6c757d';
      case 'abandonado': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const getSpineHeight = () => {
    // Varia a altura baseada no número de páginas
    const baseHeight = 180;
    const pageHeight = book.pageCount ? Math.min(book.pageCount / 10, 80) : 0;
    return baseHeight + pageHeight;
  };

  const getSpineColor = () => {
    // Cores baseadas na classificação CDU
    const cduColors: Record<string, string> = {
      '0': '#8B4513', // Marrom - Generalidades
      '1': '#4B0082', // Índigo - Filosofia
      '2': '#FFD700', // Dourado - Religião
      '3': '#FF6347', // Tomate - Ciências Sociais
      '4': '#32CD32', // Verde lima - Linguística
      '5': '#1E90FF', // Azul - Ciências Exatas
      '6': '#FF69B4', // Rosa - Ciências Aplicadas
      '7': '#FF8C00', // Laranja - Arte
      '8': '#9370DB', // Violeta - Literatura
      '9': '#CD853F', // Peru - Geografia/História
    };
    
    const mainCategory = book.cduCode ? book.cduCode.charAt(0) : '0';
    return cduColors[mainCategory] || '#6c757d';
  };

  return (
    <div 
      className="book-spine"
      style={{ 
        height: getSpineHeight(),
        backgroundColor: getSpineColor(),
        borderLeft: `4px solid ${getStatusColor(book.status)}`
      }}
      title={`${book.title} - ${book.authors.join(', ')}\nCDU: ${book.cduCode || 'N/A'}\nCutter: ${book.cutterCode || 'N/A'}\nChamada: ${book.callNumber || 'N/A'}`}
    >
      <div className="book-spine-content">
        <div className="book-spine-title">
          {book.title}
        </div>
        <div className="book-spine-author">
          {book.authors[0]}
        </div>
        <div className="book-spine-call-number">
          {book.callNumber || (book.cduCode && book.cutterCode ? `${book.cduCode} ${book.cutterCode}` : '')}
        </div>
        
        {book.favorite && (
          <div className="book-spine-favorite">❤️</div>
        )}
        
        {book.rating && (
          <div className="book-spine-rating">
            {'⭐'.repeat(book.rating)}
          </div>
        )}
      </div>

      <div className="book-spine-actions">
        <select
          value={book.status}
          onChange={(e) => onUpdateStatus(book.id, e.target.value as PersonalBook['status'])}
          className="spine-status-select"
          onClick={(e) => e.stopPropagation()}
        >
          <option value="não-lido">Não Lido</option>
          <option value="quero-ler">Quero Ler</option>
          <option value="lendo">Lendo</option>
          <option value="lido">Lido</option>
          <option value="abandonado">Abandonado</option>
        </select>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(book.id, book.favorite);
          }}
          className="spine-favorite-btn"
          title={book.favorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
          {book.favorite ? '❤️' : '🤍'}
        </button>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove(book.id);
          }}
          className="spine-remove-btn"
          title="Remover do acervo"
        >
          🗑️
        </button>
      </div>
    </div>
  );
};
