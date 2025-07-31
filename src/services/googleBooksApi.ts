import { Book, GoogleBooksResponse, BookSearchParams } from '../types/book';

const BASE_URL = 'https://www.googleapis.com/books/v1';

export class GoogleBooksService {
  /**
   * Busca livros na Google Books API
   * @param params Parâmetros de busca
   * @returns Promise com a resposta da API
   */
  static async searchBooks(params: BookSearchParams): Promise<GoogleBooksResponse> {
    try {
      const searchParams = new URLSearchParams();
      
      // Parâmetro obrigatório
      searchParams.append('q', params.query);
      
      // Parâmetros opcionais
      if (params.maxResults) {
        searchParams.append('maxResults', params.maxResults.toString());
      }
      
      if (params.startIndex) {
        searchParams.append('startIndex', params.startIndex.toString());
      }
      
      if (params.orderBy) {
        searchParams.append('orderBy', params.orderBy);
      }
      
      if (params.filter) {
        searchParams.append('filter', params.filter);
      }
      
      if (params.langRestrict) {
        searchParams.append('langRestrict', params.langRestrict);
      }
      
      if (params.printType) {
        searchParams.append('printType', params.printType);
      }

      const url = `${BASE_URL}/volumes?${searchParams.toString()}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Erro na busca: ${response.status} ${response.statusText}`);
      }
      
      const data: GoogleBooksResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao buscar livros:', error);
      throw error;
    }
  }

  /**
   * Busca um livro específico pelo ID
   * @param bookId ID do livro
   * @returns Promise com os dados do livro
   */
  static async getBookById(bookId: string): Promise<Book> {
    try {
      const url = `${BASE_URL}/volumes/${bookId}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Erro ao buscar livro: ${response.status} ${response.statusText}`);
      }
      
      const data: Book = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao buscar livro por ID:', error);
      throw error;
    }
  }

  /**
   * Busca livros por ISBN
   * @param isbn ISBN do livro
   * @returns Promise com a resposta da API
   */
  static async searchByISBN(isbn: string): Promise<GoogleBooksResponse> {
    return this.searchBooks({
      query: `isbn:${isbn}`
    });
  }

  /**
   * Busca livros por autor
   * @param author Nome do autor
   * @param maxResults Número máximo de resultados
   * @returns Promise com a resposta da API
   */
  static async searchByAuthor(author: string, maxResults = 10): Promise<GoogleBooksResponse> {
    return this.searchBooks({
      query: `inauthor:"${author}"`,
      maxResults
    });
  }

  /**
   * Busca livros por título
   * @param title Título do livro
   * @param maxResults Número máximo de resultados
   * @returns Promise com a resposta da API
   */
  static async searchByTitle(title: string, maxResults = 10): Promise<GoogleBooksResponse> {
    return this.searchBooks({
      query: `intitle:"${title}"`,
      maxResults
    });
  }

  /**
   * Busca livros por categoria/gênero
   * @param category Categoria do livro
   * @param maxResults Número máximo de resultados
   * @returns Promise com a resposta da API
   */
  static async searchByCategory(category: string, maxResults = 10): Promise<GoogleBooksResponse> {
    return this.searchBooks({
      query: `subject:"${category}"`,
      maxResults
    });
  }
}
