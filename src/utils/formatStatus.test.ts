import { formatStatus } from './formatStatus';

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

  it('should handle hyphenated statuses by replacing hyphens with spaces', () => {
    expect(formatStatus('test-status')).toBe('Test status');
  });

  it('should capitalize first letter of single word', () => {
    expect(formatStatus('test')).toBe('Test');
  });

  // Casos adicionais para aumentar cobertura
  it('should handle empty string', () => {
    expect(formatStatus('')).toBe('');
  });

  it('should handle strings without hyphens', () => {
    expect(formatStatus('reading')).toBe('Reading');
    expect(formatStatus('finished')).toBe('Finished');
  });

  it('should handle strings starting with hyphens', () => {
    expect(formatStatus('-status')).toBe(' status');
  });

  it('should handle strings ending with hyphens', () => {
    expect(formatStatus('status-')).toBe('Status ');
  });

  it('should handle mixed case input', () => {
    expect(formatStatus('UPPER-CASE')).toBe('UPPER CASE');
    expect(formatStatus('MiXeD-cAsE')).toBe('MiXeD cAsE');
  });

  it('should handle multiple hyphens', () => {
    expect(formatStatus('multi-word-test-status')).toBe('Multi word test status');
    expect(formatStatus('a-b-c-d')).toBe('A b c d');
  });

  it('should handle numbers and special characters', () => {
    expect(formatStatus('status-123')).toBe('Status 123');
    expect(formatStatus('test-@#$')).toBe('Test @#$');
  });

  it('should handle unicode characters', () => {
    expect(formatStatus('test-ção')).toBe('Test ção');
    expect(formatStatus('açúcar-doce')).toBe('Açúcar doce');
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
