import { useState, useCallback } from 'react';
import { GoogleBooksService } from '../services/googleBooksApi';
import { Book, GoogleBooksResponse, BookSearchParams } from '../types/book';

interface UseGoogleBooksState {
  books: Book[];
  loading: boolean;
  error: string | null;
  totalItems: number;
}

interface UseGoogleBooksReturn extends UseGoogleBooksState {
  searchBooks: (params: BookSearchParams) => Promise<void>;
  searchByTitle: (title: string, maxResults?: number) => Promise<void>;
  searchByAuthor: (author: string, maxResults?: number) => Promise<void>;
  searchByISBN: (isbn: string) => Promise<void>;
  getBookById: (id: string) => Promise<Book | null>;
  clearResults: () => void;
  clearError: () => void;
}

export const useGoogleBooks = (): UseGoogleBooksReturn => {
  const [state, setState] = useState<UseGoogleBooksState>({
    books: [],
    loading: false,
    error: null,
    totalItems: 0,
  });

  const updateState = useCallback((updates: Partial<UseGoogleBooksState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  const handleApiCall = useCallback(
    async <T>(
      apiCall: () => Promise<T>,
      onSuccess: (result: T) => void
    ): Promise<T | null> => {
      try {
        updateState({ loading: true, error: null });
        const result = await apiCall();
        onSuccess(result);
        return result;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
        updateState({ error: errorMessage, books: [], totalItems: 0 });
        return null;
      } finally {
        updateState({ loading: false });
      }
    },
    [updateState]
  );

  const searchBooks = useCallback(
    async (params: BookSearchParams): Promise<void> => {
      await handleApiCall(
        () => GoogleBooksService.searchBooks(params),
        (response: GoogleBooksResponse) => {
          updateState({
            books: response.items || [],
            totalItems: response.totalItems,
          });
        }
      );
    },
    [handleApiCall, updateState]
  );

  const searchByTitle = useCallback(
    async (title: string, maxResults = 10): Promise<void> => {
      await handleApiCall(
        () => GoogleBooksService.searchByTitle(title, maxResults),
        (response: GoogleBooksResponse) => {
          updateState({
            books: response.items || [],
            totalItems: response.totalItems,
          });
        }
      );
    },
    [handleApiCall, updateState]
  );

  const searchByAuthor = useCallback(
    async (author: string, maxResults = 10): Promise<void> => {
      await handleApiCall(
        () => GoogleBooksService.searchByAuthor(author, maxResults),
        (response: GoogleBooksResponse) => {
          updateState({
            books: response.items || [],
            totalItems: response.totalItems,
          });
        }
      );
    },
    [handleApiCall, updateState]
  );

  const searchByISBN = useCallback(
    async (isbn: string): Promise<void> => {
      await handleApiCall(
        () => GoogleBooksService.searchByISBN(isbn),
        (response: GoogleBooksResponse) => {
          updateState({
            books: response.items || [],
            totalItems: response.totalItems,
          });
        }
      );
    },
    [handleApiCall, updateState]
  );

  const getBookById = useCallback(
    async (id: string): Promise<Book | null> => {
      return handleApiCall(
        () => GoogleBooksService.getBookById(id),
        () => {} // Não atualiza a lista de livros para busca individual
      );
    },
    [handleApiCall]
  );

  const clearResults = useCallback(() => {
    updateState({ books: [], totalItems: 0, error: null });
  }, [updateState]);

  const clearError = useCallback(() => {
    updateState({ error: null });
  }, [updateState]);

  return {
    ...state,
    searchBooks,
    searchByTitle,
    searchByAuthor,
    searchByISBN,
    getBookById,
    clearResults,
    clearError,
  };
};
