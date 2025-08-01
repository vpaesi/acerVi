import { Book, BookVolumeInfo, GoogleBooksResponse, BookSearchParams } from './book';

describe('Book Types', () => {
  it('should have valid Book interface', () => {
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
        pageCount: 300,
        categories: ['Fiction'],
        imageLinks: {
          thumbnail: 'test-thumbnail.jpg'
        },
        industryIdentifiers: [
          { type: 'ISBN_13', identifier: '1234567890123' }
        ]
      }
    };

    expect(mockBook.kind).toBe('books#volume');
    expect(mockBook.id).toBe('1');
    expect(mockBook.etag).toBe('test-etag');
    expect(mockBook.selfLink).toBe('test-link');
    expect(mockBook.volumeInfo).toBeDefined();
  });

  it('should have valid BookVolumeInfo interface', () => {
    const mockVolumeInfo: BookVolumeInfo = {
      title: 'Test Book',
      authors: ['Test Author'],
      publisher: 'Test Publisher',
      publishedDate: '2024-01-01',
      description: 'Test description',
      pageCount: 300,
      categories: ['Fiction', 'Novel'],
      averageRating: 4.5,
      ratingsCount: 100,
      imageLinks: {
        smallThumbnail: 'small.jpg',
        thumbnail: 'thumb.jpg',
        small: 'small.jpg',
        medium: 'medium.jpg',
        large: 'large.jpg',
        extraLarge: 'xl.jpg'
      },
      industryIdentifiers: [
        { type: 'ISBN_10', identifier: '1234567890' },
        { type: 'ISBN_13', identifier: '1234567890123' }
      ],
      language: 'en',
      previewLink: 'https://preview.link',
      infoLink: 'https://info.link',
      canonicalVolumeLink: 'https://canonical.link'
    };

    expect(mockVolumeInfo.title).toBe('Test Book');
    expect(Array.isArray(mockVolumeInfo.authors)).toBe(true);
    expect(mockVolumeInfo.authors).toContain('Test Author');
    expect(typeof mockVolumeInfo.pageCount).toBe('number');
    expect(typeof mockVolumeInfo.averageRating).toBe('number');
    expect(Array.isArray(mockVolumeInfo.categories)).toBe(true);
    expect(Array.isArray(mockVolumeInfo.industryIdentifiers)).toBe(true);
  });

  it('should have valid GoogleBooksResponse interface', () => {
    const mockResponse: GoogleBooksResponse = {
      kind: 'books#volumes',
      totalItems: 100,
      items: [
        {
          kind: 'books#volume',
          id: '1',
          etag: 'test',
          selfLink: 'link',
          volumeInfo: {
            title: 'Book 1',
            authors: ['Author 1']
          }
        },
        {
          kind: 'books#volume',
          id: '2',
          etag: 'test2',
          selfLink: 'link2',
          volumeInfo: {
            title: 'Book 2',
            authors: ['Author 2']
          }
        }
      ]
    };

    expect(mockResponse.kind).toBe('books#volumes');
    expect(typeof mockResponse.totalItems).toBe('number');
    expect(Array.isArray(mockResponse.items)).toBe(true);
    expect(mockResponse.items).toHaveLength(2);
    expect(mockResponse.totalItems).toBe(100);
  });

  it('should have valid BookSearchParams interface', () => {
    const mockParams: BookSearchParams = {
      query: 'javascript programming',
      maxResults: 20,
      startIndex: 0,
      orderBy: 'relevance',
      filter: 'free-ebooks',
      langRestrict: 'en',
      printType: 'books'
    };

    expect(typeof mockParams.query).toBe('string');
    expect(typeof mockParams.maxResults).toBe('number');
    expect(typeof mockParams.startIndex).toBe('number');
    expect(['relevance', 'newest']).toContain(mockParams.orderBy);
    expect(['partial', 'full', 'free-ebooks', 'paid-ebooks', 'ebooks']).toContain(mockParams.filter);
    expect(['all', 'books', 'magazines']).toContain(mockParams.printType);
  });

  it('should support minimal book structure', () => {
    const minimalBook: Book = {
      kind: 'books#volume',
      id: 'minimal-id',
      etag: 'minimal-etag',
      selfLink: 'minimal-link',
      volumeInfo: {
        title: 'Minimal Book'
      }
    };

    expect(minimalBook.volumeInfo.title).toBe('Minimal Book');
    expect(minimalBook.volumeInfo.authors).toBeUndefined();
    expect(minimalBook.volumeInfo.pageCount).toBeUndefined();
  });

  it('should support empty GoogleBooksResponse', () => {
    const emptyResponse: GoogleBooksResponse = {
      kind: 'books#volumes',
      totalItems: 0
    };

    expect(emptyResponse.items).toBeUndefined();
    expect(emptyResponse.totalItems).toBe(0);
  });

  it('should support minimal search params', () => {
    const minimalParams: BookSearchParams = {
      query: 'test'
    };

    expect(minimalParams.query).toBe('test');
    expect(minimalParams.maxResults).toBeUndefined();
    expect(minimalParams.startIndex).toBeUndefined();
  });
});
