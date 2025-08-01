import { PersonalBook, PersonalLibrary, BookFilters } from './personalLibrary';

describe('PersonalLibrary Types', () => {
  it('should have valid PersonalBook interface', () => {
    const mockBook: PersonalBook = {
      id: '1',
      title: 'Test Book',
      authors: ['Test Author'],
      status: 'não-lido',
      condition: 'novo',
      addedAt: '2024-01-01',
      updatedAt: '2024-01-01',
    };

    expect(mockBook.id).toBe('1');
    expect(mockBook.title).toBe('Test Book');
    expect(Array.isArray(mockBook.authors)).toBe(true);
    expect(mockBook.status).toBe('não-lido');
    expect(mockBook.condition).toBe('novo');
  });

  it('should have valid PersonalLibrary interface', () => {
    const mockLibrary: PersonalLibrary = {
      books: [],
      totalBooks: 0,
      readBooks: 0,
      currentlyReading: 0,
      wantToRead: 0,
    };

    expect(Array.isArray(mockLibrary.books)).toBe(true);
    expect(typeof mockLibrary.totalBooks).toBe('number');
    expect(typeof mockLibrary.readBooks).toBe('number');
    expect(mockLibrary.totalBooks).toBeGreaterThanOrEqual(0);
  });

  it('should have valid BookFilters interface', () => {
    const mockFilters: BookFilters = {
      searchText: 'test',
      status: ['lido'],
      condition: ['novo'],
      favorite: true,
    };

    expect(typeof mockFilters.searchText).toBe('string');
    expect(Array.isArray(mockFilters.status)).toBe(true);
    expect(Array.isArray(mockFilters.condition)).toBe(true);
    expect(typeof mockFilters.favorite).toBe('boolean');
  });

  it('should support all book statuses', () => {
    const validStatuses = ['não-lido', 'lendo', 'lido', 'quero-ler', 'abandonado'];
    
    validStatuses.forEach(status => {
      const book: PersonalBook = {
        id: '1',
        title: 'Test',
        authors: ['Author'],
        status: status as PersonalBook['status'],
        condition: 'novo',
        addedAt: '2024-01-01',
        updatedAt: '2024-01-01',
      };
      
      expect(book.status).toBe(status);
    });
  });

  it('should support all book conditions', () => {
    const validConditions = ['novo', 'usado', 'danificado'];
    
    validConditions.forEach(condition => {
      const book: PersonalBook = {
        id: '1',
        title: 'Test',
        authors: ['Author'],
        status: 'não-lido',
        condition: condition as PersonalBook['condition'],
        addedAt: '2024-01-01',
        updatedAt: '2024-01-01',
      };
      
      expect(book.condition).toBe(condition);
    });
  });

  it('should support optional book properties', () => {
    const fullBook: PersonalBook = {
      id: '1',
      title: 'Test Book',
      authors: ['Test Author'],
      isbn: '1234567890123',
      publisher: 'Test Publisher',
      publishedDate: '2024-01-01',
      pageCount: 300,
      edition: '1st',
      description: 'Test description',
      imageUrl: 'test-image.jpg',
      categories: ['Fiction'],
      cduCode: '800',
      cutterCode: 'T123',
      callNumber: '800 T123',
      series: 'Test Series',
      volumeNumber: '1',
      status: 'lido',
      rating: 5,
      personalNotes: 'Great book!',
      purchaseDate: '2024-01-01',
      purchasePrice: 29.99,
      condition: 'novo',
      physicalLocation: 'Shelf A1',
      favorite: true,
      loanedTo: 'John Doe',
      loanDate: '2024-01-15',
      addedAt: '2024-01-01',
      updatedAt: '2024-01-01',
    };

    expect(fullBook.isbn).toBeDefined();
    expect(fullBook.rating).toBe(5);
    expect(fullBook.favorite).toBe(true);
    expect(typeof fullBook.pageCount).toBe('number');
    expect(typeof fullBook.purchasePrice).toBe('number');
  });
});
