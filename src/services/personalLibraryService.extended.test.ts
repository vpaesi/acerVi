// Testes adicionais para PersonalLibraryService
import { PersonalLibraryService } from '../services/personalLibraryService';
import { PersonalBook } from '../types/personalLibrary';

// Mock do localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock do Math.random para IDs previsíveis
const mockMathRandom = jest.spyOn(Math, 'random');

describe('PersonalLibraryService - Testes Abrangentes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockMathRandom.mockReturnValue(0.123456789);
  });

  afterEach(() => {
    mockMathRandom.mockRestore();
  });

  const mockBook: Omit<PersonalBook, 'id' | 'addedAt' | 'updatedAt'> = {
    title: 'Test Book',
    authors: ['Test Author'],
    isbn: '1234567890',
    status: 'quero-ler',
    condition: 'novo'
  };

  const mockCompleteBook: PersonalBook = {
    id: '123abc',
    title: 'Complete Test Book',
    authors: ['Complete Author'],
    isbn: '0987654321',
    status: 'lido',
    condition: 'usado',
    addedAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z'
  };

  describe('generateId', () => {
    it('should generate consistent IDs', () => {
      // Testamos indiretamente através do addBook
      (localStorageMock.getItem as jest.Mock).mockReturnValue('[]');
      
      const result = PersonalLibraryService.addBook(mockBook);
      
      expect(result.id).toBeDefined();
      expect(typeof result.id).toBe('string');
      expect(result.id.length).toBeGreaterThan(0);
    });
  });

  describe('addBook', () => {
    it('should add book to empty library', () => {
      (localStorageMock.getItem as jest.Mock).mockReturnValue('[]');
      
      const result = PersonalLibraryService.addBook(mockBook);
      
      expect(result).toMatchObject(mockBook);
      expect(result.id).toBeDefined();
      expect(result.addedAt).toBeDefined();
      expect(result.updatedAt).toBeDefined();
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'acervi_personal_library',
        expect.stringContaining(result.id)
      );
    });

    it('should add book to existing library', () => {
      const existingBooks = [mockCompleteBook];
      (localStorageMock.getItem as jest.Mock).mockReturnValue(JSON.stringify(existingBooks));
      
      const result = PersonalLibraryService.addBook(mockBook);
      
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'acervi_personal_library',
        expect.stringContaining(mockCompleteBook.id)
      );
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'acervi_personal_library',
        expect.stringContaining(result.id)
      );
    });
  });

  describe('updateBook', () => {
    it('should update existing book', () => {
      const books = [mockCompleteBook];
      (localStorageMock.getItem as jest.Mock).mockReturnValue(JSON.stringify(books));
      
      const updates = { status: 'lendo' as const, rating: 4 };
      const result = PersonalLibraryService.updateBook(mockCompleteBook.id, updates);
      
      expect(result).not.toBeNull();
      expect(result?.status).toBe('lendo');
      expect(result?.rating).toBe(4);
      expect(result?.updatedAt).not.toBe(mockCompleteBook.updatedAt);
    });

    it('should return null for non-existent book', () => {
      (localStorageMock.getItem as jest.Mock).mockReturnValue('[]');
      
      const result = PersonalLibraryService.updateBook('non-existent', { status: 'lido' });
      
      expect(result).toBeNull();
    });

    it('should preserve existing fields when updating', () => {
      const books = [mockCompleteBook];
      (localStorageMock.getItem as jest.Mock).mockReturnValue(JSON.stringify(books));
      
      const updates = { rating: 5 };
      const result = PersonalLibraryService.updateBook(mockCompleteBook.id, updates);
      
      expect(result?.title).toBe(mockCompleteBook.title);
      expect(result?.authors).toEqual(mockCompleteBook.authors);
      expect(result?.rating).toBe(5);
    });
  });

  describe('removeBook', () => {
    it('should remove existing book', () => {
      const books = [mockCompleteBook];
      (localStorageMock.getItem as jest.Mock).mockReturnValue(JSON.stringify(books));
      
      const result = PersonalLibraryService.removeBook(mockCompleteBook.id);
      
      expect(result).toBe(true);
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'acervi_personal_library',
        '[]'
      );
    });

    it('should return false for non-existent book', () => {
      (localStorageMock.getItem as jest.Mock).mockReturnValue('[]');
      
      const result = PersonalLibraryService.removeBook('non-existent');
      
      expect(result).toBe(false);
    });

    it('should remove only target book from multiple books', () => {
      const book2 = { ...mockCompleteBook, id: 'book2', title: 'Book 2' };
      const books = [mockCompleteBook, book2];
      (localStorageMock.getItem as jest.Mock).mockReturnValue(JSON.stringify(books));
      
      const result = PersonalLibraryService.removeBook(mockCompleteBook.id);
      
      expect(result).toBe(true);
      const savedData = (localStorageMock.setItem as jest.Mock).mock.calls[0][1];
      const savedBooks = JSON.parse(savedData);
      expect(savedBooks).toHaveLength(1);
      expect(savedBooks[0].id).toBe('book2');
    });
  });

  describe('getBookById', () => {
    it('should find existing book', () => {
      const books = [mockCompleteBook];
      (localStorageMock.getItem as jest.Mock).mockReturnValue(JSON.stringify(books));
      
      const result = PersonalLibraryService.getBookById(mockCompleteBook.id);
      
      expect(result).toEqual(mockCompleteBook);
    });

    it('should return null for non-existent book', () => {
      (localStorageMock.getItem as jest.Mock).mockReturnValue('[]');
      
      const result = PersonalLibraryService.getBookById('non-existent');
      
      expect(result).toBeNull();
    });

    it('should find correct book among multiple books', () => {
      const book2 = { ...mockCompleteBook, id: 'book2', title: 'Book 2' };
      const books = [mockCompleteBook, book2];
      (localStorageMock.getItem as jest.Mock).mockReturnValue(JSON.stringify(books));
      
      const result = PersonalLibraryService.getBookById('book2');
      
      expect(result?.id).toBe('book2');
      expect(result?.title).toBe('Book 2');
    });
  });

  describe('storage error handling', () => {
    it('should handle localStorage.getItem errors gracefully', () => {
      (localStorageMock.getItem as jest.Mock).mockImplementation(() => {
        throw new Error('Storage error');
      });
      
      const result = PersonalLibraryService.loadBooks();
      
      expect(result).toEqual([]);
    });

    it('should handle localStorage.setItem errors gracefully', () => {
      (localStorageMock.getItem as jest.Mock).mockReturnValue('[]');
      (localStorageMock.setItem as jest.Mock).mockImplementation(() => {
        throw new Error('Storage error');
      });
      
      // Should not throw error
      expect(() => PersonalLibraryService.addBook(mockBook)).not.toThrow();
    });

    it('should handle malformed JSON in localStorage', () => {
      (localStorageMock.getItem as jest.Mock).mockReturnValue('invalid json');
      
      const result = PersonalLibraryService.loadBooks();
      
      expect(result).toEqual([]);
    });
  });

  describe('data persistence', () => {
    it('should maintain data integrity across operations', () => {
      // Simula uma sequência de operações
      let storedData: string = '[]';
      
      (localStorageMock.getItem as jest.Mock).mockImplementation(() => storedData);
      (localStorageMock.setItem as jest.Mock).mockImplementation((_, value) => {
        storedData = value;
      });

      // Adiciona livro
      const book1 = PersonalLibraryService.addBook(mockBook);
      
      // Adiciona outro livro
      const book2 = PersonalLibraryService.addBook({
        ...mockBook,
        title: 'Second Book'
      });

      // Atualiza primeiro livro
      PersonalLibraryService.updateBook(book1.id, { status: 'lido' });

      // Remove segundo livro
      PersonalLibraryService.removeBook(book2.id);

      // Verifica estado final
      const finalBooks = PersonalLibraryService.loadBooks();
      expect(finalBooks).toHaveLength(1);
      expect(finalBooks[0].id).toBe(book1.id);
      expect(finalBooks[0].status).toBe('lido');
    });
  });
});
