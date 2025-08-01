// Testes para funções de formatação e helpers

describe('Date Utilities', () => {
  const DateUtils = {
    formatRelativeTime: (date: Date): string => {
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      
      if (diffDays === 0) return 'Hoje';
      if (diffDays === 1) return 'Ontem';
      if (diffDays < 7) return `${diffDays} dias atrás`;
      if (diffDays < 30) return `${Math.floor(diffDays / 7)} semanas atrás`;
      if (diffDays < 365) return `${Math.floor(diffDays / 30)} meses atrás`;
      
      return `${Math.floor(diffDays / 365)} anos atrás`;
    },

    addDays: (date: Date, days: number): Date => {
      const result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    },

    getDaysBetween: (startDate: Date, endDate: Date): number => {
      const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
  };

  describe('formatRelativeTime', () => {
    it('should return "Hoje" for today', () => {
      const today = new Date();
      expect(DateUtils.formatRelativeTime(today)).toBe('Hoje');
    });

    it('should return "Ontem" for yesterday', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      expect(DateUtils.formatRelativeTime(yesterday)).toBe('Ontem');
    });

    it('should return days ago for recent dates', () => {
      const threeDaysAgo = new Date();
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
      expect(DateUtils.formatRelativeTime(threeDaysAgo)).toBe('3 dias atrás');
    });
  });

  describe('addDays and getDaysBetween', () => {
    it('should add days correctly', () => {
      const date = new Date('2023-01-01');
      const newDate = DateUtils.addDays(date, 5);
      
      // Debugging: vamos ver qual é a data resultante
      console.log('Original date:', date.toISOString());
      console.log('New date:', newDate.toISOString());
      console.log('Original day:', date.getDate());
      console.log('New day:', newDate.getDate());
      
      // A data original é 1 de janeiro, adicionando 5 dias deveria resultar em 6 de janeiro
      const expectedDate = new Date('2023-01-06');
      expect(newDate.getTime()).toBe(expectedDate.getTime());
    });

    it('should calculate days between dates', () => {
      const start = new Date('2023-01-01');
      const end = new Date('2023-01-06');
      expect(DateUtils.getDaysBetween(start, end)).toBe(5);
    });
  });
});

describe('String Utilities', () => {
  const StringUtils = {
    capitalize: (text: string): string => {
      if (!text) return '';
      return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    },

    truncate: (text: string, maxLength: number): string => {
      if (!text || text.length <= maxLength) return text;
      return text.substring(0, maxLength - 3) + '...';
    }
  };

  describe('capitalize', () => {
    it('should capitalize first letter', () => {
      expect(StringUtils.capitalize('hello')).toBe('Hello');
    });

    it('should handle empty string', () => {
      expect(StringUtils.capitalize('')).toBe('');
    });
  });

  describe('truncate', () => {
    it('should truncate long text', () => {
      expect(StringUtils.truncate('This is a long text', 10)).toBe('This is...');
    });

    it('should not truncate short text', () => {
      expect(StringUtils.truncate('Short', 10)).toBe('Short');
    });
  });
});

describe('Validation Utilities', () => {
  const ValidationUtils = {
    isEmail: (email: string): boolean => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },

    isISBN: (isbn: string): boolean => {
      const cleanISBN = isbn.replace(/[^\dX]/g, '');
      return cleanISBN.length === 10 || cleanISBN.length === 13;
    }
  };

  describe('email validation', () => {
    it('should validate correct email', () => {
      expect(ValidationUtils.isEmail('test@example.com')).toBe(true);
    });

    it('should reject invalid email', () => {
      expect(ValidationUtils.isEmail('invalid-email')).toBe(false);
    });
  });

  describe('ISBN validation', () => {
    it('should validate 10-digit ISBN', () => {
      expect(ValidationUtils.isISBN('0123456789')).toBe(true);
    });

    it('should validate 13-digit ISBN', () => {
      expect(ValidationUtils.isISBN('9780123456789')).toBe(true);
    });
  });
});

describe('Array Utilities', () => {
  const ArrayUtils = {
    unique: <T>(array: T[]): T[] => {
      return [...new Set(array)];
    },

    shuffle: <T>(array: T[]): T[] => {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    }
  };

  describe('unique', () => {
    it('should remove duplicates', () => {
      expect(ArrayUtils.unique([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3]);
    });
  });

  describe('shuffle', () => {
    it('should return array of same length', () => {
      const original = [1, 2, 3, 4, 5];
      const shuffled = ArrayUtils.shuffle(original);
      expect(shuffled).toHaveLength(original.length);
      expect(shuffled).toEqual(expect.arrayContaining(original));
    });
  });
});