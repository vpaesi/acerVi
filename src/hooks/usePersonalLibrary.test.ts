import { renderHook } from '@testing-library/react-hooks';
import { usePersonalLibrary } from './usePersonalLibrary';

// Mock básico do PersonalLibraryService
jest.mock('../services/personalLibraryService', () => ({
  PersonalLibraryService: {
    loadBooks: jest.fn(() => []),
    saveBooks: jest.fn(() => {}),
    addBook: jest.fn(() => ({
      id: '1',
      title: 'Test',
      authors: ['Test'],
      status: 'não-lido',
      condition: 'novo',
      addedAt: '2024-01-01',
      updatedAt: '2024-01-01',
    })),
    updateBook: jest.fn(() => null),
    removeBook: jest.fn(() => true),
    getBookById: jest.fn(() => null),
    getLibraryStats: jest.fn(() => ({
      total: 0,
      read: 0,
      reading: 0,
      wantToRead: 0,
      notRead: 0,
      abandoned: 0,
      favorites: 0,
      loaned: 0,
      new: 0,
      used: 0,
      damaged: 0,
      averageRating: 0,
      totalPages: 0,
      readPages: 0,
    })),
    filterBooks: jest.fn(() => []),
    sortBooks: jest.fn(() => []),
  },
}));

describe('usePersonalLibrary Hook', () => {
  it('should initialize hook without errors', () => {
    const { result } = renderHook(() => usePersonalLibrary());
    
    expect(result.current).toBeDefined();
    expect(result.current.books).toEqual([]);
    expect(result.current.loading).toBe(false);
  });

  it('should have required functions', () => {
    const { result } = renderHook(() => usePersonalLibrary());
    
    expect(typeof result.current.addBook).toBe('function');
    expect(typeof result.current.updateBook).toBe('function');
    expect(typeof result.current.removeBook).toBe('function');
    expect(typeof result.current.setFilters).toBe('function');
  });
});
