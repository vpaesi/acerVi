// Testes para funções utilitárias do formatStatus que realmente existem
import { formatStatus } from './formatStatus';

describe('formatStatus - Extended Coverage', () => {
  // Casos básicos já cobertos no teste existente
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

  // Casos adicionais para aumentar cobertura
  it('should handle hyphenated statuses by replacing hyphens with spaces', () => {
    expect(formatStatus('test-status')).toBe('Test status');
    expect(formatStatus('multi-word-status')).toBe('Multi word status');
    expect(formatStatus('a-b-c-d')).toBe('A b c d');
  });

  it('should capitalize first letter of single word', () => {
    expect(formatStatus('test')).toBe('Test');
    expect(formatStatus('livro')).toBe('Livro');
    expect(formatStatus('exemplo')).toBe('Exemplo');
  });

  it('should handle empty string', () => {
    expect(formatStatus('')).toBe('');
  });

  it('should handle strings without hyphens', () => {
    expect(formatStatus('reading')).toBe('Reading');
    expect(formatStatus('finished')).toBe('Finished');
  });

  it('should handle strings starting with hyphens', () => {
    expect(formatStatus('-status')).toBe(' status');
    expect(formatStatus('--double')).toBe('  double');
  });

  it('should handle strings ending with hyphens', () => {
    expect(formatStatus('status-')).toBe('Status ');
    expect(formatStatus('test--')).toBe('Test  ');
  });

  it('should handle numbers and special characters', () => {
    expect(formatStatus('status-123')).toBe('Status 123');
    expect(formatStatus('test-@#$')).toBe('Test @#$');
  });

  it('should handle mixed case input', () => {
    expect(formatStatus('UPPER-CASE')).toBe('UPPER CASE');
    expect(formatStatus('mIxEd-cAsE')).toBe('MIxEd cAsE');
  });

  it('should handle unicode characters', () => {
    expect(formatStatus('test-ção')).toBe('Test ção');
    expect(formatStatus('açúcar-doce')).toBe('Açúcar doce');
  });

  // Casos extremos
  it('should handle very long strings', () => {
    const longStatus = 'muito-muito-muito-longo-status-de-teste';
    const expected = 'Muito muito muito longo status de teste';
    expect(formatStatus(longStatus)).toBe(expected);
  });

  it('should handle single character', () => {
    expect(formatStatus('a')).toBe('A');
    expect(formatStatus('-')).toBe(' ');
  });

  it('should handle multiple consecutive hyphens', () => {
    expect(formatStatus('test---status')).toBe('Test   status');
    expect(formatStatus('a----b')).toBe('A    b');
  });
});
