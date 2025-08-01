import { useState, useEffect, useCallback } from 'react';
import { usePersonalLibrary } from '../hooks/usePersonalLibrary';
import { BookSearchModal } from './BookSearchModal';
import { BookshelfView } from './BookshelfView';
import { StatisticsCharts } from './StatisticsCharts';
import { BookDetailsModal } from './BookDetailsModal';
import { EditBookModal } from './EditBookModal';
import { Footer } from './Footer';
import { PersonalBook } from '../types/personalLibrary';
import { loadSampleData } from '../data/sampleBooks';
import { getMainCategories } from '../services/cduService';
import { formatStatus } from '../utils/formatStatus';
import './PersonalLibrarySidebar.css';

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
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<PersonalBook | null>(null);
  const [selectedBook, setSelectedBook] = useState<PersonalBook | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    const savedPreference = localStorage.getItem('acervi-sidebar-open');
    return savedPreference ? JSON.parse(savedPreference) : false;
  });
  const [searchText, setSearchText] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [selectedCondition, setSelectedCondition] = useState<string>('');
  const [selectedCDUCategory, setSelectedCDUCategory] = useState<string>('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'bookshelf'>('grid');
  const sortField = 'addedAt' as const;
  const sortDirection = 'desc' as const;

  useEffect(() => {
    localStorage.setItem('acervi-sidebar-open', JSON.stringify(sidebarOpen));
  }, [sidebarOpen]);

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
    if (showFavoritesOnly) filters.favorite = true;
    if (selectedCDUCategory) filters.cduMainCategory = selectedCDUCategory;
    
    setFilters(filters);
    setSorting(sortField, sortDirection);
  }, [searchText, selectedStatus, selectedCondition, showFavoritesOnly, selectedCDUCategory, setFilters, setSorting, sortField, sortDirection]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const handleAddBook = (book: Omit<PersonalBook, 'id' | 'addedAt' | 'updatedAt'>) => {
    addBook(book);
  };

  const handleUpdateStatus = (bookId: string, status: PersonalBook['status']) => {
    updateBook(bookId, { status });
  };

  const handleToggleFavorite = (bookId: string) => {
    const book = books.find(b => b.id === bookId);
    if (book) {
      updateBook(bookId, { favorite: !book.favorite });
    }
  };

  const handleRemoveBook = (bookId: string) => {
    if (window.confirm('Tem certeza que deseja remover este livro do seu acervo?')) {
      removeBook(bookId);
    }
  };

  const handleEditBook = (book: PersonalBook) => {
    setEditingBook(book);
    setEditModalOpen(true);
    if (detailsModalOpen) {
      setDetailsModalOpen(false);
      setSelectedBook(null);
    }
  };

  const handleViewBookDetails = (book: PersonalBook) => {
    setSelectedBook(book);
    setDetailsModalOpen(true);
  };

  const handleCloseDetailsModal = () => {
    setDetailsModalOpen(false);
    setSelectedBook(null);
  };

  const handleSaveEdit = (id: string, updates: Partial<PersonalBook>) => {
    updateBook(id, updates);
    setEditModalOpen(false);
    setEditingBook(null);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setEditingBook(null);
  };

  if (loading) {
    return <div className="loading">Carregando acervo...</div>;
  }

  return (
    <div className="personal-library">
      <header className="app-header">
        <button 
          className={`menu-toggle ${sidebarOpen ? 'active' : ''}`}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label={sidebarOpen ? 'Fechar menu lateral' : 'Abrir menu lateral'}
          title={sidebarOpen ? 'Fechar menu lateral' : 'Abrir menu lateral'}
        >
          <span className="hamburger">☰</span>
        </button>
        <h1 className="app-title">AcerVi - Meu Acervo Pessoal</h1>
        <div className="header-stats">
          <span className="quick-stat">{stats.total} livros</span>
        </div>
      </header>

      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>}

      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-content">
          <section className="stats-section">
            <StatisticsCharts stats={stats} />
          </section>

          <section className="search-section">
            <h3>Buscar</h3>
            <input
              type="text"
              placeholder="Buscar em meu acervo..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && applyFilters()}
              className="search-input"
            />
          </section>

          <section className="filters-section">
            <h3>Filtros</h3>
            
            <div className="filter-group">
              <label>Status</label>
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
            </div>

            <div className="filter-group">
              <label>Condição</label>
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
            </div>

            <div className="filter-group">
              <label>Classificação CDU</label>
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
            </div>

            <div className="filter-group">
              <button
                className={`toggle-button ${showFavoritesOnly ? 'active' : ''}`}
                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                type="button"
              >
                ⭐ Apenas favoritos
              </button>
            </div>
          </section>

          <section className="view-section">
            <h3>Visualização</h3>
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
          </section>

          <section className="actions-section">
            <button
              onClick={() => setSearchModalOpen(true)}
              className="add-book-button"
            >
              📚 Adicionar Livro
            </button>
            
            <button
              onClick={() => {
                setSearchText('');
                setSelectedStatus('');
                setSelectedCondition('');
                setSelectedCDUCategory('');
                setShowFavoritesOnly(false);
                clearFilters();
              }}
              className="clear-filters-button"
            >
              Limpar Filtros
            </button>

            {books.length === 0 && (
              <button
                onClick={() => {
                  loadSampleData();
                  window.location.reload();
                }}
                className="load-sample-button"
              >
                Carregar Dados de Exemplo
              </button>
            )}
          </section>
        </div>
      </aside>

      <main className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
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
                onToggleFavorite={handleToggleFavorite}
              />
            ) : (
              <div className="books-grid">
                {filteredBooks.map((book) => (
                  <div 
                    key={book.id} 
                    className="book-card"
                    onClick={() => handleViewBookDetails(book)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="book-card-header">
                      <button
                        className={`favorite-btn ${book.favorite ? 'active' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleFavorite(book.id);
                        }}
                        title={book.favorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                      >
                        {book.favorite ? '⭐' : '☆'}
                      </button>
                      <button
                        className="edit-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditBook(book);
                        }}
                        title="Editar livro"
                      >
                        ✏️
                      </button>
                    </div>
                    
                    {book.imageUrl && (
                      <img 
                        src={book.imageUrl} 
                        alt={`Capa de ${book.title}`} 
                        className="book-cover" 
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    )}
                    
                    <div className="book-info">
                      <h3 className="book-title">{book.title}</h3>
                      <p className="book-authors">{book.authors?.join(', ')}</p>
                      
                      <div className="book-meta">                                              
                        {book.cduCode && (
                          <span className="cdu-code" title={book.description || ''}>
                            CDU: {book.cduCode}
                          </span>
                        )}
                        
                        {book.cutterCode && (
                          <span className="cutter-code">
                            Cutter: {book.cutterCode}
                          </span>
                        )}

                         <span className={`status-badge status-${book.status}`}>
                          {formatStatus(book.status)}
                        </span>

                      </div>                     
                      
                      {book.personalNotes && (
                        <p className="book-notes">{book.personalNotes}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )
          )}
        </div>

        <Footer />
      </main>

      <BookSearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onAddToLibrary={handleAddBook}
      />

      <EditBookModal
        isOpen={editModalOpen}
        book={editingBook}
        onClose={handleCloseEditModal}
        onSave={handleSaveEdit}
        onRemove={handleRemoveBook}
      />

      <BookDetailsModal
        isOpen={detailsModalOpen}
        book={selectedBook}
        onClose={handleCloseDetailsModal}
        onEdit={handleEditBook}
        onToggleFavorite={handleToggleFavorite}
        onUpdateStatus={handleUpdateStatus}
        onRemove={handleRemoveBook}
      />
    </div>
  );
};
