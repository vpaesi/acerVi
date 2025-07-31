import { useState, useEffect, useCallback } from 'react';
import { usePersonalLibrary } from '../hooks/usePersonalLibrary';
import { BookSearchModal } from './BookSearchModal';
import { BookshelfView } from './BookshelfView';
import { EditBookModal } from './EditBookModal';
import { PersonalBook } from '../types/personalLibrary';
import { loadSampleData } from '../data/sampleBooks';
import { getMainCategories } from '../services/cduService';
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
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<PersonalBook | null>(null);
  const [searchText, setSearchText] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [selectedCondition, setSelectedCondition] = useState<string>('');
  const [selectedCDUCategory, setSelectedCDUCategory] = useState<string>('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'bookshelf'>('grid');
  const sortField = 'addedAt' as const;
  const sortDirection = 'desc' as const;

  // Aplica filtros
  const applyFilters = useCallback(() => {
    const filters: {
      searchText?: string;
      status?: string[];
      condition?: string[];
      favorite?: boolean;
      cduMainCategory?: string;
    } = {};
    
    if (searchText) filters.searchText = searchText;
    if (selectedStatus) filters.status = [selectedStatus];
    if (selectedCondition) filters.condition = [selectedCondition];
    if (selectedCDUCategory) filters.cduMainCategory = selectedCDUCategory;
    if (showFavoritesOnly) filters.favorite = true;
    
    setFilters(filters);
    setSorting(sortField, sortDirection);
  }, [searchText, selectedStatus, selectedCondition, selectedCDUCategory, showFavoritesOnly, setFilters, setSorting, sortField, sortDirection]);

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

  const handleEditBook = (book: PersonalBook) => {
    setEditingBook(book);
    setEditModalOpen(true);
  };

  const handleSaveEdit = (bookId: string, updates: Partial<PersonalBook>) => {
    updateBook(bookId, updates);
    setEditModalOpen(false);
    setEditingBook(null);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setEditingBook(null);
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

          <select
            value={selectedCDUCategory}
            onChange={(e) => setSelectedCDUCategory(e.target.value)}
            className="filter-select"
          >
            <option value="">Todas as classificações CDU</option>
            {getMainCategories().map((category) => (
              <option key={category.code} value={category.code}>
                {category.code} - {category.description}
              </option>
            ))}
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

        <div className="view-controls">
          <div className="view-mode-toggle">
            <button
              className={`view-mode-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              📋 Grade
            </button>
            <button
              className={`view-mode-btn ${viewMode === 'bookshelf' ? 'active' : ''}`}
              onClick={() => setViewMode('bookshelf')}
            >
              📚 Estante
            </button>
          </div>
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
          viewMode === 'bookshelf' ? (
            <BookshelfView 
              books={filteredBooks}
              onUpdateStatus={handleUpdateStatus}
              onToggleFavorite={handleToggleFavorite}
              onRemove={handleRemoveBook}
            />
          ) : (
            <div className="books-grid">
              {filteredBooks.map((book) => (
                <PersonalBookCard
                  key={book.id}
                  book={book}
                  onUpdateStatus={handleUpdateStatus}
                  onToggleFavorite={handleToggleFavorite}
                  onRemove={handleRemoveBook}
                  onEdit={handleEditBook}
                />
              ))}
            </div>
          )
        )}
      </div>

      {/* Modal de busca */}
      <BookSearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onAddToLibrary={handleAddBook}
      />

      {/* Modal de edição */}
      <EditBookModal
        isOpen={editModalOpen}
        book={editingBook}
        onClose={handleCloseEditModal}
        onSave={handleSaveEdit}
      />
    </div>
  );
};

// Estilos CSS para os controles
const styles = `
.view-controls {
  margin-left: auto;
}

.view-mode-toggle {
  display: flex;
  gap: 8px;
  background: #f5f5f5;
  border-radius: 8px;
  padding: 4px;
}

.view-mode-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border: none;
  background: transparent;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: #666;
  transition: all 0.2s ease;
}

.view-mode-btn:hover {
  background: rgba(255, 255, 255, 0.8);
  color: #333;
}

.view-mode-btn.active {
  background: white;
  color: #2563eb;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.library-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
  margin-bottom: 24px;
  padding: 16px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.filters-section {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
}

.filter-select {
  padding: 8px 12px;
  border: 2px solid #e2e8f0;
  border-radius: 6px;
  font-size: 14px;
  min-width: 150px;
  cursor: pointer;
  transition: border-color 0.2s ease;
}

.filter-select:focus {
  outline: none;
  border-color: #2563eb;
}

.favorites-filter {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  cursor: pointer;
  color: #475569;
}

@media (max-width: 768px) {
  .library-controls {
    flex-direction: column;
    align-items: stretch;
  }

  .filters-section {
    flex-direction: column;
    align-items: stretch;
  }

  .filter-select {
    min-width: auto;
  }

  .view-controls {
    margin-left: 0;
  }
}

/* Estilos para informações de catalogação */
.cataloging-info {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 8px 0;
}

.cdu-badge,
.cutter-badge,
.call-number-badge {
  display: inline-block;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
  font-family: monospace;
}

.cdu-badge {
  background: #dbeafe;
  color: #1e40af;
  border: 1px solid #93c5fd;
}

.cutter-badge {
  background: #dcfce7;
  color: #166534;
  border: 1px solid #86efac;
}

.call-number-badge {
  background: #fef3c7;
  color: #92400e;
  border: 1px solid #fcd34d;
}

/* Estilos para botões de ação */
.book-actions {
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
}

.edit-button,
.remove-button {
  padding: 6px 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
}

.edit-button {
  background: #f3f4f6;
  color: #374151;
}

.edit-button:hover {
  background: #e5e7eb;
  transform: scale(1.05);
}

.remove-button {
  background: #fee2e2;
  color: #dc2626;
}

.remove-button:hover {
  background: #fecaca;
  transform: scale(1.05);
}

.status-select {
  flex: 1;
  min-width: 120px;
  padding: 6px 8px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 12px;
}
`;

// Injetar estilos
if (typeof document !== 'undefined' && !document.getElementById('personal-library-styles')) {
  const styleElement = document.createElement('style');
  styleElement.id = 'personal-library-styles';
  styleElement.textContent = styles;
  document.head.appendChild(styleElement);
}

interface PersonalBookCardProps {
  book: PersonalBook;
  onUpdateStatus: (id: string, status: PersonalBook['status']) => void;
  onToggleFavorite: (id: string, current?: boolean) => void;
  onRemove: (id: string) => void;
  onEdit: (book: PersonalBook) => void;
}

const PersonalBookCard: React.FC<PersonalBookCardProps> = ({
  book,
  onUpdateStatus,
  onToggleFavorite,
  onRemove,
  onEdit,
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

        {/* Informações de catalogação bibliotecária */}
        {(book.cduCode || book.cutterCode || book.callNumber) && (
          <div className="cataloging-info">
            {book.cduCode && (
              <span className="cdu-badge">CDU: {book.cduCode}</span>
            )}
            {book.cutterCode && (
              <span className="cutter-badge">Cutter: {book.cutterCode}</span>
            )}
            {book.callNumber && (
              <span className="call-number-badge">Nº: {book.callNumber}</span>
            )}
          </div>
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

        {book.physicalLocation && (
          <p className="book-location">📍 {book.physicalLocation}</p>
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
            onClick={() => onEdit(book)}
            className="edit-button"
            title="Editar livro"
          >
            ✏️
          </button>
          
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
