import { useState } from 'react';
import { BookSearch } from './BookSearch';
import { Book } from '../types/book';
import { PersonalBook } from '../types/personalLibrary';
import { generateCutter, getPrimaryCategories, getSubcategoriesByPrimary } from '../services/cduService';
import './BookSearchModal.css';

interface BookSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToLibrary: (book: Omit<PersonalBook, 'id' | 'addedAt' | 'updatedAt'>) => void;
}

export const BookSearchModal: React.FC<BookSearchModalProps> = ({
  isOpen,
  onClose,
  onAddToLibrary,
}) => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleBookSelect = (book: Book) => {
    setSelectedBook(book);
    setShowAddForm(true);
  };

  const handleAddToLibrary = (formData: {
    status: PersonalBook['status'];
    condition: PersonalBook['condition'];
    rating?: number;
    personalNotes?: string;
    physicalLocation?: string;
    favorite?: boolean;
    cduCode?: string;
    cutterCode?: string;
    series?: string;
    volumeNumber?: string;
    edition?: string;
  }) => {
    if (!selectedBook) return;

    const { volumeInfo } = selectedBook;
    
    const personalBook: Omit<PersonalBook, 'id' | 'addedAt' | 'updatedAt'> = {
      title: volumeInfo.title,
      authors: volumeInfo.authors || ['Autor desconhecido'],
      isbn: volumeInfo.industryIdentifiers?.find(id => id.type === 'ISBN_13')?.identifier ||
            volumeInfo.industryIdentifiers?.find(id => id.type === 'ISBN_10')?.identifier,
      publisher: volumeInfo.publisher,
      publishedDate: volumeInfo.publishedDate,
      pageCount: volumeInfo.pageCount,
      edition: formData.edition,
      description: volumeInfo.description,
      imageUrl: volumeInfo.imageLinks?.thumbnail || volumeInfo.imageLinks?.smallThumbnail,
      categories: volumeInfo.categories,
      callNumber: formData.cduCode && formData.cutterCode ? 
        `${formData.cduCode} ${formData.cutterCode}` : undefined,
      series: formData.series,
      volumeNumber: formData.volumeNumber,
      ...formData,
    };

    onAddToLibrary(personalBook);
    handleClose();
  };

  const handleClose = () => {
    setSelectedBook(null);
    setShowAddForm(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Adicionar Livro</h2>
          <button className="close-button" onClick={handleClose}>
            ×
          </button>
        </div>

        <div className="modal-body">
          {!showAddForm ? (
            <BookSearch 
              onBookSelect={handleBookSelect}
              maxResults={12}
            />
          ) : (
            <AddToLibraryForm
              book={selectedBook!}
              onSubmit={handleAddToLibrary}
              onCancel={() => setShowAddForm(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

interface AddToLibraryFormProps {
  book: Book;
  onSubmit: (data: {
    status: PersonalBook['status'];
    condition: PersonalBook['condition'];
    rating?: number;
    personalNotes?: string;
    physicalLocation?: string;
    favorite?: boolean;
    cduCode?: string;
    cutterCode?: string;
  }) => void;
  onCancel: () => void;
}

const AddToLibraryForm: React.FC<AddToLibraryFormProps> = ({
  book,
  onSubmit,
  onCancel,
}) => {
  const [primaryCDU, setPrimaryCDU] = useState('');
  const [formData, setFormData] = useState({
    status: 'não-lido' as PersonalBook['status'],
    condition: 'novo' as PersonalBook['condition'],
    rating: undefined as number | undefined,
    personalNotes: '',
    physicalLocation: '',
    favorite: false,
    cduCode: '',
    cutterCode: '',
    series: '',
    volumeNumber: '',
    edition: '',
  });

  const handleCDUChange = (cduCode: string) => {
    const authorName = book.volumeInfo.authors?.[0] || '';
    const cutterCode = generateCutter(authorName, book.volumeInfo.title);
    
    setFormData(prev => ({
      ...prev,
      cduCode,
      cutterCode
    }));
  };

  const handlePrimaryCDUChange = (primaryCode: string) => {
    setPrimaryCDU(primaryCode);
    setFormData(prev => ({
      ...prev,
      cduCode: '',
      cutterCode: '',
      series: '',
      volumeNumber: '',
      edition: ''
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const { volumeInfo } = book;

  return (
    <div className="add-to-library-form">
      <div className="book-preview">
        <div className="book-image">
          {volumeInfo.imageLinks?.thumbnail ? (
            <img src={volumeInfo.imageLinks.thumbnail} alt={volumeInfo.title} />
          ) : (
            <div className="no-image">Sem imagem</div>
          )}
        </div>
        <div className="book-details">
          <h3>{volumeInfo.title}</h3>
          <p className="authors">{volumeInfo.authors?.join(', ')}</p>
          <p className="publisher">{volumeInfo.publisher} • {volumeInfo.publishedDate}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="library-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="status">Status de Leitura</label>
            <select
              id="status"
              value={formData.status}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                status: e.target.value as PersonalBook['status'] 
              }))}
              required
            >
              <option value="não-lido">Não Lido</option>
              <option value="quero-ler">Quero Ler</option>
              <option value="lendo">Lendo</option>
              <option value="lido">Lido</option>
              <option value="abandonado">Abandonado</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="condition">Condição</label>
            <select
              id="condition"
              value={formData.condition}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                condition: e.target.value as PersonalBook['condition'] 
              }))}
              required
            >
              <option value="novo">Novo</option>
              <option value="seminovo">Seminovo</option>
              <option value="usado">Usado</option>
              <option value="danificado">Danificado</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="primary-cdu">Categoria Principal CDU</label>
            <select
              id="primary-cdu"
              value={primaryCDU}
              onChange={(e) => handlePrimaryCDUChange(e.target.value)}
            >
              <option value="">Selecione a categoria principal (0-9)</option>
              {getPrimaryCategories().map((category) => (
                <option key={category.code} value={category.code}>
                  {category.code} - {category.description}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="cdu">Classificação Específica</label>
            <select
              id="cdu"
              value={formData.cduCode}
              onChange={(e) => handleCDUChange(e.target.value)}
              disabled={!primaryCDU}
            >
              <option value="">
                {primaryCDU ? 'Selecione a classificação específica' : 'Primeiro selecione a categoria principal'}
              </option>
              {primaryCDU && getSubcategoriesByPrimary(primaryCDU).map((cdu) => (
                <option key={cdu.code} value={cdu.code}>
                  {cdu.code} - {cdu.description}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="cutter">Código Cutter</label>
            <input
              type="text"
              id="cutter"
              value={formData.cutterCode}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                cutterCode: e.target.value 
              }))}
              placeholder="Gerado automaticamente"
              title={`Gerado com base no autor: ${book.volumeInfo.authors?.[0] || 'N/A'}`}
            />
            <p className="field-hint">
              <strong>Dica:</strong> Além do código gerado automaticamente, adicione a primeira letra do título (desconsiderando artigos como "A", "O", "Um", "Uma", etc.). Por exemplo: para "O Senhor dos Anéis", use a letra "S".
            </p>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="physicalLocation">Localização Física</label>
            <input
              type="text"
              id="physicalLocation"
              value={formData.physicalLocation}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                physicalLocation: e.target.value 
              }))}
              placeholder="Ex: Sala 1, Estante A, Prateleira 2"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="series">Série Relacionada</label>
            <input
              type="text"
              id="series"
              value={formData.series}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                series: e.target.value 
              }))}
              placeholder="Ex: Harry Potter, Senhor dos Anéis"
            />
          </div>

          <div className="form-group">
            <label htmlFor="volumeNumber">Número do Volume</label>
            <input
              type="text"
              id="volumeNumber"
              value={formData.volumeNumber}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                volumeNumber: e.target.value 
              }))}
              placeholder="Ex: v. 1, Livro 2, Parte III"
            />
          </div>

          <div className="form-group">
            <label htmlFor="edition">Edição</label>
            <input
              type="text"
              id="edition"
              value={formData.edition}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                edition: e.target.value 
              }))}
              placeholder="Ex: Ilustrada, Colecionador, Revisada"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="rating">Avaliação (1-5 estrelas)</label>
            <select
              id="rating"
              value={formData.rating || ''}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                rating: e.target.value ? Number(e.target.value) : undefined 
              }))}
            >
              <option value="">Sem avaliação</option>
              <option value="1">1 ⭐</option>
              <option value="2">2 ⭐</option>
              <option value="3">3 ⭐</option>
              <option value="4">4 ⭐</option>
              <option value="5">5 ⭐</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="notes">Notas Pessoais</label>
          <textarea
            id="notes"
            value={formData.personalNotes}
            onChange={(e) => setFormData(prev => ({ ...prev, personalNotes: e.target.value }))}
            placeholder="Suas impressões, comentários..."
            rows={3}
          />
        </div>

        <div className="form-group checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={formData.favorite}
              onChange={(e) => setFormData(prev => ({ ...prev, favorite: e.target.checked }))}
            />
            <span className="checkmark"></span>
            Marcar como favorito
          </label>
        </div>

        <div className="form-actions">
          <button type="button" onClick={onCancel} className="cancel-button">
            Cancelar
          </button>
          <button type="submit" className="submit-button">
            Adicionar ao Acervo
          </button>
        </div>
      </form>
    </div>
  );
};
