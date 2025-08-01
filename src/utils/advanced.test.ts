// Testes para funções utilitárias adicionais
describe('Additional Utilities', () => {
  // Utilitários de formatação de string
  const formatUtils = {
    capitalizeFirst: (text: string): string => {
      if (!text) return '';
      return text.charAt(0).toUpperCase() + text.slice(1);
    },
    
    formatPrice: (price: number): string => {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(price);
    },
    
    sanitizeText: (text: string): string => {
      if (!text) return '';
      return text.replace(/[<>]/g, '').trim();
    },
    
    generateSlug: (text: string): string => {
      return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
    }
  };

  // Utilitários de validação
  const validationUtils = {
    isValidEmail: (email: string): boolean => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },
    
    isValidPassword: (password: string): boolean => {
      return password.length >= 8 && 
             /[A-Z]/.test(password) && 
             /[a-z]/.test(password) && 
             /\d/.test(password);
    },
    
    isValidISBN10: (isbn: string): boolean => {
      const cleanISBN = isbn.replace(/[-\s]/g, '');
      if (cleanISBN.length !== 10) return false;
      
      let sum = 0;
      for (let i = 0; i < 9; i++) {
        const digit = parseInt(cleanISBN[i]);
        if (isNaN(digit)) return false;
        sum += digit * (10 - i);
      }
      
      const lastChar = cleanISBN[9];
      const checkDigit = lastChar === 'X' ? 10 : parseInt(lastChar);
      if (isNaN(checkDigit) && lastChar !== 'X') return false;
      
      return (sum + checkDigit) % 11 === 0;
    },
    
    isValidYear: (year: number): boolean => {
      const currentYear = new Date().getFullYear();
      return year >= 1000 && year <= currentYear + 10;
    }
  };

  // Utilitários de array
  const arrayUtils = {
    removeDuplicates: <T>(array: T[]): T[] => {
      return [...new Set(array)];
    },
    
    groupByProperty: <T>(array: T[], property: keyof T): Record<string, T[]> => {
      return array.reduce((groups, item) => {
        const key = String(item[property]);
        if (!groups[key]) groups[key] = [];
        groups[key].push(item);
        return groups;
      }, {} as Record<string, T[]>);
    },
    
    findDuplicates: <T>(array: T[]): T[] => {
      const seen = new Set<T>();
      const duplicates = new Set<T>();
      
      array.forEach(item => {
        if (seen.has(item)) {
          duplicates.add(item);
        } else {
          seen.add(item);
        }
      });
      
      return Array.from(duplicates);
    },
    
    chunkArray: <T>(array: T[], chunkSize: number): T[][] => {
      const chunks: T[][] = [];
      for (let i = 0; i < array.length; i += chunkSize) {
        chunks.push(array.slice(i, i + chunkSize));
      }
      return chunks;
    }
  };

  // Utilitários de data
  const dateUtils = {
    formatDateBR: (date: Date): string => {
      return date.toLocaleDateString('pt-BR');
    },
    
    addDays: (date: Date, days: number): Date => {
      const result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    },
    
    getDaysDifference: (start: Date, end: Date): number => {
      const timeDiff = Math.abs(end.getTime() - start.getTime());
      return Math.ceil(timeDiff / (1000 * 3600 * 24));
    },
    
    isWeekend: (date: Date): boolean => {
      const day = date.getDay();
      return day === 0 || day === 6; // Domingo ou Sábado
    }
  };

  describe('Format Utils', () => {
    it('should capitalize first letter', () => {
      expect(formatUtils.capitalizeFirst('hello')).toBe('Hello');
      expect(formatUtils.capitalizeFirst('WORLD')).toBe('WORLD');
      expect(formatUtils.capitalizeFirst('')).toBe('');
    });

    it('should format prices in Brazilian format', () => {
      const formatted = formatUtils.formatPrice(29.99);
      expect(formatted).toContain('29,99');
      expect(formatted).toContain('R$');
    });

    it('should sanitize text by removing dangerous characters', () => {
      expect(formatUtils.sanitizeText('<script>alert("test")</script>')).toBe('scriptalert("test")/script');
      expect(formatUtils.sanitizeText('  Normal text  ')).toBe('Normal text');
    });

    it('should generate valid slugs from text', () => {
      expect(formatUtils.generateSlug('Hello World!')).toBe('hello-world');
      expect(formatUtils.generateSlug('Açúcar & Café')).toBe('acucar-cafe');
      expect(formatUtils.generateSlug('  Multiple   Spaces  ')).toBe('multiple-spaces');
    });
  });

  describe('Validation Utils', () => {
    it('should validate email addresses', () => {
      expect(validationUtils.isValidEmail('test@example.com')).toBe(true);
      expect(validationUtils.isValidEmail('user@domain.org')).toBe(true);
      expect(validationUtils.isValidEmail('invalid.email')).toBe(false);
      expect(validationUtils.isValidEmail('test@')).toBe(false);
      expect(validationUtils.isValidEmail('@domain.com')).toBe(false);
    });

    it('should validate password strength', () => {
      expect(validationUtils.isValidPassword('StrongPass123')).toBe(true);
      expect(validationUtils.isValidPassword('MySecure1')).toBe(true);
      expect(validationUtils.isValidPassword('weak')).toBe(false);
      expect(validationUtils.isValidPassword('12345678')).toBe(false); // só números
      expect(validationUtils.isValidPassword('ONLYUPPER1')).toBe(false); // sem minúsculas
    });

    it('should validate ISBN-10 format', () => {
      expect(validationUtils.isValidISBN10('0-306-40615-2')).toBe(true);
      expect(validationUtils.isValidISBN10('0306406152')).toBe(true);
      expect(validationUtils.isValidISBN10('invalid-isbn')).toBe(false);
      expect(validationUtils.isValidISBN10('123')).toBe(false);
    });

    it('should validate publication years', () => {
      const currentYear = new Date().getFullYear();
      expect(validationUtils.isValidYear(2023)).toBe(true);
      expect(validationUtils.isValidYear(1995)).toBe(true);
      expect(validationUtils.isValidYear(currentYear + 5)).toBe(true);
      expect(validationUtils.isValidYear(999)).toBe(false);
      expect(validationUtils.isValidYear(currentYear + 20)).toBe(false);
    });
  });

  describe('Array Utils', () => {
    it('should remove duplicates from array', () => {
      expect(arrayUtils.removeDuplicates([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3]);
      expect(arrayUtils.removeDuplicates(['a', 'b', 'a', 'c'])).toEqual(['a', 'b', 'c']);
      expect(arrayUtils.removeDuplicates([])).toEqual([]);
    });

    it('should group items by property', () => {
      const items = [
        { category: 'fiction', title: 'Book 1' },
        { category: 'fiction', title: 'Book 2' },
        { category: 'science', title: 'Book 3' }
      ];
      
      const grouped = arrayUtils.groupByProperty(items, 'category');
      expect(grouped.fiction).toHaveLength(2);
      expect(grouped.science).toHaveLength(1);
    });

    it('should find duplicates in array', () => {
      expect(arrayUtils.findDuplicates([1, 2, 2, 3, 3, 4])).toEqual([2, 3]);
      expect(arrayUtils.findDuplicates(['a', 'b', 'c'])).toEqual([]);
      expect(arrayUtils.findDuplicates([])).toEqual([]);
    });

    it('should chunk arrays into smaller pieces', () => {
      const chunks = arrayUtils.chunkArray([1, 2, 3, 4, 5, 6, 7], 3);
      expect(chunks).toHaveLength(3);
      expect(chunks[0]).toEqual([1, 2, 3]);
      expect(chunks[1]).toEqual([4, 5, 6]);
      expect(chunks[2]).toEqual([7]);
    });
  });

  describe('Date Utils', () => {
    it('should format dates in Brazilian format', () => {
      const date = new Date('2023-01-15');
      const formatted = dateUtils.formatDateBR(date);
      expect(formatted).toMatch(/\d{1,2}\/\d{1,2}\/\d{4}/);
    });

    it('should add days to a date correctly', () => {
      const date = new Date('2023-01-01');
      const newDate = dateUtils.addDays(date, 10);
      // Verificar que a data aumentou corretamente
      expect(newDate.getTime()).toBeGreaterThan(date.getTime());
      expect(newDate.getFullYear()).toBe(2023);
      expect(newDate.getMonth()).toBe(0); // Janeiro
    });

    it('should calculate days difference between dates', () => {
      const start = new Date('2023-01-01');
      const end = new Date('2023-01-11');
      expect(dateUtils.getDaysDifference(start, end)).toBe(10);
    });

    it('should detect weekend dates', () => {
      // Usando datas específicas que sabemos os dias da semana
      const saturday = new Date(2023, 0, 7); // 7 de janeiro de 2023 (Sábado)
      const sunday = new Date(2023, 0, 8); // 8 de janeiro de 2023 (Domingo)  
      const monday = new Date(2023, 0, 9); // 9 de janeiro de 2023 (Segunda)
      
      // Verificar os dias da semana primeiro
      expect(saturday.getDay()).toBe(6); // Sábado
      expect(sunday.getDay()).toBe(0); // Domingo
      expect(monday.getDay()).toBe(1); // Segunda
      
      expect(dateUtils.isWeekend(saturday)).toBe(true);
      expect(dateUtils.isWeekend(sunday)).toBe(true);
      expect(dateUtils.isWeekend(monday)).toBe(false);
    });
  });

  describe('Integration Tests', () => {
    it('should chain utility functions together', () => {
      const rawText = '  Açúcar & Café - Um Livro Especial!  ';
      const slug = formatUtils.generateSlug(rawText);
      const capitalized = formatUtils.capitalizeFirst(slug);
      
      expect(slug).toBe('acucar-cafe-um-livro-especial');
      expect(capitalized).toBe('Acucar-cafe-um-livro-especial');
    });

    it('should validate and format book data', () => {
      const bookData = {
        isbn: '0-306-40615-2',
        year: 2023,
        title: '  Advanced Programming  ',
        price: 49.99
      };

      expect(validationUtils.isValidISBN10(bookData.isbn)).toBe(true);
      expect(validationUtils.isValidYear(bookData.year)).toBe(true);
      expect(formatUtils.sanitizeText(bookData.title)).toBe('Advanced Programming');
      expect(formatUtils.formatPrice(bookData.price)).toContain('49,99');
    });

    it('should process arrays of books efficiently', () => {
      const books = [
        { title: 'Book A', category: 'fiction' },
        { title: 'Book B', category: 'fiction' },
        { title: 'Book C', category: 'science' },
        { title: 'Book A', category: 'fiction' } // duplicata
      ];

      const uniqueBooks = arrayUtils.removeDuplicates(books);
      const groupedBooks = arrayUtils.groupByProperty(books, 'category');
      const duplicates = arrayUtils.findDuplicates(books.map(b => b.title));

      expect(uniqueBooks.length).toBeLessThanOrEqual(books.length);
      expect(groupedBooks.fiction.length).toBeGreaterThan(0);
      expect(groupedBooks.science.length).toBeGreaterThan(0);
      expect(duplicates).toContain('Book A');
    });
  });
});
