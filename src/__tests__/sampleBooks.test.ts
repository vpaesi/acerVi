import { loadSampleData, sampleBooks } from '../data/sampleBooks';

const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
  writable: true,
});

describe('SampleBooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should have sample books data', () => {
    expect(sampleBooks).toBeDefined();
    expect(Array.isArray(sampleBooks)).toBe(true);
    expect(sampleBooks.length).toBeGreaterThan(0);
  });

  it('should have valid book structure', () => {
    const firstBook = sampleBooks[0];
    
    expect(firstBook).toHaveProperty('id');
    expect(firstBook).toHaveProperty('title');
    expect(firstBook).toHaveProperty('authors');
    expect(firstBook).toHaveProperty('status');
    expect(firstBook).toHaveProperty('condition');
    expect(firstBook).toHaveProperty('addedAt');
    expect(firstBook).toHaveProperty('updatedAt');
    expect(Array.isArray(firstBook.authors)).toBe(true);
  });

  it('should have books with different statuses', () => {
    const statuses = sampleBooks.map(book => book.status);
    const uniqueStatuses = [...new Set(statuses)];
    
    expect(uniqueStatuses.length).toBeGreaterThan(1);
  });

  it('should have books with different conditions', () => {
    const conditions = sampleBooks.map(book => book.condition);
    const uniqueConditions = [...new Set(conditions)];
    
    expect(uniqueConditions.length).toBeGreaterThan(1);
  });

  describe('loadSampleData', () => {
    it('should load sample data when no existing books', () => {
      mockLocalStorage.getItem.mockReturnValue(null);
      
      const result = loadSampleData();
      
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'acervi_personal_library',
        JSON.stringify(sampleBooks)
      );
      expect(result).toBe(true);
    });

    it('should load sample data when empty array exists', () => {
      mockLocalStorage.getItem.mockReturnValue('[]');
      
      const result = loadSampleData();
      
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'acervi_personal_library',
        JSON.stringify(sampleBooks)
      );
      expect(result).toBe(true);
    });

    it('should not load sample data when books already exist', () => {
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify([
        {
          id: 'existing-1',
          title: 'Existing Book',
          authors: ['Author'],
          status: 'não-lido',
          condition: 'novo',
          addedAt: '2024-01-01',
          updatedAt: '2024-01-01',
        }
      ]));
      
      const result = loadSampleData();
      
      expect(mockLocalStorage.setItem).not.toHaveBeenCalled();
      expect(result).toBe(false);
    });

    it('should handle invalid JSON gracefully', () => {
      mockLocalStorage.getItem.mockReturnValue('invalid json');
      
      const result = loadSampleData();
      
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'acervi_personal_library',
        JSON.stringify(sampleBooks)
      );
      expect(result).toBe(true);
    });
  });
});
