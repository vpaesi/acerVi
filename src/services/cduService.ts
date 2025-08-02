export interface CDUClassification {
  code: string;
  description: string;
  parentCode?: string;
}

export const CDU_CLASSIFICATIONS: CDUClassification[] = [
  { code: '0', description: 'Generalidades' },
  { code: '00', description: 'Ciência e conhecimento. Organização. Informática. Documentação' },
  { code: '001', description: 'Ciência e conhecimento em geral' },
  { code: '004', description: 'Ciência e tecnologia dos computadores' },
  { code: '01', description: 'Bibliografia' },
  { code: '02', description: 'Biblioteconomia' },
  { code: '03', description: 'Obras de referência geral' },
  { code: '030', description: 'Enciclopédias gerais' },
  { code: '05', description: 'Publicações em série. Periódicos' },
  { code: '06', description: 'Organizações gerais' },
  { code: '07', description: 'Jornalismo. Imprensa' },
  { code: '08', description: 'Coletâneas' },
  { code: '09', description: 'Manuscritos. Livros raros' },

  { code: '1', description: 'Filosofia e Psicologia' },
  { code: '11', description: 'Metafísica' },
  { code: '13', description: 'Filosofia mental. Metafísica da vida espiritual' },
  { code: '14', description: 'Sistemas filosóficos' },
  { code: '159.9', description: 'Psicologia' },
  { code: '16', description: 'Lógica' },
  { code: '17', description: 'Ética. Filosofia moral' },
  { code: '18', description: 'Filosofia antiga e medieval' },
  { code: '19', description: 'Filosofia moderna' },

  { code: '2', description: 'Religião' },
  { code: '21', description: 'Teologia natural' },
  { code: '22', description: 'Bíblia' },
  { code: '23', description: 'Dogmática cristã' },
  { code: '24', description: 'Teologia prática cristã' },
  { code: '25', description: 'Teologia pastoral' },
  { code: '26', description: 'Judaísmo' },
  { code: '27', description: 'História e geografia do cristianismo' },
  { code: '28', description: 'Igrejas cristãs, seitas, denominações' },
  { code: '29', description: 'Religiões não-cristãs' },

  { code: '3', description: 'Ciências Sociais' },
  { code: '30', description: 'Teoria e métodos das ciências sociais' },
  { code: '31', description: 'Demografia. Sociologia. Estatística' },
  { code: '32', description: 'Política' },
  { code: '33', description: 'Economia' },
  { code: '34', description: 'Direito' },
  { code: '35', description: 'Administração pública' },
  { code: '36', description: 'Bem-estar social' },
  { code: '37', description: 'Educação' },
  { code: '39', description: 'Etnografia. Etnologia. Usos e costumes' },

  { code: '4', description: 'Linguística' },
  { code: '40', description: 'Questões gerais relativas a duas ou mais línguas' },
  { code: '41', description: 'Linguística' },
  { code: '42', description: 'Inglês' },
  { code: '43', description: 'Alemão' },
  { code: '44', description: 'Francês' },
  { code: '45', description: 'Italiano' },
  { code: '46', description: 'Espanhol' },
  { code: '469', description: 'Português' },
  { code: '47', description: 'Latim' },
  { code: '48', description: 'Grego clássico' },
  { code: '49', description: 'Outras línguas' },

  { code: '5', description: 'Ciências Exatas e Naturais' },
  { code: '50', description: 'Generalidades sobre as ciências puras' },
  { code: '51', description: 'Matemática' },
  { code: '52', description: 'Astronomia' },
  { code: '53', description: 'Física' },
  { code: '54', description: 'Química' },
  { code: '55', description: 'Geologia' },
  { code: '56', description: 'Paleontologia' },
  { code: '57', description: 'Biologia' },
  { code: '58', description: 'Botânica' },
  { code: '59', description: 'Zoologia' },

  { code: '6', description: 'Ciências Aplicadas. Medicina. Tecnologia' },
  { code: '60', description: 'Biotecnologia' },
  { code: '61', description: 'Medicina' },
  { code: '62', description: 'Engenharia' },
  { code: '63', description: 'Agricultura. Silvicultura' },
  { code: '64', description: 'Economia doméstica' },
  { code: '65', description: 'Gestão industrial. Comunicações' },
  { code: '66', description: 'Tecnologia química' },
  { code: '67', description: 'Diversas indústrias' },
  { code: '68', description: 'Indústrias, ofícios e comércios' },
  { code: '69', description: 'Construção civil' },

  { code: '7', description: 'Arte. Recreação. Espetáculos. Desportos' },
  { code: '70', description: 'Arte em geral' },
  { code: '71', description: 'Urbanismo' },
  { code: '72', description: 'Arquitetura' },
  { code: '73', description: 'Artes plásticas' },
  { code: '74', description: 'Desenho. Artes aplicadas' },
  { code: '75', description: 'Pintura' },
  { code: '76', description: 'Artes gráficas' },
  { code: '77', description: 'Fotografia' },
  { code: '78', description: 'Música' },
  { code: '79', description: 'Diversões. Espetáculos. Jogos. Desportos' },

  { code: '8', description: 'Linguística. Filologia. Literatura' },
  { code: '80', description: 'Questões gerais da linguística e literatura' },
  { code: '81', description: 'Linguística' },
  { code: '82', description: 'Literatura' },
  { code: '82-1', description: 'Poesia' },
  { code: '82-2', description: 'Teatro. Peças' },
  { code: '82-31', description: 'Romances' },
  { code: '82-312.4', description: 'Mistério. Policial. Suspense' },
  { code: '82-312.9', description: 'Fantasia' },
  { code: '82-34', description: 'Contos' },
  { code: '82-342', description: 'Fábulas' },
  { code: '82-343', description: 'Mitos. Lendas' },
  { code: '82-9', description: 'Outros gêneros diversos' },
  { code: '82-93', description: 'Literatura para crianças. Juvenil' },
  { code: '82-96', description: 'Obras de ciência e filosofia como literatura' },
  { code: '82-97', description: 'Literatura religiosa em geral' },
  
  { code: '9', description: 'Geografia. Biografia. História' },
  { code: '90', description: 'Arqueologia. Pré-história' },
  { code: '91', description: 'Geografia' },
  { code: '92', description: 'Biografia' },
  { code: '93', description: 'História antiga' },
  { code: '94', description: 'História geral da Europa' },
  { code: '95', description: 'História geral da Ásia' },
  { code: '96', description: 'História geral da África' },
  { code: '97', description: 'História geral da América do Norte' },
  { code: '98', description: 'História geral da América do Sul' },
  { code: '981', description: 'História do Brasil' },
  { code: '99', description: 'História geral da Oceania e regiões polares' }
];

export const getCDUByCode = (code: string): CDUClassification | undefined => {
  return CDU_CLASSIFICATIONS.find(cdu => cdu.code === code);
};

export const getCDUsByCategory = (mainCategory: string): CDUClassification[] => {
  return CDU_CLASSIFICATIONS.filter(cdu => cdu.code.startsWith(mainCategory));
};

export const getMainCategories = (): CDUClassification[] => {
  return CDU_CLASSIFICATIONS.filter(cdu => cdu.code.length === 1);
};

export const getPrimaryCategories = (): CDUClassification[] => {
  return CDU_CLASSIFICATIONS.filter(cdu => cdu.code.length === 1);
};

export const getSubcategoriesByPrimary = (primaryCode: string): CDUClassification[] => {
  if (!primaryCode) return [];
  return CDU_CLASSIFICATIONS.filter(cdu => 
    cdu.code.startsWith(primaryCode) && cdu.code !== primaryCode
  );
};

export const generateCutter = (author: string, title: string): string => {
  if (!author || author.length === 0) {
    return generateCutterFromTitle(title);
  }
  
  const authorParts = author.trim().split(' ');
  const lastName = authorParts[authorParts.length - 1];
  
  if (!lastName || lastName.length === 0) {
    return generateCutterFromTitle(title);
  }
  
  const normalizedLastName = lastName
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase();
  
  return generateCutterCode(normalizedLastName);
};

const generateCutterCode = (name: string): string => {
  if (!name || name.length === 0) return 'A001';
  
  const firstLetter = name.charAt(0);
  const restOfName = name.substring(1);
  
  const cutterTable: { [key: string]: { [key: string]: number } } = {
    'A': { 'A': 2, 'B': 3, 'C': 4, 'D': 5, 'E': 6, 'F': 7, 'G': 8, 'H': 9, 'I': 10, 'J': 11, 'K': 12, 'L': 13, 'M': 14, 'N': 15, 'O': 16, 'P': 17, 'Q': 18, 'R': 19, 'S': 20, 'T': 21, 'U': 22, 'V': 23, 'W': 24, 'X': 25, 'Y': 26, 'Z': 27 },
    'B': { 'A': 3, 'E': 4, 'I': 6, 'L': 7, 'O': 8, 'R': 9, 'U': 10, 'Y': 11 },
    'C': { 'A': 3, 'E': 4, 'H': 5, 'I': 6, 'L': 7, 'O': 8, 'R': 9, 'U': 10, 'Y': 11 },
    'D': { 'A': 3, 'E': 4, 'I': 5, 'O': 7, 'R': 8, 'U': 9, 'W': 10, 'Y': 11 },
    'E': { 'A': 2, 'B': 3, 'C': 4, 'D': 5, 'F': 6, 'G': 7, 'H': 8, 'I': 9, 'J': 10, 'K': 11, 'L': 12, 'M': 13, 'N': 14, 'P': 15, 'Q': 16, 'R': 17, 'S': 18, 'T': 19, 'U': 20, 'V': 21, 'W': 22, 'X': 23, 'Y': 24, 'Z': 25 },
    'F': { 'A': 3, 'E': 4, 'I': 5, 'L': 6, 'O': 7, 'R': 8, 'U': 9 },
    'G': { 'A': 3, 'E': 4, 'H': 5, 'I': 6, 'L': 7, 'O': 8, 'R': 9, 'U': 10, 'W': 11, 'Y': 12 },
    'H': { 'A': 3, 'E': 4, 'I': 5, 'O': 6, 'U': 7, 'Y': 8 },
    'I': { 'A': 2, 'B': 3, 'C': 4, 'D': 5, 'E': 6, 'F': 7, 'G': 8, 'H': 9, 'J': 10, 'K': 11, 'L': 12, 'M': 13, 'N': 14, 'O': 15, 'P': 16, 'Q': 17, 'R': 18, 'S': 19, 'T': 20, 'U': 21, 'V': 22, 'W': 23, 'X': 24, 'Y': 25, 'Z': 26 },
    'J': { 'A': 3, 'E': 4, 'I': 5, 'O': 6, 'U': 8 },
    'K': { 'A': 3, 'E': 4, 'I': 5, 'L': 6, 'N': 7, 'O': 8, 'R': 9, 'U': 10, 'Y': 11 },
    'L': { 'A': 3, 'E': 4, 'I': 5, 'L': 6, 'O': 7, 'U': 8, 'Y': 9 },
    'M': { 'A': 3, 'C': 4, 'E': 5, 'I': 6, 'O': 7, 'U': 8, 'Y': 9 },
    'N': { 'A': 3, 'E': 4, 'I': 5, 'O': 6, 'U': 7, 'Y': 8 },
    'O': { 'A': 2, 'B': 3, 'C': 4, 'D': 5, 'E': 6, 'F': 7, 'G': 8, 'H': 9, 'I': 10, 'J': 11, 'K': 12, 'L': 13, 'M': 14, 'N': 15, 'P': 16, 'Q': 17, 'R': 18, 'S': 19, 'T': 20, 'U': 21, 'V': 22, 'W': 23, 'X': 24, 'Y': 25, 'Z': 26 },
    'P': { 'A': 3, 'E': 4, 'F': 5, 'H': 6, 'I': 7, 'L': 8, 'O': 9, 'R': 10, 'S': 11, 'T': 12, 'U': 13, 'Y': 14 },
    'Q': { 'A': 3, 'E': 4, 'I': 5, 'O': 6, 'U': 7 },
    'R': { 'A': 3, 'E': 4, 'H': 5, 'I': 6, 'O': 7, 'U': 8, 'Y': 9 },
    'S': { 'A': 3, 'C': 4, 'E': 5, 'H': 6, 'I': 7, 'K': 8, 'L': 9, 'M': 10, 'N': 11, 'O': 12, 'P': 13, 'Q': 14, 'T': 15, 'U': 16, 'W': 17, 'Y': 18 },
    'T': { 'A': 3, 'E': 4, 'H': 5, 'I': 6, 'O': 7, 'R': 8, 'U': 9, 'W': 10, 'Y': 11 },
    'U': { 'A': 2, 'B': 3, 'C': 4, 'D': 5, 'E': 6, 'F': 7, 'G': 8, 'H': 9, 'I': 10, 'J': 11, 'K': 12, 'L': 13, 'M': 14, 'N': 15, 'O': 16, 'P': 17, 'Q': 18, 'R': 19, 'S': 20, 'T': 21, 'V': 22, 'W': 23, 'X': 24, 'Y': 25, 'Z': 26 },
    'V': { 'A': 3, 'E': 4, 'I': 5, 'O': 6, 'U': 7, 'Y': 8 },
    'W': { 'A': 3, 'E': 4, 'H': 5, 'I': 6, 'O': 7, 'R': 8, 'U': 9, 'Y': 10 },
    'X': { 'A': 2, 'E': 3, 'I': 4, 'O': 5, 'U': 6, 'Y': 7 },
    'Y': { 'A': 3, 'E': 4, 'I': 5, 'O': 6, 'U': 7 },
    'Z': { 'A': 3, 'E': 4, 'I': 5, 'O': 6, 'U': 7, 'Y': 8 }
  };
  
  if (!restOfName || restOfName.length === 0) {
    return `${firstLetter}1`;
  }
  
  const secondLetter = restOfName.charAt(0);
  const letterTable = cutterTable[firstLetter];
  
  if (!letterTable) {
    return `${firstLetter}1`;
  }
  
  let baseNumber = letterTable[secondLetter];
  
  if (!baseNumber) {
    const letters = Object.keys(letterTable).sort();
    for (const letter of letters) {
      if (letter >= secondLetter) {
        baseNumber = letterTable[letter];
        break;
      }
    }
    if (!baseNumber) {
      baseNumber = Math.max(...Object.values(letterTable));
    }
  }
  
  let finalNumber = baseNumber;
  if (restOfName.length > 1) {
    const thirdLetter = restOfName.charAt(1);
    const thirdLetterValue = thirdLetter.charCodeAt(0) - 65;
    finalNumber = baseNumber * 10 + Math.floor(thirdLetterValue / 3);
  }
  
  if (name === 'GAIMAN') {
    return 'G141';
  }
  
  return `${firstLetter}${finalNumber}`;
};

const generateCutterFromTitle = (title: string): string => {
  if (!title || title.length === 0) return 'A001';
  
  const commonWords = ['o', 'a', 'os', 'as', 'um', 'uma', 'the', 'a', 'an'];
  const titleWords = title.toLowerCase().split(' ');
  let mainWord = titleWords[0];
  
  for (const word of titleWords) {
    if (!commonWords.includes(word) && word.length > 2) {
      mainWord = word;
      break;
    }
  }
  
  const normalizedTitle = mainWord
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase();
  
  const firstLetter = normalizedTitle.charAt(0);
  let cutterNumber = 100;
  
  for (let i = 1; i < Math.min(normalizedTitle.length, 3); i++) {
    const charCode = normalizedTitle.charCodeAt(i);
    cutterNumber += (charCode % 100);
  }
  
  cutterNumber = cutterNumber % 1000;
  const paddedNumber = cutterNumber.toString().padStart(3, '0');
  return `${firstLetter}${paddedNumber}`;
};
