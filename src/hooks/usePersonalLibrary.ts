import { useState, useEffect, useCallback } from 'react';
import { PersonalBook } from '../types/personalLibrary';
import { PersonalLibraryService } from '../services/personalLibraryService';

interface UsePersonalLibraryReturn {
  books: PersonalBook[];
  filteredBooks: PersonalBook[];
  stats: {
    total: number;
    read: number;
    reading: number;
    wantToRead: number;
    notRead: number;
    abandoned: number;
    favorites: number;
    loaned: number;
    averageRating: number;
    totalPages: number;
    readPages: number;
  };
  loading: boolean;
  
  addBook: (bookData: Omit<PersonalBook, 'id' | 'addedAt' | 'updatedAt'>) => PersonalBook;
  updateBook: (id: string, updates: Partial<PersonalBook>) => PersonalBook | null;
  removeBook: (id: string) => boolean;
  getBookById: (id: string) => PersonalBook | null;
  
  setFilters: (filters: {
    status?: string[];
    condition?: string[];
    favorite?: boolean;
    searchText?: string;
    rating?: number[];
    cduCode?: string[];
    cduMainCategory?: string;
  }) => void;
  setSorting: (field: 'title' | 'authors' | 'addedAt' | 'rating' | 'publishedDate', direction?: 'asc' | 'desc') => void;
  clearFilters: () => void;
  
  exportData: () => string;
  importData: (jsonData: string) => boolean;
  refreshData: () => void;
}

export const usePersonalLibrary = (): UsePersonalLibraryReturn => {
  const [books, setBooks] = useState<PersonalBook[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<PersonalBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFiltersState] = useState<{
    status?: string[];
    condition?: string[];
    favorite?: boolean;
    searchText?: string;
    rating?: number[];
    cduCode?: string[];
    cduMainCategory?: string;
  }>({});
  const [sorting, setSortingState] = useState<{
    field: 'title' | 'authors' | 'addedAt' | 'rating' | 'publishedDate';
    direction: 'asc' | 'desc';
  }>({
    field: 'addedAt',
    direction: 'desc'
  });

  const loadData = useCallback(() => {
    setLoading(true);
    try {
      const loadedBooks = PersonalLibraryService.loadBooks();
      setBooks(loadedBooks);
    } catch (error) {
      console.error('Erro ao carregar biblioteca:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const applyFiltersAndSorting = useCallback(() => {
    let result = PersonalLibraryService.filterBooks(books, filters);
    result = PersonalLibraryService.sortBooks(result, sorting.field, sorting.direction);
    setFilteredBooks(result);
  }, [books, filters, sorting]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    applyFiltersAndSorting();
  }, [applyFiltersAndSorting]);

  const addBook = useCallback((bookData: Omit<PersonalBook, 'id' | 'addedAt' | 'updatedAt'>) => {
    const newBook = PersonalLibraryService.addBook(bookData);
    setBooks(prev => [...prev, newBook]);
    return newBook;
  }, []);

  const updateBook = useCallback((id: string, updates: Partial<PersonalBook>) => {
    const updatedBook = PersonalLibraryService.updateBook(id, updates);
    if (updatedBook) {
      setBooks(prev => prev.map(book => book.id === id ? updatedBook : book));
    }
    return updatedBook;
  }, []);

  const removeBook = useCallback((id: string) => {
    const success = PersonalLibraryService.removeBook(id);
    if (success) {
      setBooks(prev => prev.filter(book => book.id !== id));
    }
    return success;
  }, []);

  const getBookById = useCallback((id: string) => {
    return PersonalLibraryService.getBookById(id);
  }, []);

  const setFilters = useCallback((newFilters: typeof filters) => {
    setFiltersState(newFilters);
  }, []);

  const setSorting = useCallback((
    field: 'title' | 'authors' | 'addedAt' | 'rating' | 'publishedDate', 
    direction: 'asc' | 'desc' = 'asc'
  ) => {
    setSortingState({ field, direction });
  }, []);

  const clearFilters = useCallback(() => {
    setFiltersState({});
  }, []);

  const exportData = useCallback(() => {
    return PersonalLibraryService.exportData();
  }, []);

  const importData = useCallback((jsonData: string) => {
    const success = PersonalLibraryService.importData(jsonData);
    if (success) {
      loadData();
    }
    return success;
  }, [loadData]);

  const refreshData = useCallback(() => {
    loadData();
  }, [loadData]);

  const stats = PersonalLibraryService.getLibraryStats(books);

  return {
    books,
    filteredBooks,
    stats,
    loading,
    addBook,
    updateBook,
    removeBook,
    getBookById,
    setFilters,
    setSorting,
    clearFilters,
    exportData,
    importData,
    refreshData,
  };
};
