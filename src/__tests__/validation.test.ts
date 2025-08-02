const ValidationUtils = {
  validateISBN: (isbn: string): boolean => {
    if (!isbn) return false;
    
    const cleanISBN = isbn.replace(/[-\s]/g, '');
    
    if (!/^\d{10}$|^\d{13}$/.test(cleanISBN)) {
      return false;
    }
    
    if (cleanISBN.length === 10) {
      return validateISBN10(cleanISBN);
    } else {
      return validateISBN13(cleanISBN);
    }
  },

  validateEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  validateBookTitle: (title: string): boolean => {
    return !!(title && title.trim().length > 0 && title.trim().length <= 200);
  },

  validateAuthor: (author: string): boolean => {
    return !!(author && author.trim().length > 0 && author.trim().length <= 100);
  },

  sanitizeString: (input: string): string => {
    return input.trim().replace(/\s+/g, ' ');
  }
};

const FormatUtils = {
  formatDate: (dateString: string): string => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Data inválida';
      }
      return date.toLocaleDateString('pt-BR');
    } catch {
      return 'Data inválida';
    }
  },

  formatAuthors: (authors: string[]): string => {
    if (!authors || authors.length === 0) return 'Autor desconhecido';
    if (authors.length === 1) return authors[0];
    if (authors.length === 2) return authors.join(' e ');
    return `${authors.slice(0, -1).join(', ')} e ${authors[authors.length - 1]}`;
  },

  formatISBN: (isbn: string): string => {
    if (!isbn) return '';
    
    const cleanISBN = isbn.replace(/[-\s]/g, '');
    
    if (cleanISBN.length === 10) {
      return `${cleanISBN.slice(0, 1)}-${cleanISBN.slice(1, 4)}-${cleanISBN.slice(4, 9)}-${cleanISBN.slice(9)}`;
    } else if (cleanISBN.length === 13) {
      return `${cleanISBN.slice(0, 3)}-${cleanISBN.slice(3, 4)}-${cleanISBN.slice(4, 8)}-${cleanISBN.slice(8, 12)}-${cleanISBN.slice(12)}`;
    }
    
    return isbn;
  },

  truncateText: (text: string, maxLength: number): string => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength - 3) + '...';
  },

  capitalizeWords: (text: string): string => {
    if (!text) return '';
    return text.replace(/\b\w/g, char => char.toUpperCase());
  }
};

function validateISBN10(isbn: string): boolean {
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(isbn[i]) * (10 - i);
  }
  
  const checkDigit = isbn[9];
  const calculatedCheckDigit = (11 - (sum % 11)) % 11;
  
  return checkDigit === (calculatedCheckDigit === 10 ? 'X' : calculatedCheckDigit.toString());
}

function validateISBN13(isbn: string): boolean {
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(isbn[i]) * (i % 2 === 0 ? 1 : 3);
  }
  
  const checkDigit = parseInt(isbn[12]);
  const calculatedCheckDigit = (10 - (sum % 10)) % 10;
  
  return checkDigit === calculatedCheckDigit;
}

describe('Validation Utils', () => {
  describe('validateISBN', () => {
    it('should validate basic ISBN format', () => {
      expect(ValidationUtils.validateISBN('1234567890')).toBe(false);
      expect(ValidationUtils.validateISBN('1234567890123')).toBe(false);
    });

    it('should handle ISBN with hyphens', () => {
      const result = ValidationUtils.validateISBN('12-34-56789-0');
      expect(typeof result).toBe('boolean');
    });

    it('should reject invalid ISBNs', () => {
      expect(ValidationUtils.validateISBN('')).toBe(false);
      expect(ValidationUtils.validateISBN('123')).toBe(false);
      expect(ValidationUtils.validateISBN('abc')).toBe(false);
      expect(ValidationUtils.validateISBN('123456789012345')).toBe(false);
    });
  });

  describe('validateEmail', () => {
    it('should validate correct emails', () => {
      expect(ValidationUtils.validateEmail('test@example.com')).toBe(true);
      expect(ValidationUtils.validateEmail('user.name@domain.co.uk')).toBe(true);
    });

    it('should reject invalid emails', () => {
      expect(ValidationUtils.validateEmail('')).toBe(false);
      expect(ValidationUtils.validateEmail('invalid')).toBe(false);
      expect(ValidationUtils.validateEmail('@domain.com')).toBe(false);
      expect(ValidationUtils.validateEmail('user@')).toBe(false);
    });
  });

  describe('validateBookTitle', () => {
    it('should validate correct titles', () => {
      expect(ValidationUtils.validateBookTitle('Valid Title')).toBe(true);
      expect(ValidationUtils.validateBookTitle('A')).toBe(true);
    });

    it('should reject invalid titles', () => {
      expect(ValidationUtils.validateBookTitle('')).toBe(false);
      expect(ValidationUtils.validateBookTitle('   ')).toBe(false);
      expect(ValidationUtils.validateBookTitle('a'.repeat(201))).toBe(false);
    });
  });

  describe('validateAuthor', () => {
    it('should validate correct authors', () => {
      expect(ValidationUtils.validateAuthor('John Doe')).toBe(true);
      expect(ValidationUtils.validateAuthor('A')).toBe(true);
    });

    it('should reject invalid authors', () => {
      expect(ValidationUtils.validateAuthor('')).toBe(false);
      expect(ValidationUtils.validateAuthor('   ')).toBe(false);
      expect(ValidationUtils.validateAuthor('a'.repeat(101))).toBe(false);
    });
  });

  describe('sanitizeString', () => {
    it('should sanitize strings correctly', () => {
      expect(ValidationUtils.sanitizeString('  Hello   World  ')).toBe('Hello World');
      expect(ValidationUtils.sanitizeString('\t\nTest\t\n')).toBe('Test');
    });
  });
});

describe('Format Utils', () => {
  describe('formatDate', () => {
    it('should format dates correctly', () => {
      const result = FormatUtils.formatDate('2024-01-15T10:30:00.000Z');
      expect(result).toMatch(/\d{1,2}\/\d{1,2}\/\d{4}/);
    });

    it('should handle invalid dates', () => {
      expect(FormatUtils.formatDate('invalid')).toBe('Data inválida');
      expect(FormatUtils.formatDate('')).toBe('Data inválida');
    });
  });

  describe('formatAuthors', () => {
    it('should format single author', () => {
      expect(FormatUtils.formatAuthors(['John Doe'])).toBe('John Doe');
    });

    it('should format two authors', () => {
      expect(FormatUtils.formatAuthors(['John Doe', 'Jane Smith'])).toBe('John Doe e Jane Smith');
    });

    it('should format multiple authors', () => {
      expect(FormatUtils.formatAuthors(['A', 'B', 'C'])).toBe('A, B e C');
    });

    it('should handle empty array', () => {
      expect(FormatUtils.formatAuthors([])).toBe('Autor desconhecido');
    });
  });

  describe('formatISBN', () => {
    it('should format ISBN-10', () => {
      expect(FormatUtils.formatISBN('0316769487')).toBe('0-316-76948-7');
    });

    it('should format ISBN-13', () => {
      expect(FormatUtils.formatISBN('9780316769480')).toBe('978-0-3167-6948-0');
    });

    it('should handle invalid ISBN', () => {
      expect(FormatUtils.formatISBN('123')).toBe('123');
      expect(FormatUtils.formatISBN('')).toBe('');
    });
  });

  describe('truncateText', () => {
    it('should truncate long text', () => {
      expect(FormatUtils.truncateText('This is a very long text', 10)).toBe('This is...');
    });

    it('should not truncate short text', () => {
      expect(FormatUtils.truncateText('Short', 10)).toBe('Short');
    });

    it('should handle empty text', () => {
      expect(FormatUtils.truncateText('', 10)).toBe('');
    });
  });

  describe('capitalizeWords', () => {
    it('should capitalize words', () => {
      expect(FormatUtils.capitalizeWords('hello world')).toBe('Hello World');
      expect(FormatUtils.capitalizeWords('test-case')).toBe('Test-Case');
    });

    it('should handle empty text', () => {
      expect(FormatUtils.capitalizeWords('')).toBe('');
    });
  });
});
