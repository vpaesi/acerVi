import { PersonalLibraryService } from './personalLibraryService';
import type { PersonalBook } from '../types/personalLibrary';

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
  writable: true,
});

describe('Personal Library Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('loadBooks', () => {
    it('should return empty array when localStorage is empty', () => {
      mockLocalStorage.getItem.mockReturnValue(null);
      
      const result = PersonalLibraryService.loadBooks();
      
      expect(result).toEqual([]);
      expect(mockLocalStorage.getItem).toHaveBeenCalledWith('acervi_personal_library');
    });

    it('should return parsed books when localStorage has valid data', () => {
      const mockBooks: PersonalBook[] = [
        {
          id: '1',
          title: 'Test Book',
          authors: ['Test Author'],
          status: 'não-lido',
          condition: 'novo',
          addedAt: '2024-01-01',
          updatedAt: '2024-01-01',
        },
      ];
      
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(mockBooks));
      
      const result = PersonalLibraryService.loadBooks();
      
      expect(result).toEqual(mockBooks);
      expect(mockLocalStorage.getItem).toHaveBeenCalledWith('acervi_personal_library');
    });

    it('should return empty array when localStorage has invalid JSON', () => {
      mockLocalStorage.getItem.mockReturnValue('invalid json');
      
      const result = PersonalLibraryService.loadBooks();
      
      expect(result).toEqual([]);
      expect(mockLocalStorage.getItem).toHaveBeenCalledWith('acervi_personal_library');
    });

    it('should handle localStorage errors gracefully', () => {
      mockLocalStorage.getItem.mockImplementation(() => {
        throw new Error('Storage error');
      });
      
      const result = PersonalLibraryService.loadBooks();
      
      expect(result).toEqual([]);
    });
  });

  describe('saveBooks', () => {
    it('should save books to localStorage', () => {
      const mockBooks: PersonalBook[] = [
        {
          id: '1',
          title: 'Test Book',
          authors: ['Test Author'],
          status: 'lido',
          condition: 'usado',
          addedAt: '2024-01-01',
          updatedAt: '2024-01-01',
        },
      ];
      
      PersonalLibraryService.saveBooks(mockBooks);
      
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'acervi_personal_library',
        JSON.stringify(mockBooks)
      );
    });

    it('should handle empty array', () => {
      PersonalLibraryService.saveBooks([]);
      
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'acervi_personal_library',
        JSON.stringify([])
      );
    });

    it('should handle localStorage errors gracefully', () => {
      mockLocalStorage.setItem.mockImplementation(() => {
        throw new Error('Storage error');
      });
      
      const mockBooks: PersonalBook[] = [
        {
          id: '1',
          title: 'Test Book',
          authors: ['Test Author'],
          status: 'lido',
          condition: 'novo',
          addedAt: '2024-01-01',
          updatedAt: '2024-01-01',
        },
      ];
      
      expect(() => PersonalLibraryService.saveBooks(mockBooks)).not.toThrow();
    });
  });
});
