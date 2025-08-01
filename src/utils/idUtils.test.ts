import { generateId } from './idUtils';

describe('idUtils', () => {
  describe('generateId', () => {
    it('should generate a unique string ID', () => {
      const id = generateId();
      
      expect(id).toBeDefined();
      expect(typeof id).toBe('string');
      expect(id.length).toBeGreaterThan(0);
    });

    it('should generate different IDs on subsequent calls', () => {
      const id1 = generateId();
      const id2 = generateId();
      
      expect(id1).not.toBe(id2);
    });

    it('should generate IDs with consistent format', () => {
      const id = generateId();
      
      // Should contain timestamp part (base36) + random part
      expect(id.length).toBeGreaterThan(10);
      expect(/^[a-z0-9]+$/.test(id)).toBe(true);
    });
  });
});
