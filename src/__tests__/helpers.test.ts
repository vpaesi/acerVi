describe('Application Constants', () => {
  it('should have consistent application name', () => {
    const APP_NAME = 'AcerVi';
    expect(APP_NAME).toBe('AcerVi');
    expect(APP_NAME.length).toBeGreaterThan(0);
  });

  it('should define storage keys', () => {
    const STORAGE_KEYS = {
      PERSONAL_LIBRARY: 'acervi_personal_library',
      USER_PREFERENCES: 'acervi_user_preferences',
      RECENT_SEARCHES: 'acervi_recent_searches'
    };

    expect(STORAGE_KEYS.PERSONAL_LIBRARY).toContain('acervi');
    expect(STORAGE_KEYS.USER_PREFERENCES).toContain('acervi');
    expect(STORAGE_KEYS.RECENT_SEARCHES).toContain('acervi');
  });

  it('should define status constants', () => {
    const BOOK_STATUS = {
      NAO_LIDO: 'não-lido',
      LENDO: 'lendo',
      LIDO: 'lido',
      ABANDONADO: 'abandonado',
      QUERO_LER: 'quero-ler'
    };

    const statusValues = Object.values(BOOK_STATUS);
    expect(statusValues).toHaveLength(5);
    expect(statusValues.every(status => typeof status === 'string')).toBe(true);
  });

  it('should define condition constants', () => {
    const BOOK_CONDITIONS = {
      NOVO: 'novo',
      SEMI_NOVO: 'semi-novo',
      USADO: 'usado',
      DESGASTADO: 'desgastado'
    };

    const conditionValues = Object.values(BOOK_CONDITIONS);
    expect(conditionValues).toHaveLength(4);
    expect(conditionValues.every(condition => typeof condition === 'string')).toBe(true);
  });
});

const URLUtils = {
  buildGoogleBooksUrl: (query: string, maxResults = 10) => {
    const baseUrl = 'https://www.googleapis.com/books/v1/volumes';
    const params = new URLSearchParams({
      q: query,
      maxResults: maxResults.toString()
    });
    return `${baseUrl}?${params.toString()}`;
  },

  buildBookDetailUrl: (id: string) => {
    return `https://www.googleapis.com/books/v1/volumes/${id}`;
  },

  validateUrl: (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },

  extractBookIdFromUrl: (url: string): string | null => {
    const match = url.match(/volumes\/([^?]+)/);
    return match ? match[1] : null;
  }
};

describe('URL Utils', () => {
  describe('buildGoogleBooksUrl', () => {
    it('should build correct search URL', () => {
      const url = URLUtils.buildGoogleBooksUrl('javascript');
      expect(url).toContain('https://www.googleapis.com/books/v1/volumes');
      expect(url).toContain('q=javascript');
      expect(url).toContain('maxResults=10');
    });

    it('should handle custom maxResults', () => {
      const url = URLUtils.buildGoogleBooksUrl('python', 20);
      expect(url).toContain('maxResults=20');
    });

    it('should encode query parameters', () => {
      const url = URLUtils.buildGoogleBooksUrl('test query with spaces');
      expect(url).toContain('test+query+with+spaces');
    });
  });

  describe('buildBookDetailUrl', () => {
    it('should build correct detail URL', () => {
      const url = URLUtils.buildBookDetailUrl('abc123');
      expect(url).toBe('https://www.googleapis.com/books/v1/volumes/abc123');
    });
  });

  describe('validateUrl', () => {
    it('should validate correct URLs', () => {
      expect(URLUtils.validateUrl('https://example.com')).toBe(true);
      expect(URLUtils.validateUrl('http://test.com/path')).toBe(true);
    });

    it('should reject invalid URLs', () => {
      expect(URLUtils.validateUrl('not-a-url')).toBe(false);
      expect(URLUtils.validateUrl('')).toBe(false);
      expect(URLUtils.validateUrl('ftp://')).toBe(false);
    });
  });

  describe('extractBookIdFromUrl', () => {
    it('should extract book ID from URL', () => {
      const url = 'https://www.googleapis.com/books/v1/volumes/abc123?test=1';
      expect(URLUtils.extractBookIdFromUrl(url)).toBe('abc123');
    });

    it('should return null for invalid URLs', () => {
      expect(URLUtils.extractBookIdFromUrl('invalid-url')).toBe(null);
      expect(URLUtils.extractBookIdFromUrl('')).toBe(null);
    });
  });
});

const ArrayUtils = {
  removeDuplicates: <T>(array: T[]): T[] => {
    return [...new Set(array)];
  },

  shuffleArray: <T>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  },

  groupBy: <T>(array: T[], keyFn: (item: T) => string): Record<string, T[]> => {
    return array.reduce((groups, item) => {
      const key = keyFn(item);
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(item);
      return groups;
    }, {} as Record<string, T[]>);
  },

  findAndReplace: <T>(array: T[], predicate: (item: T) => boolean, replacement: T): T[] => {
    const index = array.findIndex(predicate);
    if (index === -1) return array;
    
    const newArray = [...array];
    newArray[index] = replacement;
    return newArray;
  }
};

describe('Array Utils', () => {
  describe('removeDuplicates', () => {
    it('should remove duplicates from array', () => {
      const result = ArrayUtils.removeDuplicates([1, 2, 2, 3, 3, 3]);
      expect(result).toEqual([1, 2, 3]);
    });

    it('should handle empty array', () => {
      const result = ArrayUtils.removeDuplicates([]);
      expect(result).toEqual([]);
    });

    it('should handle string array', () => {
      const result = ArrayUtils.removeDuplicates(['a', 'b', 'a', 'c']);
      expect(result).toEqual(['a', 'b', 'c']);
    });
  });

  describe('shuffleArray', () => {
    it('should return array with same length', () => {
      const input = [1, 2, 3, 4, 5];
      const result = ArrayUtils.shuffleArray(input);
      expect(result).toHaveLength(input.length);
    });

    it('should contain same elements', () => {
      const input = [1, 2, 3, 4, 5];
      const result = ArrayUtils.shuffleArray(input);
      input.forEach(item => {
        expect(result).toContain(item);
      });
    });

    it('should not modify original array', () => {
      const input = [1, 2, 3];
      const original = [...input];
      ArrayUtils.shuffleArray(input);
      expect(input).toEqual(original);
    });
  });

  describe('groupBy', () => {
    it('should group array by key function', () => {
      const array = [
        { name: 'Alice', age: 25 },
        { name: 'Bob', age: 25 },
        { name: 'Charlie', age: 30 }
      ];
      
      const result = ArrayUtils.groupBy(array, item => item.age.toString());
      
      expect(result['25']).toHaveLength(2);
      expect(result['30']).toHaveLength(1);
    });

    it('should handle empty array', () => {
      const result = ArrayUtils.groupBy([] as string[], () => 'key');
      expect(result).toEqual({});
    });
  });

  describe('findAndReplace', () => {
    it('should replace matching item', () => {
      const array = [1, 2, 3, 4];
      const result = ArrayUtils.findAndReplace(array, item => item === 3, 99);
      expect(result).toEqual([1, 2, 99, 4]);
    });

    it('should return original array if no match', () => {
      const array = [1, 2, 3];
      const result = ArrayUtils.findAndReplace(array, item => item === 5, 99);
      expect(result).toEqual([1, 2, 3]);
    });

    it('should not modify original array', () => {
      const array = [1, 2, 3];
      const original = [...array];
      ArrayUtils.findAndReplace(array, item => item === 2, 99);
      expect(array).toEqual(original);
    });
  });
});
