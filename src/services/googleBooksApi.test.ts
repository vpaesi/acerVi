import { GoogleBooksService } from './googleBooksApi';
import { GoogleBooksResponse, Book } from '../types/book';

// Mock do fetch global
global.fetch = jest.fn();
const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

describe('GoogleBooksService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('searchBooks', () => {
    it('should search books successfully', async () => {
      const mockResponse: GoogleBooksResponse = {
        kind: 'books#volumes',
        totalItems: 1,
        items: [{
          kind: 'books#volume',
          id: '1',
          etag: 'test-etag',
          selfLink: 'test-link',
          volumeInfo: {
            title: 'Test Book',
            authors: ['Test Author'],
            publisher: 'Test Publisher',
            publishedDate: '2024',
            description: 'Test description',
            industryIdentifiers: [
              { type: 'ISBN_13', identifier: '1234567890123' }
            ],
            pageCount: 300,
            categories: ['Fiction'],
            imageLinks: {
              thumbnail: 'test-thumbnail.jpg'
            }
          }
        }]
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const result = await GoogleBooksService.searchBooks({ query: 'test' });

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('https://www.googleapis.com/books/v1/volumes?q=test')
      );
      expect(result).toEqual(mockResponse);
    });

    it('should handle search with all parameters', async () => {
      const mockResponse: GoogleBooksResponse = {
        kind: 'books#volumes',
        totalItems: 0,
        items: []
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      await GoogleBooksService.searchBooks({
        query: 'test',
        maxResults: 10,
        startIndex: 0,
        orderBy: 'relevance',
        filter: 'free-ebooks',
        langRestrict: 'en',
        printType: 'books'
      });

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('q=test')
      );
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('maxResults=10')
      );
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('orderBy=relevance')
      );
    });

    it('should handle API errors', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        statusText: 'Bad Request',
      } as Response);

      await expect(GoogleBooksService.searchBooks({ query: 'test' }))
        .rejects.toThrow('Erro na busca: 400 Bad Request');
    });

    it('should handle network errors', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      await expect(GoogleBooksService.searchBooks({ query: 'test' }))
        .rejects.toThrow('Network error');
    });
  });

  describe('getBookById', () => {
    it('should get book by ID successfully', async () => {
      const mockBook: Book = {
        kind: 'books#volume',
        id: '1',
        etag: 'test-etag',
        selfLink: 'test-link',
        volumeInfo: {
          title: 'Test Book',
          authors: ['Test Author'],
          publisher: 'Test Publisher',
          publishedDate: '2024',
          description: 'Test description',
          industryIdentifiers: [
            { type: 'ISBN_13', identifier: '1234567890123' }
          ],
          pageCount: 300,
          categories: ['Fiction'],
          imageLinks: {
            thumbnail: 'test-thumbnail.jpg'
          }
        }
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockBook,
      } as Response);

      const result = await GoogleBooksService.getBookById('1');

      expect(mockFetch).toHaveBeenCalledWith(
        'https://www.googleapis.com/books/v1/volumes/1'
      );
      expect(result).toEqual(mockBook);
    });

    it('should handle book not found', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      } as Response);

      await expect(GoogleBooksService.getBookById('nonexistent'))
        .rejects.toThrow('Erro ao buscar livro: 404 Not Found');
    });

    it('should handle network errors', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      await expect(GoogleBooksService.getBookById('1'))
        .rejects.toThrow('Network error');
    });
  });

  describe('searchByTitle', () => {
    it('should search by title', async () => {
      const mockResponse: GoogleBooksResponse = {
        kind: 'books#volumes',
        totalItems: 0,
        items: []
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      await GoogleBooksService.searchByTitle('Test Title');

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('q=intitle%3A%22Test+Title%22')
      );
    });

    it('should search by title with maxResults', async () => {
      const mockResponse: GoogleBooksResponse = {
        kind: 'books#volumes',
        totalItems: 0,
        items: []
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      await GoogleBooksService.searchByTitle('Test Title', 5);

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('maxResults=5')
      );
    });
  });

  describe('searchByAuthor', () => {
    it('should search by author', async () => {
      const mockResponse: GoogleBooksResponse = {
        kind: 'books#volumes',
        totalItems: 0,
        items: []
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      await GoogleBooksService.searchByAuthor('Test Author');

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('q=inauthor%3A%22Test+Author%22')
      );
    });
  });

  describe('searchByISBN', () => {
    it('should search by ISBN', async () => {
      const mockResponse: GoogleBooksResponse = {
        kind: 'books#volumes',
        totalItems: 0,
        items: []
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      await GoogleBooksService.searchByISBN('1234567890123');

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('q=isbn%3A1234567890123')
      );
    });
  });
});
