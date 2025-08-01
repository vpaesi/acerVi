import React, { useState, useEffect } from 'react';
import { PersonalBook } from '../types/personalLibrary';
import { generateCutter, getPrimaryCategories, getSubcategoriesByPrimary } from '../services/cduService';

interface EditBookModalProps {
  isOpen: boolean;
  book: PersonalBook | null;
  onClose: () => void;
  onSave: (id: string, updates: Partial<PersonalBook>) => void;
  onRemove: (id: string) => void;
}

export const EditBookModal: React.FC<EditBookModalProps> = ({
  isOpen,
  book,
  onClose,
  onSave,
  onRemove,
}) => {
  const [formData, setFormData] = useState<Partial<PersonalBook>>({});
  const [primaryCDU, setPrimaryCDU] = useState('');

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title,
        authors: book.authors,
        publisher: book.publisher,
        publishedDate: book.publishedDate,
        isbn: book.isbn,
        pageCount: book.pageCount,
        edition: book.edition,
        description: book.description,
        status: book.status,
        condition: book.condition,
        favorite: book.favorite,
        rating: book.rating,
        cduCode: book.cduCode,
        cutterCode: book.cutterCode,
        callNumber: book.callNumber,
        series: book.series,
        volumeNumber: book.volumeNumber,
        physicalLocation: book.physicalLocation,
        personalNotes: book.personalNotes,
        purchaseDate: book.purchaseDate,
        purchasePrice: book.purchasePrice,
        imageUrl: book.imageUrl,
      });

      if (book.cduCode) {
        const primaryCode = book.cduCode.charAt(0);
        setPrimaryCDU(primaryCode);
      } else {
        setPrimaryCDU('');
      }
    }
  }, [book]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!book) return;

    let updatedData = { ...formData };
    if (formData.cduCode && formData.cduCode !== book.cduCode) {
      const cutterCode = generateCutter(formData.authors?.[0] || '', formData.title || '');
      const callNumber = `${formData.cduCode} ${cutterCode}`;
      updatedData = {
        ...updatedData,
        cutterCode,
        callNumber,
      };
    }

    onSave(book.id, updatedData);
    onClose();
  };

  const handleCDUChange = (cduCode: string) => {
    const cutterCode = generateCutter(formData.authors?.[0] || '', formData.title || '');
    const callNumber = cduCode ? `${cduCode} ${cutterCode}` : '';
    
    setFormData(prev => ({
      ...prev,
      cduCode,
      cutterCode,
      callNumber,
    }));
  };

  const handleCutterChange = (cutterCode: string) => {
    const callNumber = formData.cduCode && cutterCode ? `${formData.cduCode} ${cutterCode}` : '';
    
    setFormData(prev => ({
      ...prev,
      cutterCode,
      callNumber,
    }));
  };

  const handlePrimaryCDUChange = (primaryCode: string) => {
    setPrimaryCDU(primaryCode);
    setFormData(prev => ({
      ...prev,
      cduCode: '',
      cutterCode: '',
      callNumber: ''
    }));
  };

  const handleAuthorsChange = (value: string) => {
    const authors = value.split(',').map(author => author.trim()).filter(Boolean);
    setFormData(prev => ({ ...prev, authors }));
  };

  if (!isOpen || !book) return null;

  return (
    <div className="modal-overlay edit-modal" onClick={onClose}>
      <div className="modal-content edit-book-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Editar Livro</h2>
          <button className="close-button" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="edit-form">
          <div className="form-grid">
            <div className="form-section">
              <h3>Ficha catalográfica</h3>
              
              <div className="form-group">
                <label>Título *</label>
                <input
                  type="text"
                  value={formData.title || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  required
                />
              </div>

              <div className="form-group">
                <label>Autores * (separados por vírgula)</label>
                <input
                  type="text"
                  value={formData.authors?.join(', ') || ''}
                  onChange={(e) => handleAuthorsChange(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Editora</label>
                <input
                  type="text"
                  value={formData.publisher || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, publisher: e.target.value }))}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Data de Publicação</label>
                  <input
                    type="text"
                    value={formData.publishedDate || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, publishedDate: e.target.value }))}
                    placeholder="YYYY-MM-DD"
                  />
                </div>

                <div className="form-group">
                  <label>ISBN</label>
                  <input
                    type="text"
                    value={formData.isbn || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, isbn: e.target.value }))}
                  />
                </div>

                <div className="form-group">
                  <label>Páginas</label>
                  <input
                    type="number"
                    value={formData.pageCount || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, pageCount: parseInt(e.target.value) || undefined }))}
                  />
                </div>

                <div className="form-group">
                  <label>Edição</label>
                  <input
                    type="text"
                    value={formData.edition || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, edition: e.target.value }))}
                    placeholder="Ex: Ilustrada, Colecionador, Revisada"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Descrição</label>
                <textarea
                  value={formData.description || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                />
              </div>

              <div className="form-group">
                <label>URL da Imagem</label>
                <input
                  type="url"
                  value={formData.imageUrl || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Categoria Principal CDU</label>
                  <select
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
                  <label>Classificação Específica</label>
                  <select
                    value={formData.cduCode || ''}
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
                  <label>Código Cutter</label>
                  <input
                    type="text"
                    value={formData.cutterCode || ''}
                    onChange={(e) => handleCutterChange(e.target.value)}
                    placeholder="Gerado automaticamente"
                  />
                  <p className="field-hint">
                    <strong>Dica:</strong> Além do código gerado automaticamente, adicione a primeira letra do título (desconsiderando artigos como "A", "O", "Um", "Uma", etc.). 
                    Por exemplo: para "O Senhor dos Anéis", use a letra "S".
                  </p>
                </div>

                <div className="form-group">
                  <label>Número de Chamada</label>
                  <input
                    type="text"
                    value={formData.callNumber || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, callNumber: e.target.value }))}
                    readOnly
                    className="readonly"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Série Relacionada</label>
                  <input
                    type="text"
                    value={formData.series || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, series: e.target.value }))}
                    placeholder="Ex: Harry Potter, Senhor dos Anéis"
                  />
                </div>

                <div className="form-group">
                  <label>Número do Volume</label>
                  <input
                    type="text"
                    value={formData.volumeNumber || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, volumeNumber: e.target.value }))}
                    placeholder="Ex: v. 1, Livro 2, Parte III"
                  />
                </div>
              </div>

            </div>

            <div className="form-section">
              <h3>Status, Condição e Compra</h3>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Status de Leitura</label>
                  <select
                    value={formData.status || 'não-lido'}
                    onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as PersonalBook['status'] }))}
                  >
                    <option value="não-lido">Não Lido</option>
                    <option value="quero-ler">Quero Ler</option>
                    <option value="lendo">Lendo</option>
                    <option value="lido">Lido</option>
                    <option value="abandonado">Abandonado</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Condição</label>
                  <select
                    value={formData.condition || 'novo'}
                    onChange={(e) => setFormData(prev => ({ ...prev, condition: e.target.value as PersonalBook['condition'] }))}
                  >
                    <option value="novo">Novo</option>
                    <option value="seminovo">Seminovo</option>
                    <option value="usado">Usado</option>
                    <option value="danificado">Danificado</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Avaliação (1-5 estrelas)</label>
                  <select
                    value={formData.rating || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, rating: e.target.value ? parseInt(e.target.value) : undefined }))}
                  >
                    <option value="">Sem avaliação</option>
                    <option value="1">1 ⭐</option>
                    <option value="2">2 ⭐⭐</option>
                    <option value="3">3 ⭐⭐⭐</option>
                    <option value="4">4 ⭐⭐⭐⭐</option>
                    <option value="5">5 ⭐⭐⭐⭐⭐</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.favorite || false}
                    onChange={(e) => setFormData(prev => ({ ...prev, favorite: e.target.checked }))}
                  />
                  Marcar como favorito
                </label>
              </div>

              <div className="form-group">
                <label>Localização Física</label>
                <input
                  type="text"
                  value={formData.physicalLocation || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, physicalLocation: e.target.value }))}
                  placeholder="Ex: Sala de Psicologia, Estante C, Prateleira 1"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Data da Compra</label>
                  <input
                    type="date"
                    value={formData.purchaseDate || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, purchaseDate: e.target.value }))}
                  />
                </div>

                <div className="form-group">
                  <label>Preço Pago</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.purchasePrice || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, purchasePrice: parseFloat(e.target.value) || undefined }))}
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Local da Compra</label>
                <input
                  type="text"
                  value=""
                  onChange={() => {}}
                  placeholder="Ex: Livraria Saraiva, Amazon, etc."
                />
              </div>
            </div>

            <div className="form-section full-width">
              <h3>Notas Pessoais</h3>
              
              <div className="form-group">
                <label>Anotações</label>
                <textarea
                  value={formData.personalNotes || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, personalNotes: e.target.value }))}
                  rows={4}
                  placeholder="Suas impressões, citações favoritas, observações..."
                />
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              onClick={() => {
                if (window.confirm('Tem certeza que deseja remover este livro do seu acervo?')) {
                  onRemove(book.id);
                  onClose();
                }
              }}
              className="remove-button"
            >
              🗑️ Remover do Acervo
            </button>
            <div className="action-buttons-right">
              <button type="button" onClick={onClose} className="cancel-button">
                Cancelar
              </button>
              <button type="submit" className="save-button">
                Salvar Alterações
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = `
.edit-book-modal {
  max-width: 900px;
  max-height: 90vh;
  overflow-y: auto;
}

.edit-form {
  padding: 0;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 24px;
}

.form-section {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.form-section.full-width {
  grid-column: 1 / -1;
}

.form-section h3 {
  margin: 0 0 16px 0;
  color: #2563eb;
  font-size: 1.1rem;
  font-weight: 600;
  border-bottom: 2px solid #e9ecef;
  padding-bottom: 8px;
}

.form-group {
  margin-bottom: 16px;
}

.form-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 12px;
}

.form-group label {
  display: block;
  margin-bottom: 6px;
  font-weight: 500;
  color: #374151;
  font-size: 0.9rem;
}

.checkbox-label {
  display: flex !important;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 10px 12px;
  border: 2px solid #e5e7eb;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.2s ease;
  font-family: inherit;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.form-group input.readonly {
  background-color: #f3f4f6;
  color: #6b7280;
  cursor: not-allowed;
}

.form-group textarea {
  resize: vertical;
  min-height: 80px;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding-top: 20px;
  border-top: 1px solid #e5e7eb;
}

.action-buttons-right {
  display: flex;
  gap: 12px;
}

.cancel-button,
.save-button,
.remove-button {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.cancel-button {
  background: #f3f4f6;
  color: #374151;
}

.cancel-button:hover {
  background: #e5e7eb;
}

.save-button {
  background: #2563eb;
  color: white;
}

.save-button:hover {
  background: #1d4ed8;
}

.remove-button {
  background: #dc3545;
  color: white;
}

.remove-button:hover {
  background: #c82333;
}

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .form-actions {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }
  
  .action-buttons-right {
    order: -1;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .edit-book-modal {
    max-width: 95vw;
    margin: 10px;
  }
}
`;

if (typeof document !== 'undefined' && !document.getElementById('edit-book-modal-styles')) {
  const styleElement = document.createElement('style');
  styleElement.id = 'edit-book-modal-styles';
  styleElement.textContent = styles;
  document.head.appendChild(styleElement);
}
