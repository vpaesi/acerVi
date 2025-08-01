import { 
  generateCutter, 
  getPrimaryCategories, 
  getSubcategoriesByPrimary,
  getMainCategories 
} from './cduService';

describe('CDU Service', () => {
  describe('generateCutter', () => {
    it('should generate Cutter code from author surname', () => {
      const result = generateCutter('José Silva', 'Test Title');
      expect(result).toMatch(/^S\d+/);
    });

    it('should handle author with multiple names', () => {
      const result = generateCutter('José Carlos da Silva Santos', 'Test Title');
      expect(result).toMatch(/^S\d+/);
    });

    it('should handle empty author gracefully', () => {
      const result = generateCutter('', 'Test Title');
      expect(result).toMatch(/^T\d+/);
    });

    it('should handle both empty author and title', () => {
      const result = generateCutter('', '');
      expect(result).toBe('A001');
    });

    it('should normalize accented characters', () => {
      const result = generateCutter('João Ção', 'Test Title');
      expect(result).toMatch(/^C\d+/);
    });
  });

  describe('getPrimaryCategories', () => {
    it('should return all primary CDU categories (0-9)', () => {
      const categories = getPrimaryCategories();
      expect(categories).toHaveLength(10);
      expect(categories[0].code).toBe('0');
      expect(categories[9].code).toBe('9');
    });

    it('should have descriptions for all categories', () => {
      const categories = getPrimaryCategories();
      categories.forEach(category => {
        expect(category.description).toBeTruthy();
        expect(typeof category.description).toBe('string');
      });
    });
  });

  describe('getSubcategoriesByPrimary', () => {
    it('should return subcategories for valid primary code', () => {
      const subcategories = getSubcategoriesByPrimary('0');
      expect(subcategories.length).toBeGreaterThan(0);
      subcategories.forEach(sub => {
        expect(sub.code.startsWith('0')).toBe(true);
      });
    });

    it('should return empty array for invalid primary code', () => {
      const subcategories = getSubcategoriesByPrimary('invalid');
      expect(subcategories).toEqual([]);
    });

    it('should return subcategories for all valid primary codes', () => {
      for (let i = 0; i <= 9; i++) {
        const subcategories = getSubcategoriesByPrimary(i.toString());
        expect(subcategories.length).toBeGreaterThan(0);
      }
    });
  });

  describe('getMainCategories', () => {
    it('should return main categories for filtering', () => {
      const categories = getMainCategories();
      expect(categories.length).toBeGreaterThan(0);
    });

    it('should have code and description properties', () => {
      const categories = getMainCategories();
      categories.forEach(category => {
        expect(category).toHaveProperty('code');
        expect(category).toHaveProperty('description');
        expect(typeof category.code).toBe('string');
        expect(typeof category.description).toBe('string');
      });
    });
  });
});
