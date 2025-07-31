import { useState } from 'react';
import { BookSearch } from '../components/BookSearch';
import { Book } from '../types/book';

export default function HomePage() {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const handleBookSelect = (book: Book) => {
    setSelectedBook(book);
    console.log('Livro selecionado:', book);
  };

  return (
    <div style={{ padding: '20px' }}>
      <header style={{ marginBottom: '40px', textAlign: 'center' }}>
        <h1>AcerVi - Seu Acervo Virtual</h1>
        <p>Descubra e gerencie sua biblioteca pessoal</p>
      </header>

      <main>
        <section>
          <h2>Buscar Livros</h2>
          <BookSearch 
            onBookSelect={handleBookSelect}
            maxResults={20}
          />
        </section>

        {selectedBook && (
          <section style={{ marginTop: '40px' }}>
            <h2>Livro Selecionado</h2>
            <div style={{ 
              border: '1px solid #ddd', 
              padding: '20px', 
              borderRadius: '8px',
              backgroundColor: '#f9f9f9'
            }}>
              <h3>{selectedBook.volumeInfo.title}</h3>
              {selectedBook.volumeInfo.authors && (
                <p><strong>Autor(es):</strong> {selectedBook.volumeInfo.authors.join(', ')}</p>
              )}
              {selectedBook.volumeInfo.publisher && (
                <p><strong>Editora:</strong> {selectedBook.volumeInfo.publisher}</p>
              )}
              {selectedBook.volumeInfo.publishedDate && (
                <p><strong>Data de Publicação:</strong> {selectedBook.volumeInfo.publishedDate}</p>
              )}
              {selectedBook.volumeInfo.pageCount && (
                <p><strong>Páginas:</strong> {selectedBook.volumeInfo.pageCount}</p>
              )}
              {selectedBook.volumeInfo.description && (
                <div>
                  <strong>Descrição:</strong>
                  <p style={{ marginTop: '10px', lineHeight: '1.6' }}>
                    {selectedBook.volumeInfo.description}
                  </p>
                </div>
              )}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
