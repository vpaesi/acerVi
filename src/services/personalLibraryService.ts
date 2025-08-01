import { PersonalBook } from '../types/personalLibrary';
import { generateId } from '../utils/idUtils';

const STORAGE_KEY = 'acervi_personal_library';

export class PersonalLibraryService {
  /**
   * Carrega todos os livros do localStorage
   */
  static loadBooks(): PersonalBook[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Erro ao carregar livros:', error);
      return [];
    }
  }

  /**
   * Salva os livros no localStorage
   */
  static saveBooks(books: PersonalBook[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
    } catch (error) {
      console.error('Erro ao salvar livros:', error);
    }
  }

  /**
   * Adiciona um novo livro ao acervo
   */
  static addBook(bookData: Omit<PersonalBook, 'id' | 'addedAt' | 'updatedAt'>): PersonalBook {
    const books = this.loadBooks();
    
    const newBook: PersonalBook = {
      ...bookData,
      id: generateId(),
      addedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    books.push(newBook);
    this.saveBooks(books);
    
    return newBook;
  }

  /**
   * Atualiza um livro existente
   */
  static updateBook(id: string, updates: Partial<PersonalBook>): PersonalBook | null {
    const books = this.loadBooks();
    const index = books.findIndex(book => book.id === id);
    
    if (index === -1) {
      return null;
    }

    books[index] = {
      ...books[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    this.saveBooks(books);
    return books[index];
  }

  /**
   * Remove um livro do acervo
   */
  static removeBook(id: string): boolean {
    const books = this.loadBooks();
    const filteredBooks = books.filter(book => book.id !== id);
    
    if (filteredBooks.length === books.length) {
      return false;
    }

    this.saveBooks(filteredBooks);
    return true;
  }

  /**
   * Busca um livro por ID
   */
  static getBookById(id: string): PersonalBook | null {
    const books = this.loadBooks();
    return books.find(book => book.id === id) || null;
  }

  /**
   * Filtra livros com base nos critérios
   */
  static filterBooks(books: PersonalBook[], filters: {
    status?: string[];
    condition?: string[];
    favorite?: boolean;
    searchText?: string;
    rating?: number[];
    cduCode?: string[];
    cduMainCategory?: string;
  }): PersonalBook[] {
    return books.filter(book => {
      if (filters.status && filters.status.length > 0) {
        if (!filters.status.includes(book.status)) return false;
      }

      if (filters.condition && filters.condition.length > 0) {
        if (!filters.condition.includes(book.condition)) return false;
      }

      if (filters.favorite !== undefined) {
        if (book.favorite !== filters.favorite) return false;
      }

      if (filters.rating && filters.rating.length > 0) {
        if (!book.rating || !filters.rating.includes(book.rating)) return false;
      }

      if (filters.cduCode && filters.cduCode.length > 0) {
        if (!book.cduCode || !filters.cduCode.includes(book.cduCode)) return false;
      }

      if (filters.cduMainCategory) {
        if (!book.cduCode || !book.cduCode.startsWith(filters.cduMainCategory)) return false;
      }

      if (filters.searchText) {
        const searchLower = filters.searchText.toLowerCase();
        const titleMatch = book.title.toLowerCase().includes(searchLower);
        const authorMatch = book.authors.some(author => 
          author.toLowerCase().includes(searchLower)
        );
        const descMatch = book.description?.toLowerCase().includes(searchLower) || false;
        const cduMatch = book.cduCode?.toLowerCase().includes(searchLower) || false;
        const cutterMatch = book.cutterCode?.toLowerCase().includes(searchLower) || false;
        
        if (!titleMatch && !authorMatch && !descMatch && !cduMatch && !cutterMatch) return false;
      }

      return true;
    });
  }

  /**
   * Ordena livros
   */
  static sortBooks(
    books: PersonalBook[], 
    field: 'title' | 'authors' | 'addedAt' | 'rating' | 'publishedDate',
    direction: 'asc' | 'desc' = 'asc'
  ): PersonalBook[] {
    return [...books].sort((a, b) => {
      let aValue: string | number | Date;
      let bValue: string | number | Date;

      switch (field) {
        case 'title':
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case 'authors':
          aValue = a.authors[0]?.toLowerCase() || '';
          bValue = b.authors[0]?.toLowerCase() || '';
          break;
        case 'addedAt':
          aValue = new Date(a.addedAt);
          bValue = new Date(b.addedAt);
          break;
        case 'rating':
          aValue = a.rating || 0;
          bValue = b.rating || 0;
          break;
        case 'publishedDate':
          aValue = new Date(a.publishedDate || '1900-01-01');
          bValue = new Date(b.publishedDate || '1900-01-01');
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  }

  /**
   * Gera estatísticas do acervo
   */
  static getLibraryStats(books: PersonalBook[]) {
    const stats = {
      total: books.length,
      read: books.filter(b => b.status === 'lido').length,
      reading: books.filter(b => b.status === 'lendo').length,
      wantToRead: books.filter(b => b.status === 'quero-ler').length,
      notRead: books.filter(b => b.status === 'não-lido').length,
      abandoned: books.filter(b => b.status === 'abandonado').length,
      favorites: books.filter(b => b.favorite).length,
      loaned: books.filter(b => b.loanedTo).length,
      new: books.filter(b => b.condition === 'novo').length,
      used: books.filter(b => b.condition === 'usado' || b.condition === 'seminovo').length,
      damaged: books.filter(b => b.condition === 'danificado').length,
      averageRating: 0,
      totalPages: 0,
      readPages: 0,
    };

    const ratedBooks = books.filter(b => b.rating);
    if (ratedBooks.length > 0) {
      stats.averageRating = ratedBooks.reduce((sum, b) => sum + (b.rating || 0), 0) / ratedBooks.length;
    }

    stats.totalPages = books.reduce((sum, b) => sum + (b.pageCount || 0), 0);
    stats.readPages = books
      .filter(b => b.status === 'lido')
      .reduce((sum, b) => sum + (b.pageCount || 0), 0);

    return stats;
  }

  /**
   * Exporta dados para JSON
   */
  static exportData(): string {
    const books = this.loadBooks();
    return JSON.stringify(books, null, 2);
  }

  /**
   * Importa dados de JSON
   */
  static importData(jsonData: string): boolean {
    try {
      const books = JSON.parse(jsonData);
      if (Array.isArray(books)) {
        this.saveBooks(books);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erro ao importar dados:', error);
      return false;
    }
  }

}
