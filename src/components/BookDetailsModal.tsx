import React from 'react';
import { PersonalBook } from '../types/personalLibrary';
import { getMainCategories } from '../services/cduService';
import './BookDetailsModal.css';

interface BookDetailsModalProps {
  isOpen: boolean;
  book: PersonalBook | null;
  onClose: () => void;
  onEdit: (book: PersonalBook) => void;
  onToggleFavorite: (bookId: string) => void;
  onUpdateStatus: (bookId: string, status: PersonalBook['status']) => void;
  onRemove: (bookId: string) => void;
}

export const BookDetailsModal: React.FC<BookDetailsModalProps> = ({
  isOpen,
  book,
  onClose,
  onEdit,
  onToggleFavorite,
  onUpdateStatus,
  onRemove
}) => {
  if (!isOpen || !book) return null;

  const getCDUDescription = (code?: string) => {
    if (!code) return '';
    const mainCategory = getMainCategories().find(cat => cat.code === code.charAt(0));
    return mainCategory?.description || '';
  };

  const getStatusColor = (status: PersonalBook['status']) => {
    const colors = {
      'não-lido': '#6c757d',
      'quero-ler': '#ffc107',
      'lendo': '#17a2b8',
      'lido': '#28a745',
      'abandonado': '#dc3545'
    };
    return colors[status] || '#6c757d';
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Não informado';
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="book-details-modal">
        {/* Header do Modal */}
        <div className="modal-header">
          <div className="modal-title">
            <h2>📖 Ficha Catalográfica</h2>
            <span className="marc21-label">Formato MARC21</span>
          </div>
          <div className="modal-actions">
            <button
              className={`favorite-btn ${book.favorite ? 'active' : ''}`}
              onClick={() => onToggleFavorite(book.id)}
              title={book.favorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
            >
              ⭐
            </button>
            <button
              className="edit-btn"
              onClick={() => onEdit(book)}
              title="Editar livro"
            >
              ✏️ Editar
            </button>
            <button
              className="close-btn"
              onClick={onClose}
              title="Fechar"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Conteúdo do Modal */}
        <div className="modal-content">
          {/* Seção Principal */}
          <div className="catalog-section main-info">
            <div className="book-cover-section">
              {book.imageUrl ? (
                <img 
                  src={book.imageUrl} 
                  alt={`Capa de ${book.title}`}
                  className="book-cover-large"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              ) : (
                <div className="no-cover">
                  <span>📚</span>
                  <p>Sem capa</p>
                </div>
              )}
              
              {/* Status e Ações Rápidas */}
              <div className="quick-actions">
                <select
                  value={book.status}
                  onChange={(e) => onUpdateStatus(book.id, e.target.value as PersonalBook['status'])}
                  className="status-select-large"
                  style={{ backgroundColor: getStatusColor(book.status) }}
                >
                  <option value="não-lido">📋 Não Lido</option>
                  <option value="quero-ler">📝 Quero Ler</option>
                  <option value="lendo">📖 Lendo</option>
                  <option value="lido">✅ Lido</option>
                  <option value="abandonado">❌ Abandonado</option>
                </select>
                
                {book.rating && (
                  <div className="rating-display">
                    <span className="rating-label">Avaliação:</span>
                    <span className="stars">{'⭐'.repeat(book.rating)}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="book-details-section">
              {/* MARC21 001 - Número de Controle */}
              <div className="marc-field">
                <span className="marc-tag">001</span>
                <span className="marc-content">{book.id}</span>
                <span className="marc-description">Número de controle</span>
              </div>

              {/* MARC21 020 - ISBN */}
              {book.isbn && (
                <div className="marc-field">
                  <span className="marc-tag">020</span>
                  <span className="marc-content">$a {book.isbn}</span>
                  <span className="marc-description">ISBN</span>
                </div>
              )}

              {/* MARC21 082 - Classificação CDU */}
              {book.cduCode && (
                <div className="marc-field">
                  <span className="marc-tag">082</span>
                  <span className="marc-content">$a {book.cduCode} $2 CDU</span>
                  <span className="marc-description">Classificação Decimal Universal</span>
                </div>
              )}

              {/* MARC21 090 - Número de Chamada Local */}
              {book.callNumber && (
                <div className="marc-field">
                  <span className="marc-tag">090</span>
                  <span className="marc-content">$a {book.callNumber}</span>
                  <span className="marc-description">Número de chamada</span>
                </div>
              )}

              {/* MARC21 100 - Autor Principal */}
              {book.authors && book.authors.length > 0 && (
                <div className="marc-field">
                  <span className="marc-tag">100</span>
                  <span className="marc-content">$a {book.authors[0]}</span>
                  <span className="marc-description">Autor principal</span>
                </div>
              )}

              {/* MARC21 245 - Título */}
              <div className="marc-field title-field">
                <span className="marc-tag">245</span>
                <span className="marc-content">$a {book.title}</span>
                <span className="marc-description">Título</span>
              </div>

              {/* MARC21 260 - Publicação */}
              <div className="marc-field">
                <span className="marc-tag">260</span>
                <span className="marc-content">
                  {book.publisher && `$b ${book.publisher}`}
                  {book.publishedDate && ` $c ${book.publishedDate}`}
                </span>
                <span className="marc-description">Publicação</span>
              </div>

              {/* MARC21 300 - Descrição Física */}
              {book.pageCount && (
                <div className="marc-field">
                  <span className="marc-tag">300</span>
                  <span className="marc-content">$a {book.pageCount} p.</span>
                  <span className="marc-description">Descrição física</span>
                </div>
              )}

              {/* MARC21 520 - Sumário/Resumo */}
              {book.description && (
                <div className="marc-field description-field">
                  <span className="marc-tag">520</span>
                  <span className="marc-content">$a {book.description}</span>
                  <span className="marc-description">Resumo</span>
                </div>
              )}

              {/* MARC21 650 - Assunto */}
              {book.categories && book.categories.length > 0 && (
                <div className="marc-field">
                  <span className="marc-tag">650</span>
                  <span className="marc-content">
                    {book.categories.map((cat, index) => 
                      `$a ${cat}${index < book.categories!.length - 1 ? ' ' : ''}`
                    ).join('')}
                  </span>
                  <span className="marc-description">Assuntos</span>
                </div>
              )}

              {/* MARC21 700 - Autores Secundários */}
              {book.authors && book.authors.length > 1 && (
                book.authors.slice(1).map((author, index) => (
                  <div key={index} className="marc-field">
                    <span className="marc-tag">700</span>
                    <span className="marc-content">$a {author}</span>
                    <span className="marc-description">Autor secundário</span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Informações do Acervo Pessoal */}
          <div className="catalog-section personal-info">
            <h3>📋 Informações do Acervo Pessoal</h3>
            
            <div className="personal-fields">
              <div className="field-group">
                <label>Condição Física:</label>
                <span className={`condition-badge ${book.condition}`}>
                  {book.condition.charAt(0).toUpperCase() + book.condition.slice(1)}
                </span>
              </div>

              {book.physicalLocation && (
                <div className="field-group">
                  <label>Localização:</label>
                  <span>📍 {book.physicalLocation}</span>
                </div>
              )}

              {book.purchaseDate && (
                <div className="field-group">
                  <label>Data de Aquisição:</label>
                  <span>📅 {formatDate(book.purchaseDate)}</span>
                </div>
              )}

              {book.purchasePrice && (
                <div className="field-group">
                  <label>Valor Pago:</label>
                  <span>💰 R$ {book.purchasePrice.toFixed(2)}</span>
                </div>
              )}

              {book.loanedTo && (
                <div className="field-group">
                  <label>Emprestado para:</label>
                  <span>👤 {book.loanedTo}</span>
                  {book.loanDate && (
                    <span className="loan-date"> (desde {formatDate(book.loanDate)})</span>
                  )}
                </div>
              )}

              <div className="field-group">
                <label>Adicionado em:</label>
                <span>📅 {formatDate(book.addedAt)}</span>
              </div>

              <div className="field-group">
                <label>Última atualização:</label>
                <span>🔄 {formatDate(book.updatedAt)}</span>
              </div>
            </div>

            {book.personalNotes && (
              <div className="notes-section">
                <label>Notas Pessoais:</label>
                <div className="notes-content">
                  {book.personalNotes}
                </div>
              </div>
            )}
          </div>

          {/* Informações Técnicas */}
          <div className="catalog-section technical-info">
            <h3>🔧 Informações Técnicas de Catalogação</h3>
            
            <div className="technical-fields">
              {book.cduCode && (
                <div className="field-group">
                  <label>Classificação CDU:</label>
                  <span className="cdu-display">
                    {book.cduCode}
                    {getCDUDescription(book.cduCode) && (
                      <span className="cdu-description"> - {getCDUDescription(book.cduCode)}</span>
                    )}
                  </span>
                </div>
              )}

              {book.cutterCode && (
                <div className="field-group">
                  <label>Código Cutter:</label>
                  <span className="cutter-display">{book.cutterCode}</span>
                </div>
              )}

              {book.callNumber && (
                <div className="field-group">
                  <label>Número de Chamada Completo:</label>
                  <span className="call-number-display">{book.callNumber}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer do Modal */}
        <div className="modal-footer">
          <button
            className="remove-btn"
            onClick={() => {
              if (window.confirm('Tem certeza que deseja remover este livro do acervo?')) {
                onRemove(book.id);
                onClose();
              }
            }}
          >
            🗑️ Remover do Acervo
          </button>
        </div>
      </div>
    </div>
  );
};
