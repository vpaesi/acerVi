import { useState, useEffect, useCallback } from 'react';
import { usePersonalLibrary } from '../hooks/usePersonalLibrary';
import { BookSearchModal } from './BookSearchModal';
import { PersonalBook } from '../types/personalLibrary';
import { loadSampleData } from '../data/sampleBooks';
import './PersonalLibrary.css';

export const PersonalLibrary: React.FC = () => {
  const {
    books,
    filteredBooks,
    stats,
    loading,
    addBook,
    updateBook,
    removeBook,
    setFilters,
    setSorting,
    clearFilters,
  } = usePersonalLibrary();

  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [selectedCondition, setSelectedCondition] = useState<string>('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const sortField = 'addedAt' as const;
  const sortDirection = 'desc' as const;

  // Aplica filtros
  const applyFilters = useCallback(() => {
    const filters: {
      searchText?: string;
      status?: string[];
      condition?: string[];
      favorite?: boolean;
    } = {};
    
    if (searchText) filters.searchText = searchText;
    if (selectedStatus) filters.status = [selectedStatus];
    if (selectedCondition) filters.condition = [selectedCondition];
    if (showFavoritesOnly) filters.favorite = true;
    
    setFilters(filters);
    setSorting(sortField, sortDirection);
  }, [searchText, selectedStatus, selectedCondition, showFavoritesOnly, setFilters, setSorting, sortField, sortDirection]);

  // Efeito para aplicar filtros quando mudam
  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const handleAddBook = (bookData: Omit<PersonalBook, 'id' | 'addedAt' | 'updatedAt'>) => {
    addBook(bookData);
    setSearchModalOpen(false);
  };

  const handleUpdateStatus = (bookId: string, newStatus: PersonalBook['status']) => {
    updateBook(bookId, { status: newStatus });
  };

  const handleToggleFavorite = (bookId: string, currentFavorite?: boolean) => {
    updateBook(bookId, { favorite: !currentFavorite });
  };

  const handleRemoveBook = (bookId: string) => {
    if (window.confirm('Tem certeza que deseja remover este livro do seu acervo?')) {
      removeBook(bookId);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Carregando sua biblioteca...</p>
      </div>
    );
  }

  return (
    <div className="personal-library">
      {/* Header com estatísticas */}
      <header className="library-header">
        <div className="header-content">
          <h1>Meu Acervo Pessoal</h1>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">{stats.total}</div>
              <div className="stat-label">Total de Livros</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{stats.read}</div>
              <div className="stat-label">Lidos</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{stats.reading}</div>
              <div className="stat-label">Lendo</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{stats.wantToRead}</div>
              <div className="stat-label">Quero Ler</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{stats.favorites}</div>
              <div className="stat-label">Favoritos</div>
            </div>
          </div>
        </div>
      </header>

      {/* Filtros e controles */}
      <div className="library-controls">
        <div className="search-section">
          <input
            type="text"
            placeholder="Buscar em meu acervo..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && applyFilters()}
            className="search-input"
          />
          <button onClick={applyFilters} className="filter-button">
            Filtrar
          </button>
        </div>

        <div className="filters-section">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="filter-select"
          >
            <option value="">Todos os status</option>
            <option value="não-lido">Não Lido</option>
            <option value="lendo">Lendo</option>
            <option value="lido">Lido</option>
            <option value="quero-ler">Quero Ler</option>
            <option value="abandonado">Abandonado</option>
          </select>

          <select
            value={selectedCondition}
            onChange={(e) => setSelectedCondition(e.target.value)}
            className="filter-select"
          >
            <option value="">Todas as condições</option>
            <option value="novo">Novo</option>
            <option value="seminovo">Seminovo</option>
            <option value="usado">Usado</option>
            <option value="danificado">Danificado</option>
          </select>

          <label className="favorites-filter">
            <input
              type="checkbox"
              checked={showFavoritesOnly}
              onChange={(e) => setShowFavoritesOnly(e.target.checked)}
            />
            Apenas favoritos
          </label>
        </div>

        <div className="actions-section">
          <button
            onClick={() => setSearchModalOpen(true)}
            className="add-book-button"
          >
            📚 Pesquisar por Novas Leituras
          </button>
          
          <button
            onClick={clearFilters}
            className="clear-filters-button"
          >
            Limpar Filtros
          </button>
        </div>
      </div>

      {/* Grid de livros */}
      <div className="books-section">
        {filteredBooks.length === 0 ? (
          <div className="empty-state">
            {books.length === 0 ? (
              <div className="no-books">
                <h3>Seu acervo está vazio</h3>
                <p>Comece adicionando seus primeiros livros!</p>
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => setSearchModalOpen(true)}
                    className="add-first-book"
                  >
                    Adicionar Primeiro Livro
                  </button>
                  <button
                    onClick={() => {
                      loadSampleData();
                      window.location.reload();
                    }}
                    className="load-sample-button"
                  >
                    Carregar Dados de Exemplo
                  </button>
                </div>
              </div>
            ) : (
              <div className="no-results">
                <h3>Nenhum livro encontrado</h3>
                <p>Tente ajustar os filtros de busca</p>
              </div>
            )}
          </div>
        ) : (
          <div className="books-grid">
            {filteredBooks.map((book) => (
              <PersonalBookCard
                key={book.id}
                book={book}
                onUpdateStatus={handleUpdateStatus}
                onToggleFavorite={handleToggleFavorite}
                onRemove={handleRemoveBook}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal de busca */}
      <BookSearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onAddToLibrary={handleAddBook}
      />
    </div>
  );
};

interface PersonalBookCardProps {
  book: PersonalBook;
  onUpdateStatus: (id: string, status: PersonalBook['status']) => void;
  onToggleFavorite: (id: string, current?: boolean) => void;
  onRemove: (id: string) => void;
}

const PersonalBookCard: React.FC<PersonalBookCardProps> = ({
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

  const getStatusLabel = (status: PersonalBook['status']) => {
    switch (status) {
      case 'lido': return 'Lido';
      case 'lendo': return 'Lendo';
      case 'quero-ler': return 'Quero Ler';
      case 'não-lido': return 'Não Lido';
      case 'abandonado': return 'Abandonado';
      default: return status;
    }
  };

  return (
    <div className="personal-book-card">
      <div className="book-image">
        {book.imageUrl ? (
          <img src={book.imageUrl} alt={book.title} />
        ) : (
          <div className="no-image">Sem imagem</div>
        )}
        
        <button
          className={`favorite-button ${book.favorite ? 'favorited' : ''}`}
          onClick={() => onToggleFavorite(book.id, book.favorite)}
          title={book.favorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
          {book.favorite ? '❤️' : '🤍'}
        </button>
      </div>

      <div className="book-content">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-authors">{book.authors.join(', ')}</p>
        
        {book.publisher && (
          <p className="book-publisher">{book.publisher}</p>
        )}

        <div className="book-meta">
          <span 
            className="status-badge"
            style={{ backgroundColor: getStatusColor(book.status) }}
          >
            {getStatusLabel(book.status)}
          </span>
          
          <span className="condition-badge">{book.condition}</span>
          
          {book.rating && (
            <span className="rating">
              {'⭐'.repeat(book.rating)}
            </span>
          )}
        </div>

        {book.location && (
          <p className="book-location">📍 {book.location}</p>
        )}

        {book.personalNotes && (
          <p className="book-notes">📝 {book.personalNotes}</p>
        )}

        <div className="book-actions">
          <select
            value={book.status}
            onChange={(e) => onUpdateStatus(book.id, e.target.value as PersonalBook['status'])}
            className="status-select"
          >
            <option value="não-lido">Não Lido</option>
            <option value="quero-ler">Quero Ler</option>
            <option value="lendo">Lendo</option>
            <option value="lido">Lido</option>
            <option value="abandonado">Abandonado</option>
          </select>
          
          <button
            onClick={() => onRemove(book.id)}
            className="remove-button"
            title="Remover do acervo"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
};
