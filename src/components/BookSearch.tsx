import React, { useState, useCallback } from 'react';
import { GoogleBooksService } from '../services/googleBooksApi';
import { Book, GoogleBooksResponse } from '../types/book';
import './BookSearch.css';

interface BookSearchProps {
  onBookSelect?: (book: Book) => void;
  maxResults?: number;
}

export const BookSearch: React.FC<BookSearchProps> = ({ 
  onBookSelect, 
  maxResults = 10 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<'general' | 'title' | 'author' | 'isbn'>('general');
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalItems, setTotalItems] = useState(0);

  const handleSearch = useCallback(async () => {
    if (!searchQuery.trim()) {
      setError('Digite um termo para buscar');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let response: GoogleBooksResponse;

      switch (searchType) {
        case 'title':
          response = await GoogleBooksService.searchByTitle(searchQuery, maxResults);
          break;
        case 'author':
          response = await GoogleBooksService.searchByAuthor(searchQuery, maxResults);
          break;
        case 'isbn':
          response = await GoogleBooksService.searchByISBN(searchQuery);
          break;
        default:
          response = await GoogleBooksService.searchBooks({
            query: searchQuery,
            maxResults
          });
      }

      setBooks(response.items || []);
      setTotalItems(response.totalItems);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao buscar livros');
      setBooks([]);
      setTotalItems(0);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, searchType, maxResults]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="book-search">
      <div className="search-container">
        <div className="search-inputs">
          <select 
            value={searchType} 
            onChange={(e) => setSearchType(e.target.value as 'general' | 'title' | 'author' | 'isbn')}
            className="search-type-select"
          >
            <option value="general">Busca Geral</option>
            <option value="title">Por Título</option>
            <option value="author">Por Autor</option>
            <option value="isbn">Por ISBN</option>
          </select>
          
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={`Buscar ${searchType === 'general' ? 'livros' : searchType === 'isbn' ? 'por ISBN' : `por ${searchType}`}...`}
            className="search-input"
            disabled={loading}
          />
          
          <button 
            onClick={handleSearch} 
            disabled={loading || !searchQuery.trim()}
            className="search-button"
          >
            {loading ? 'Buscando...' : 'Buscar'}
          </button>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {totalItems > 0 && (
          <div className="search-info">
            Encontrados {totalItems} resultado(s). Mostrando {books.length} livro(s).
          </div>
        )}
      </div>

      <div className="books-grid">
        {books.map((book) => (
          <BookCard 
            key={book.id} 
            book={book} 
            onSelect={() => onBookSelect?.(book)}
          />
        ))}
      </div>

      {books.length === 0 && !loading && !error && (
        <div className="no-results">
          Use a busca acima para encontrar livros
        </div>
      )}
    </div>
  );
};

interface BookCardProps {
  book: Book;
  onSelect?: () => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onSelect }) => {
  const { volumeInfo } = book;
  const thumbnail = volumeInfo.imageLinks?.thumbnail || volumeInfo.imageLinks?.smallThumbnail;
  
  return (
    <div className="book-card" onClick={onSelect}>
      <div className="book-image">
        {thumbnail ? (
          <img 
            src={thumbnail} 
            alt={volumeInfo.title}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        ) : (
          <div className="no-image">
            Sem imagem
          </div>
        )}
      </div>
      
      <div className="book-info">
        <h3 className="book-title">{volumeInfo.title}</h3>
        
        {volumeInfo.authors && (
          <p className="book-authors">
            {volumeInfo.authors.join(', ')}
          </p>
        )}
        
        {volumeInfo.publishedDate && (
          <p className="book-date">
            {new Date(volumeInfo.publishedDate).getFullYear()}
          </p>
        )}
        
        {volumeInfo.publisher && (
          <p className="book-publisher">
            {volumeInfo.publisher}
          </p>
        )}
        
        {volumeInfo.pageCount && (
          <p className="book-pages">
            {volumeInfo.pageCount} páginas
          </p>
        )}

        {volumeInfo.averageRating && (
          <div className="book-rating">
            ⭐ {volumeInfo.averageRating}/5 
            {volumeInfo.ratingsCount && (
              <span className="ratings-count">
                ({volumeInfo.ratingsCount} avaliações)
              </span>
            )}
          </div>
        )}
        
        {volumeInfo.description && (
          <p className="book-description">
            {volumeInfo.description.length > 150 
              ? `${volumeInfo.description.substring(0, 150)}...` 
              : volumeInfo.description
            }
          </p>
        )}
      </div>
    </div>
  );
};
