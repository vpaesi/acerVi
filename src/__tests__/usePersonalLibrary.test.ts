import { PersonalBook } from '../types/personalLibrary';

const HookUtils = {
  calculateStats: (books: PersonalBook[]) => {
    const stats = {
      total: books.length,
      read: books.filter(book => book.status === 'lido').length,
      reading: books.filter(book => book.status === 'lendo').length,
      wantToRead: books.filter(book => book.status === 'quero-ler').length,
      notRead: books.filter(book => book.status === 'não-lido').length,
      abandoned: books.filter(book => book.status === 'abandonado').length,
      favorites: books.filter(book => book.favorite).length,
      loaned: books.filter(book => book.loanedTo).length,
      averageRating: 0,
      totalPages: 0,
      readPages: 0
    };

    const ratedBooks = books.filter(book => book.rating);
    if (ratedBooks.length > 0) {
      stats.averageRating = ratedBooks.reduce((sum, book) => sum + (book.rating || 0), 0) / ratedBooks.length;
    }

    stats.totalPages = books.reduce((sum, book) => sum + (book.pageCount || 0), 0);
    stats.readPages = books
      .filter(book => book.status === 'lido')
      .reduce((sum, book) => sum + (book.pageCount || 0), 0);

    return stats;
  },

  validateBookData: (bookData: Partial<PersonalBook>) => {
    const errors: string[] = [];

    if (!bookData.title?.trim()) {
      errors.push('Título é obrigatório');
    }

    if (!bookData.authors || bookData.authors.length === 0) {
      errors.push('Pelo menos um autor é obrigatório');
    }

    if (bookData.isbn && !/^\d{10}$|^\d{13}$/.test(bookData.isbn.replace(/[-\s]/g, ''))) {
      errors.push('ISBN deve ter 10 ou 13 dígitos');
    }

    if (bookData.rating && (bookData.rating < 1 || bookData.rating > 5)) {
      errors.push('Rating deve ser entre 1 e 5');
    }

    if (bookData.pageCount && bookData.pageCount < 1) {
      errors.push('Número de páginas deve ser positivo');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  },

  formatAuthorsDisplay: (authors: string[]) => {
    if (!authors || authors.length === 0) return 'Autor desconhecido';
    if (authors.length === 1) return authors[0];
    if (authors.length === 2) return `${authors[0]} e ${authors[1]}`;
    return `${authors[0]} e outros`;
  },

  generateBookSummary: (book: PersonalBook) => {
    const parts = [];
    
    parts.push(book.title);
    
    if (book.authors && book.authors.length > 0) {
      parts.push(`por ${HookUtils.formatAuthorsDisplay(book.authors)}`);
    } else {
      parts.push(`por ${HookUtils.formatAuthorsDisplay([])}`);
    }

    if (book.publishedDate) {
      parts.push(`(${book.publishedDate})`);
    }

    if (book.pageCount) {
      parts.push(`${book.pageCount} páginas`);
    }

    return parts.join(' ');
  },

  filterByStatus: (books: PersonalBook[], statuses: string[]) => {
    if (!statuses || statuses.length === 0) return books;
    return books.filter(book => statuses.includes(book.status));
  },

  filterByCondition: (books: PersonalBook[], conditions: string[]) => {
    if (!conditions || conditions.length === 0) return books;
    return books.filter(book => conditions.includes(book.condition));
  },

  filterBySearchText: (books: PersonalBook[], searchText: string) => {
    if (!searchText?.trim()) return books;
    
    const search = searchText.toLowerCase();
    return books.filter(book => 
      book.title.toLowerCase().includes(search) ||
      book.authors.some(author => author.toLowerCase().includes(search)) ||
      book.description?.toLowerCase().includes(search) ||
      book.isbn?.includes(search)
    );
  }
};

describe('Hook Utils - Funções Auxiliares', () => {
  const mockBooks: PersonalBook[] = [
    {
      id: '1',
      title: 'Livro Test 1',
      authors: ['Autor A'],
      status: 'lido',
      condition: 'novo',
      rating: 5,
      pageCount: 300,
      favorite: true,
      addedAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z'
    },
    {
      id: '2',
      title: 'Livro Test 2',
      authors: ['Autor B', 'Autor C'],
      status: 'lendo',
      condition: 'usado',
      rating: 4,
      pageCount: 250,
      loanedTo: 'João Silva',
      addedAt: '2024-01-02T00:00:00.000Z',
      updatedAt: '2024-01-02T00:00:00.000Z'
    },
    {
      id: '3',
      title: 'Livro Test 3',
      authors: ['Autor A'],
      status: 'quero-ler',
      condition: 'novo',
      pageCount: 400,
      addedAt: '2024-01-03T00:00:00.000Z',
      updatedAt: '2024-01-03T00:00:00.000Z'
    }
  ];

  describe('calculateStats', () => {
    it('should calculate basic statistics', () => {
      const stats = HookUtils.calculateStats(mockBooks);

      expect(stats.total).toBe(3);
      expect(stats.read).toBe(1);
      expect(stats.reading).toBe(1);
      expect(stats.wantToRead).toBe(1);
      expect(stats.favorites).toBe(1);
      expect(stats.loaned).toBe(1);
    });

    it('should calculate average rating correctly', () => {
      const stats = HookUtils.calculateStats(mockBooks);

      expect(stats.averageRating).toBe(4.5);
    });

    it('should calculate page counts', () => {
      const stats = HookUtils.calculateStats(mockBooks);

      expect(stats.totalPages).toBe(950);
      expect(stats.readPages).toBe(300);
    });

    it('should handle empty array', () => {
      const stats = HookUtils.calculateStats([]);

      expect(stats.total).toBe(0);
      expect(stats.averageRating).toBe(0);
      expect(stats.totalPages).toBe(0);
    });
  });

  describe('validateBookData', () => {
    it('should validate correct book data', () => {
      const bookData = {
        title: 'Livro Válido',
        authors: ['Autor Teste'],
        isbn: '1234567890',
        rating: 4,
        pageCount: 200
      };

      const result = HookUtils.validateBookData(bookData);

      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject book without title', () => {
      const bookData = {
        authors: ['Autor Teste']
      };

      const result = HookUtils.validateBookData(bookData);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Título é obrigatório');
    });

    it('should reject book without authors', () => {
      const bookData = {
        title: 'Livro Teste'
      };

      const result = HookUtils.validateBookData(bookData);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Pelo menos um autor é obrigatório');
    });

    it('should reject invalid ISBN', () => {
      const bookData = {
        title: 'Livro Teste',
        authors: ['Autor'],
        isbn: '123'
      };

      const result = HookUtils.validateBookData(bookData);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('ISBN deve ter 10 ou 13 dígitos');
    });

    it('should reject invalid rating', () => {
      const bookData = {
        title: 'Livro Teste',
        authors: ['Autor'],
        rating: 6
      };

      const result = HookUtils.validateBookData(bookData);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Rating deve ser entre 1 e 5');
    });
  });

  describe('formatAuthorsDisplay', () => {
    it('should format single author', () => {
      const result = HookUtils.formatAuthorsDisplay(['João Silva']);
      expect(result).toBe('João Silva');
    });

    it('should format two authors', () => {
      const result = HookUtils.formatAuthorsDisplay(['João Silva', 'Maria Santos']);
      expect(result).toBe('João Silva e Maria Santos');
    });

    it('should format multiple authors', () => {
      const result = HookUtils.formatAuthorsDisplay(['João Silva', 'Maria Santos', 'Pedro Costa']);
      expect(result).toBe('João Silva e outros');
    });

    it('should handle empty array', () => {
      const result = HookUtils.formatAuthorsDisplay([]);
      expect(result).toBe('Autor desconhecido');
    });
  });

  describe('generateBookSummary', () => {
    it('should generate complete summary', () => {
      const book = mockBooks[0];
      const result = HookUtils.generateBookSummary(book);

      expect(result).toContain('Livro Test 1');
      expect(result).toContain('por Autor A');
      expect(result).toContain('300 páginas');
    });

    it('should handle book with minimal data', () => {
      const book: PersonalBook = {
        id: '1',
        title: 'Livro Simples',
        authors: [],
        status: 'não-lido',
        condition: 'novo',
        addedAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z'
      };

      const result = HookUtils.generateBookSummary(book);

      expect(result).toContain('Livro Simples');
      expect(result).toContain('por Autor desconhecido');
    });
  });

  describe('filter functions', () => {
    it('should filter by status', () => {
      const result = HookUtils.filterByStatus(mockBooks, ['lido', 'lendo']);

      expect(result).toHaveLength(2);
      expect(result.every(book => ['lido', 'lendo'].includes(book.status))).toBe(true);
    });

    it('should filter by condition', () => {
      const result = HookUtils.filterByCondition(mockBooks, ['novo']);

      expect(result).toHaveLength(2);
      expect(result.every(book => book.condition === 'novo')).toBe(true);
    });

    it('should filter by search text', () => {
      const result = HookUtils.filterBySearchText(mockBooks, 'Autor A');

      expect(result).toHaveLength(2);
      expect(result.every(book => book.authors.includes('Autor A'))).toBe(true);
    });

    it('should return all books when no filters applied', () => {
      expect(HookUtils.filterByStatus(mockBooks, [])).toEqual(mockBooks);
      expect(HookUtils.filterByCondition(mockBooks, [])).toEqual(mockBooks);
      expect(HookUtils.filterBySearchText(mockBooks, '')).toEqual(mockBooks);
    });
  });
});
