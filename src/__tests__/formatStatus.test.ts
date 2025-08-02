import { formatStatus } from '../utils/formatStatus';

describe('formatStatus', () => {
  it('should format "não-lido" status correctly', () => {
    expect(formatStatus('não-lido')).toBe('Não lido');
  });

  it('should format "lendo" status correctly', () => {
    expect(formatStatus('lendo')).toBe('Lendo');
  });

  it('should format "lido" status correctly', () => {
    expect(formatStatus('lido')).toBe('Lido');
  });

  it('should format "quero-ler" status correctly', () => {
    expect(formatStatus('quero-ler')).toBe('Quero ler');
  });

  it('should format "abandonado" status correctly', () => {
    expect(formatStatus('abandonado')).toBe('Abandonado');
  });

  it('should capitalize first letter of single word', () => {
    expect(formatStatus('test')).toBe('Test');
    expect(formatStatus('livro')).toBe('Livro');
    expect(formatStatus('exemplo')).toBe('Exemplo');
    expect(formatStatus('reading')).toBe('Reading');
    expect(formatStatus('finished')).toBe('Finished');
  });
});
