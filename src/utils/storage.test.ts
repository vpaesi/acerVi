// Testes para utilitários de storage
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

// Simular utilitários de storage
const STORAGE_KEY = 'acervi_personal_library';

const StorageUtils = {
  saveBooks: (books: PersonalBook[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
      return true;
    } catch {
      return false;
    }
  },

  loadBooks: (): PersonalBook[] => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },

  clearBooks: () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      return true;
    } catch {
      return false;
    }
  },

  exportToJson: (books: PersonalBook[]) => {
    return JSON.stringify(books, null, 2);
  },

  importFromJson: (jsonString: string): PersonalBook[] => {
    try {
      const parsed = JSON.parse(jsonString);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
};

describe('Storage Utils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('saveBooks', () => {
    it('should save books to localStorage', () => {
      const books: PersonalBook[] = [
        {
          id: 'test1',
          title: 'Test Book',
          authors: ['Test Author'],
          status: 'quero-ler',
          addedAt: new Date().toISOString(),
          isbn: '1234567890',
          condition: 'novo',
          updatedAt: new Date().toISOString()
        }
      ];

      const result = StorageUtils.saveBooks(books);

      expect(localStorage.setItem).toHaveBeenCalledWith(
        STORAGE_KEY,
        JSON.stringify(books)
      );
      expect(result).toBe(true);
    });

    it('should return false when localStorage throws error', () => {
      (localStorage.setItem as jest.Mock).mockImplementation(() => {
        throw new Error('Storage error');
      });

      const result = StorageUtils.saveBooks([]);
      expect(result).toBe(false);
    });
  });

  describe('loadBooks', () => {
    it('should load books from localStorage', () => {
      const books = [{ id: 'test1', title: 'Test Book' }];
      (localStorage.getItem as jest.Mock).mockReturnValue(JSON.stringify(books));

      const result = StorageUtils.loadBooks();

      expect(localStorage.getItem).toHaveBeenCalledWith(STORAGE_KEY);
      expect(result).toEqual(books);
    });

    it('should return empty array when no data exists', () => {
      (localStorage.getItem as jest.Mock).mockReturnValue(null);

      const result = StorageUtils.loadBooks();
      expect(result).toEqual([]);
    });

    it('should return empty array when JSON parsing fails', () => {
      (localStorage.getItem as jest.Mock).mockReturnValue('invalid json');

      const result = StorageUtils.loadBooks();
      expect(result).toEqual([]);
    });
  });

  describe('clearBooks', () => {
    it('should clear books from localStorage', () => {
      const result = StorageUtils.clearBooks();

      expect(localStorage.removeItem).toHaveBeenCalledWith(STORAGE_KEY);
      expect(result).toBe(true);
    });

    it('should return false when localStorage throws error', () => {
      (localStorage.removeItem as jest.Mock).mockImplementation(() => {
        throw new Error('Storage error');
      });

      const result = StorageUtils.clearBooks();
      expect(result).toBe(false);
    });
  });

  describe('exportToJson', () => {
    it('should export books to JSON string', () => {
      const books: PersonalBook[] = [
        {
          id: 'test1',
          title: 'Test Book',
          authors: ['Test Author'],
          status: 'lendo',
          addedAt: '2024-01-01T00:00:00.000Z',
          isbn: '1234567890',
          condition: 'novo',
          updatedAt: '2024-01-01T00:00:00.000Z'
        }
      ];

      const result = StorageUtils.exportToJson(books);
      
      expect(result).toBe(JSON.stringify(books, null, 2));
      expect(JSON.parse(result)).toEqual(books);
    });

    it('should handle empty array', () => {
      const result = StorageUtils.exportToJson([]);
      expect(result).toBe('[]');
    });
  });

  describe('importFromJson', () => {
    it('should import books from JSON string', () => {
      const books = [{ id: 'test1', title: 'Test Book' }];
      const jsonString = JSON.stringify(books);

      const result = StorageUtils.importFromJson(jsonString);
      expect(result).toEqual(books);
    });

    it('should return empty array for invalid JSON', () => {
      const result = StorageUtils.importFromJson('invalid json');
      expect(result).toEqual([]);
    });

    it('should return empty array for non-array JSON', () => {
      const result = StorageUtils.importFromJson('{"not": "array"}');
      expect(result).toEqual([]);
    });
  });
});
