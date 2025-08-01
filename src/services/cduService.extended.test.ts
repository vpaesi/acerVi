// Testes para funções utilitárias do sistema CDU
import { getCDUByCode, getCDUsByCategory, generateCutter, CDU_CLASSIFICATIONS } from './cduService';

// Utilitários adicionais para CDU
const CduUtils = {
  validateCduCode: (code: string): boolean => {
    if (!code) return false;
    // CDU deve ter pelo menos 1 dígito e até 10 dígitos com pontos e sublinhados
    return /^[0-9]([0-9.:\-/()]*[0-9])?$/.test(code) && code.length <= 20;
  },

  formatCduCode: (code: string): string => {
    if (!code) return '';
    // Remove espaços extras e normaliza
    return code.trim().replace(/\s+/g, ' ');
  },

  getCduHierarchy: (code: string): string[] => {
    if (!code) return [];
    
    const levels = [];
    const cleanCode = code.replace(/[^0-9]/g, '');
    
    for (let i = 1; i <= cleanCode.length; i++) {
      levels.push(cleanCode.substring(0, i));
    }
    
    return levels;
  },

  compareCduCodes: (code1: string, code2: string): number => {
    const clean1 = code1.replace(/[^0-9]/g, '');
    const clean2 = code2.replace(/[^0-9]/g, '');
    
    const num1 = parseInt(clean1) || 0;
    const num2 = parseInt(clean2) || 0;
    
    return num1 - num2;
  },

  isValidCduRange: (start: string, end: string): boolean => {
    const startNum = parseInt(start.replace(/[^0-9]/g, '')) || 0;
    const endNum = parseInt(end.replace(/[^0-9]/g, '')) || 0;
    
    return startNum <= endNum;
  },

  generateCduDescription: (code: string): string => {
    const descriptions: Record<string, string> = {
      '0': 'Generalidades',
      '1': 'Filosofia e Psicologia',
      '2': 'Religião',
      '3': 'Ciências Sociais',
      '4': 'Linguística',
      '5': 'Ciências Exatas e Naturais',
      '6': 'Ciências Aplicadas e Medicina',
      '7': 'Arte e Recreação',
      '8': 'Literatura',
      '9': 'Geografia e História'
    };

    const firstDigit = code.charAt(0);
    return descriptions[firstDigit] || 'Classificação desconhecida';
  }
};

// Utilitários para códigos Cutter
const CutterUtils = {
  generateCutterCode: (author: string): string => {
    if (!author) return '';
    
    // Simplificado: primeira letra + número baseado na segunda letra
    const normalized = author.toLowerCase().replace(/[^a-z]/g, '');
    if (normalized.length === 0) return '';
    
    const firstLetter = normalized.charAt(0).toUpperCase();
    const secondChar = normalized.charAt(1) || 'a';
    
    // Mapeamento simples para número
    const cutterNumber = Math.floor((secondChar.charCodeAt(0) - 97) / 2.6) + 1;
    
    return `${firstLetter}${cutterNumber.toString().padStart(2, '0')}`;
  },

  validateCutterCode: (code: string): boolean => {
    if (!code) return false;
    // Formato: Letra + 2-3 dígitos
    return /^[A-Z][0-9]{2,3}$/.test(code);
  },

  compareCutterCodes: (code1: string, code2: string): number => {
    if (!code1 || !code2) return 0;
    
    const letter1 = code1.charAt(0);
    const letter2 = code2.charAt(0);
    
    if (letter1 !== letter2) {
      return letter1.localeCompare(letter2);
    }
    
    const num1 = parseInt(code1.substring(1)) || 0;
    const num2 = parseInt(code2.substring(1)) || 0;
    
    return num1 - num2;
  },

  extractAuthorFromCutter: (code: string): string => {
    if (!CutterUtils.validateCutterCode(code)) return '';
    
    // Retorna apenas a primeira letra (aproximação do sobrenome)
    return code.charAt(0);
  }
};

// Utilitários para números de chamada
const CallNumberUtils = {
  generateCallNumber: (cdu: string, cutter: string): string => {
    if (!cdu) return '';
    if (!cutter) return cdu;
    
    return `${cdu} ${cutter}`;
  },

  parseCallNumber: (callNumber: string): { cdu: string; cutter: string } => {
    if (!callNumber) return { cdu: '', cutter: '' };
    
    const parts = callNumber.trim().split(/\s+/);
    
    return {
      cdu: parts[0] || '',
      cutter: parts[1] || ''
    };
  },

  validateCallNumber: (callNumber: string): boolean => {
    if (!callNumber) return false;
    
    const parsed = CallNumberUtils.parseCallNumber(callNumber);
    
    return CduUtils.validateCduCode(parsed.cdu) && 
           (parsed.cutter === '' || CutterUtils.validateCutterCode(parsed.cutter));
  },

  sortCallNumbers: (callNumbers: string[]): string[] => {
    return callNumbers.sort((a, b) => {
      const parsedA = CallNumberUtils.parseCallNumber(a);
      const parsedB = CallNumberUtils.parseCallNumber(b);
      
      // Primeiro ordena por CDU
      const cduCompare = CduUtils.compareCduCodes(parsedA.cdu, parsedB.cdu);
      if (cduCompare !== 0) return cduCompare;
      
      // Depois por Cutter
      return CutterUtils.compareCutterCodes(parsedA.cutter, parsedB.cutter);
    });
  }
};

describe('CDU Utils - Validação e Formatação', () => {
  describe('validateCduCode', () => {
    it('should validate correct CDU codes', () => {
      expect(CduUtils.validateCduCode('004')).toBe(true);
      expect(CduUtils.validateCduCode('004.42')).toBe(true);
      expect(CduUtils.validateCduCode('821.134.3')).toBe(true);
    });

    it('should reject invalid CDU codes', () => {
      expect(CduUtils.validateCduCode('')).toBe(false);
      expect(CduUtils.validateCduCode('abc')).toBe(false);
      expect(CduUtils.validateCduCode('123456789012345678901')).toBe(false); // muito longo
    });
  });

  describe('formatCduCode', () => {
    it('should format CDU codes correctly', () => {
      expect(CduUtils.formatCduCode('  004.42  ')).toBe('004.42');
      expect(CduUtils.formatCduCode('821  134  3')).toBe('821 134 3');
    });

    it('should handle empty input', () => {
      expect(CduUtils.formatCduCode('')).toBe('');
    });
  });

  describe('getCduHierarchy', () => {
    it('should generate CDU hierarchy', () => {
      const hierarchy = CduUtils.getCduHierarchy('004.42');
      expect(hierarchy).toEqual(['0', '00', '004', '0044', '00442']);
    });

    it('should handle empty code', () => {
      expect(CduUtils.getCduHierarchy('')).toEqual([]);
    });
  });

  describe('compareCduCodes', () => {
    it('should compare CDU codes numerically', () => {
      expect(CduUtils.compareCduCodes('004', '005')).toBeLessThan(0);
      expect(CduUtils.compareCduCodes('100', '050')).toBeGreaterThan(0);
      expect(CduUtils.compareCduCodes('123', '123')).toBe(0);
    });
  });

  describe('generateCduDescription', () => {
    it('should generate descriptions for main classes', () => {
      expect(CduUtils.generateCduDescription('0')).toBe('Generalidades');
      expect(CduUtils.generateCduDescription('5')).toBe('Ciências Exatas e Naturais');
      expect(CduUtils.generateCduDescription('8')).toBe('Literatura');
    });

    it('should handle unknown codes', () => {
      expect(CduUtils.generateCduDescription('x')).toBe('Classificação desconhecida');
    });
  });
});

describe('Cutter Utils - Códigos de Autor', () => {
  describe('generateCutterCode', () => {
    it('should generate Cutter codes for authors', () => {
      const code = CutterUtils.generateCutterCode('Silva');
      expect(code).toMatch(/^S[0-9]{2}$/);
    });

    it('should handle empty author', () => {
      expect(CutterUtils.generateCutterCode('')).toBe('');
    });

    it('should normalize author names', () => {
      const code1 = CutterUtils.generateCutterCode('García-López');
      const code2 = CutterUtils.generateCutterCode('Garcia Lopez');
      expect(code1).toMatch(/^G[0-9]{2}$/);
      expect(code2).toMatch(/^G[0-9]{2}$/);
    });
  });

  describe('validateCutterCode', () => {
    it('should validate correct Cutter codes', () => {
      expect(CutterUtils.validateCutterCode('S55')).toBe(true);
      expect(CutterUtils.validateCutterCode('M123')).toBe(true);
    });

    it('should reject invalid Cutter codes', () => {
      expect(CutterUtils.validateCutterCode('')).toBe(false);
      expect(CutterUtils.validateCutterCode('s55')).toBe(false); // minúscula
      expect(CutterUtils.validateCutterCode('S5')).toBe(false); // muito curto
      expect(CutterUtils.validateCutterCode('S5555')).toBe(false); // muito longo
    });
  });

  describe('compareCutterCodes', () => {
    it('should compare Cutter codes correctly', () => {
      expect(CutterUtils.compareCutterCodes('A10', 'B10')).toBeLessThan(0);
      expect(CutterUtils.compareCutterCodes('S50', 'S55')).toBeLessThan(0);
      expect(CutterUtils.compareCutterCodes('M100', 'M100')).toBe(0);
    });

    it('should handle empty codes', () => {
      expect(CutterUtils.compareCutterCodes('', '')).toBe(0);
    });
  });

  describe('extractAuthorFromCutter', () => {
    it('should extract author initial from Cutter code', () => {
      expect(CutterUtils.extractAuthorFromCutter('S55')).toBe('S');
      expect(CutterUtils.extractAuthorFromCutter('M123')).toBe('M');
    });

    it('should handle invalid codes', () => {
      expect(CutterUtils.extractAuthorFromCutter('')).toBe('');
      expect(CutterUtils.extractAuthorFromCutter('invalid')).toBe('');
    });
  });
});

describe('Call Number Utils - Números de Chamada', () => {
  describe('generateCallNumber', () => {
    it('should generate complete call numbers', () => {
      expect(CallNumberUtils.generateCallNumber('004.42', 'S55')).toBe('004.42 S55');
    });

    it('should handle missing Cutter code', () => {
      expect(CallNumberUtils.generateCallNumber('004.42', '')).toBe('004.42');
    });

    it('should handle missing CDU', () => {
      expect(CallNumberUtils.generateCallNumber('', 'S55')).toBe('');
    });
  });

  describe('parseCallNumber', () => {
    it('should parse complete call numbers', () => {
      const result = CallNumberUtils.parseCallNumber('004.42 S55');
      expect(result).toEqual({ cdu: '004.42', cutter: 'S55' });
    });

    it('should parse CDU-only call numbers', () => {
      const result = CallNumberUtils.parseCallNumber('004.42');
      expect(result).toEqual({ cdu: '004.42', cutter: '' });
    });

    it('should handle empty input', () => {
      const result = CallNumberUtils.parseCallNumber('');
      expect(result).toEqual({ cdu: '', cutter: '' });
    });
  });

  describe('validateCallNumber', () => {
    it('should validate correct call numbers', () => {
      expect(CallNumberUtils.validateCallNumber('004.42 S55')).toBe(true);
      expect(CallNumberUtils.validateCallNumber('821.134.3')).toBe(true);
    });

    it('should reject invalid call numbers', () => {
      expect(CallNumberUtils.validateCallNumber('')).toBe(false);
      expect(CallNumberUtils.validateCallNumber('invalid code')).toBe(false);
    });
  });

  describe('sortCallNumbers', () => {
    it('should sort call numbers correctly', () => {
      const callNumbers = ['100 A10', '004.42 S55', '100 A05', '050 M20'];
      const sorted = CallNumberUtils.sortCallNumbers(callNumbers);
      
      // Verificar que está ordenado corretamente
      expect(sorted).toHaveLength(4);
      
      // Verificar ordem específica baseada na lógica CDU
      const first = CallNumberUtils.parseCallNumber(sorted[0]);
      const second = CallNumberUtils.parseCallNumber(sorted[1]);
      
      expect(parseInt(first.cdu.replace(/[^0-9]/g, '')) || 0)
        .toBeLessThanOrEqual(parseInt(second.cdu.replace(/[^0-9]/g, '')) || 0);
    });

    it('should handle empty array', () => {
      expect(CallNumberUtils.sortCallNumbers([])).toEqual([]);
    });
  });
});

describe('CDU Service Integration', () => {
  it('should integrate with CDU service for category mapping', () => {
    // Teste do serviço CDU existente
    const categories = getCDUsByCategory('0');
    
    expect(categories).toBeDefined();
    expect(Array.isArray(categories)).toBe(true);
    
    categories.forEach(cat => {
      expect(cat.code).toBeDefined();
      expect(CduUtils.validateCduCode(cat.code)).toBe(true);
    });
  });

  it('should handle generate cutter codes', () => {
    const cutterCode = generateCutter('Silva', 'Test Book');
    expect(cutterCode).toBeDefined();
    expect(typeof cutterCode).toBe('string');
    expect(cutterCode.length).toBeGreaterThan(0);
  });

  it('should find CDU classifications by code', () => {
    const classification = getCDUByCode('004');
    expect(classification).toBeDefined();
    
    if (classification) {
      expect(classification.code).toBe('004');
      expect(classification.description).toBeDefined();
    }
  });

  it('should access CDU classifications data', () => {
    expect(CDU_CLASSIFICATIONS).toBeDefined();
    expect(Array.isArray(CDU_CLASSIFICATIONS)).toBe(true);
    expect(CDU_CLASSIFICATIONS.length).toBeGreaterThan(0);
    
    // Verificar estrutura dos dados
    const firstItem = CDU_CLASSIFICATIONS[0];
    expect(firstItem).toHaveProperty('code');
    expect(firstItem).toHaveProperty('description');
  });
});
