// Testes extensivos para GoogleBooksService
import { GoogleBooksService } from '../services/googleBooksApi';
import { GoogleBooksResponse, Book } from '../types/book';

// Mock do fetch global
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('GoogleBooksService - Testes Extensivos', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockGoogleBooksResponse: GoogleBooksResponse = {
    kind: 'books#volumes',
    totalItems: 2,
    items: [
      {
        kind: 'books#volume',
        id: 'test-book-1',
        etag: 'test-etag-1',
        selfLink: 'https://www.googleapis.com/books/v1/volumes/test-book-1',
        volumeInfo: {
          title: 'Test Book 1',
          authors: ['Test Author 1'],
          publishedDate: '2023',
          description: 'Test description 1',
          industryIdentifiers: [
            { type: 'ISBN_13', identifier: '9781234567890' }
          ],
          pageCount: 300,
          categories: ['Fiction'],
          imageLinks: {
            thumbnail: 'https://example.com/thumbnail1.jpg'
          },
          language: 'en'
        }
      },
      {
        kind: 'books#volume',
        id: 'test-book-2',
        etag: 'test-etag-2',
        selfLink: 'https://www.googleapis.com/books/v1/volumes/test-book-2',
        volumeInfo: {
          title: 'Test Book 2',
          authors: ['Test Author 2'],
          publishedDate: '2024',
          description: 'Test description 2',
          industryIdentifiers: [
            { type: 'ISBN_10', identifier: '1234567890' }
          ],
          pageCount: 250,
          categories: ['Non-fiction'],
          imageLinks: {
            thumbnail: 'https://example.com/thumbnail2.jpg'
          },
          language: 'pt'
        }
      }
    ]
  };

  const mockBook: Book = {
    kind: 'books#volume',
    id: 'specific-book-id',
    etag: 'specific-etag',
    selfLink: 'https://www.googleapis.com/books/v1/volumes/specific-book-id',
    volumeInfo: {
      title: 'Specific Test Book',
      authors: ['Specific Author'],
      publishedDate: '2023-06-15',
      description: 'Detailed description of specific book',
      industryIdentifiers: [
        { type: 'ISBN_13', identifier: '9780987654321' }
      ],
      pageCount: 400,
      categories: ['Technology', 'Programming'],
      imageLinks: {
        thumbnail: 'https://example.com/specific-thumbnail.jpg',
        small: 'https://example.com/specific-small.jpg'
      },
      language: 'en',
      publisher: 'Test Publisher'
    }
  };

  describe('searchByISBN', () => {
    it('should search books by ISBN', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => mockGoogleBooksResponse
      });

      const result = await GoogleBooksService.searchByISBN('9781234567890');

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('isbn%3A9781234567890')
      );
      expect(result).toEqual(mockGoogleBooksResponse);
    });

    it('should format ISBN query correctly', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => mockGoogleBooksResponse
      });

      await GoogleBooksService.searchByISBN('978-1-234-56789-0');

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('isbn%3A978-1-234-56789-0')
      );
    });

    it('should handle ISBN search errors', async () => {
      mockFetch.mockRejectedValue(new Error('Network error'));

      await expect(GoogleBooksService.searchByISBN('invalid-isbn')).rejects.toThrow('Network error');
    });
  });

  describe('searchByAuthor', () => {
    it('should search books by author with default parameters', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => mockGoogleBooksResponse
      });

      const result = await GoogleBooksService.searchByAuthor('John Doe');

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('inauthor%3A%22John+Doe%22')
      );
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('maxResults=10')
      );
      expect(result).toEqual(mockGoogleBooksResponse);
    });

    it('should search books by author with custom parameters', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => mockGoogleBooksResponse
      });

      await GoogleBooksService.searchByAuthor('Jane Smith', 20, 10);

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('maxResults=20')
      );
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('startIndex=10')
      );
    });

    it('should handle author names with special characters', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => mockGoogleBooksResponse
      });

      await GoogleBooksService.searchByAuthor('José María García-López');

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('inauthor%3A%22Jos%C3%A9+Mar%C3%ADa+Garc%C3%ADa-L%C3%B3pez%22')
      );
    });
  });

  describe('searchByTitle', () => {
    it('should search books by title with default parameters', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => mockGoogleBooksResponse
      });

      const result = await GoogleBooksService.searchByTitle('The Great Book');

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('intitle%3A%22The+Great+Book%22')
      );
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('maxResults=10')
      );
      expect(result).toEqual(mockGoogleBooksResponse);
    });

    it('should search books by title with custom parameters', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => mockGoogleBooksResponse
      });

      await GoogleBooksService.searchByTitle('Programming Guide', 15, 5);

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('maxResults=15')
      );
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('startIndex=5')
      );
    });

    it('should handle titles with special characters and numbers', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => mockGoogleBooksResponse
      });

      await GoogleBooksService.searchByTitle('C++ & Python: 2024 Edition');

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('intitle%3A%22C%2B%2B+%26+Python%3A+2024+Edition%22')
      );
    });
  });

  describe('searchByCategory', () => {
    it('should search books by category with default parameters', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => mockGoogleBooksResponse
      });

      const result = await GoogleBooksService.searchByCategory('Fiction');

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('subject%3A%22Fiction%22')
      );
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('maxResults=10')
      );
      expect(result).toEqual(mockGoogleBooksResponse);
    });

    it('should search books by category with custom max results', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => mockGoogleBooksResponse
      });

      await GoogleBooksService.searchByCategory('Science', 25);

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('maxResults=25')
      );
    });

    it('should handle category names with spaces and special characters', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => mockGoogleBooksResponse
      });

      await GoogleBooksService.searchByCategory('Science & Technology');

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('subject%3A%22Science+%26+Technology%22')
      );
    });
  });

  describe('getBookById - Extended Tests', () => {
    it('should retrieve book with complete information', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => mockBook
      });

      const result = await GoogleBooksService.getBookById('specific-book-id');

      expect(mockFetch).toHaveBeenCalledWith(
        'https://www.googleapis.com/books/v1/volumes/specific-book-id'
      );
      expect(result).toEqual(mockBook);
    });

    it('should handle book with minimal information', async () => {
      const minimalBook: Book = {
        kind: 'books#volume',
        id: 'minimal-book',
        etag: 'minimal-etag',
        selfLink: 'https://www.googleapis.com/books/v1/volumes/minimal-book',
        volumeInfo: {
          title: 'Minimal Book'
        }
      };

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => minimalBook
      });

      const result = await GoogleBooksService.getBookById('minimal-book');

      expect(result).toEqual(minimalBook);
      expect(result.volumeInfo.title).toBe('Minimal Book');
    });

    it('should handle 404 errors for non-existent books', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 404,
        statusText: 'Not Found'
      });

      await expect(GoogleBooksService.getBookById('non-existent-book')).rejects.toThrow('Erro ao buscar livro: 404 Not Found');
    });
  });

  describe('searchBooks - Advanced Parameters', () => {
    it('should handle complex search with multiple filters', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => mockGoogleBooksResponse
      });

      await GoogleBooksService.searchBooks({
        query: 'javascript programming',
        maxResults: 40,
        startIndex: 20,
        orderBy: 'relevance',
        printType: 'books'
      });

      const calledUrl = (mockFetch as jest.Mock).mock.calls[0][0];
      expect(calledUrl).toContain('maxResults=40');
      expect(calledUrl).toContain('startIndex=20');
      expect(calledUrl).toContain('orderBy=relevance');
      expect(calledUrl).toContain('printType=books');
    });

    it('should handle search with language filter', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => mockGoogleBooksResponse
      });

      await GoogleBooksService.searchBooks({
        query: 'livros em português',
        langRestrict: 'pt'
      });

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('langRestrict=pt')
      );
    });

    it('should handle empty search results', async () => {
      const emptyResponse: GoogleBooksResponse = {
        kind: 'books#volumes',
        totalItems: 0,
        items: []
      };

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => emptyResponse
      });

      const result = await GoogleBooksService.searchBooks({ query: 'nonexistent book' });

      expect(result.totalItems).toBe(0);
      expect(result.items).toEqual([]);
    });
  });

  describe('error handling and edge cases', () => {
    it('should handle network timeouts', async () => {
      mockFetch.mockRejectedValue(new Error('Network timeout'));

      await expect(GoogleBooksService.searchBooks({ query: 'test' })).rejects.toThrow('Network timeout');
    });

    it('should handle malformed JSON responses', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => {
          throw new Error('Invalid JSON');
        }
      });

      await expect(GoogleBooksService.searchBooks({ query: 'test' })).rejects.toThrow('Invalid JSON');
    });

    it('should handle server errors with custom status codes', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error'
      });

      await expect(GoogleBooksService.searchBooks({ query: 'test' })).rejects.toThrow('Erro na busca: 500 Internal Server Error');
    });

    it('should handle rate limiting (429 status)', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 429,
        statusText: 'Too Many Requests'
      });

      await expect(GoogleBooksService.searchBooks({ query: 'test' })).rejects.toThrow('Erro na busca: 429 Too Many Requests');
    });
  });

  describe('URL encoding and special characters', () => {
    it('should properly encode query with special characters', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => mockGoogleBooksResponse
      });

      await GoogleBooksService.searchBooks({
        query: 'título com acentos & símbolos: ação!'
      });

      const calledUrl = (mockFetch as jest.Mock).mock.calls[0][0];
      expect(calledUrl).toContain('t%C3%ADtulo+com+acentos+%26+s%C3%ADmbolos%3A+a%C3%A7%C3%A3o%21');
    });

    it('should handle queries with quotes and brackets', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => mockGoogleBooksResponse
      });

      await GoogleBooksService.searchBooks({
        query: '"exact phrase" [category]'
      });

      const calledUrl = (mockFetch as jest.Mock).mock.calls[0][0];
      expect(calledUrl).toContain('%22exact+phrase%22+%5Bcategory%5D');
    });
  });
});
