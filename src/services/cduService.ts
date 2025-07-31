export interface CDUClassification {
  code: string;
  description: string;
  parentCode?: string;
}

export const CDU_CLASSIFICATIONS: CDUClassification[] = [
  // 0 - Generalidades
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

  // 1 - Filosofia e Psicologia
  { code: '1', description: 'Filosofia e Psicologia' },
  { code: '11', description: 'Metafísica' },
  { code: '13', description: 'Filosofia mental. Metafísica da vida espiritual' },
  { code: '14', description: 'Sistemas filosóficos' },
  { code: '159.9', description: 'Psicologia' },
  { code: '16', description: 'Lógica' },
  { code: '17', description: 'Ética. Filosofia moral' },
  { code: '18', description: 'Filosofia antiga e medieval' },
  { code: '19', description: 'Filosofia moderna' },

  // 2 - Religião
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

  // 3 - Ciências Sociais
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

  // 4 - Linguística
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

  // 5 - Ciências Puras
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

  // 6 - Ciências Aplicadas
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

  // 7 - Arte
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

  // 8 - Literatura
  { code: '8', description: 'Linguística. Filologia. Literatura' },
  { code: '80', description: 'Questões gerais da linguística e literatura' },
  { code: '81', description: 'Linguística' },
  { code: '82', description: 'Literatura' },
  { code: '821', description: 'Literatura por línguas' },
  { code: '821.111', description: 'Literatura inglesa' },
  { code: '821.111-1', description: 'Poesia inglesa' },
  { code: '821.111-2', description: 'Drama inglês' },
  { code: '821.111-3', description: 'Épica inglesa' },
  { code: '821.111-31', description: 'Romance inglês' },
  { code: '821.111-32', description: 'Novela inglesa' },
  { code: '821.111-34', description: 'Conto inglês' },
  { code: '821.111-73', description: 'Ficção científica inglesa' },
  { code: '821.134.3', description: 'Literatura portuguesa' },
  { code: '821.134.3(81)', description: 'Literatura brasileira' },
  { code: '821.134.3(81)-1', description: 'Poesia brasileira' },
  { code: '821.134.3(81)-2', description: 'Drama brasileiro' },
  { code: '821.134.3(81)-31', description: 'Romance brasileiro' },
  { code: '821.134.3(81)-32', description: 'Novela brasileira' },
  { code: '821.134.3(81)-34', description: 'Conto brasileiro' },
  { code: '821.133.1', description: 'Literatura francesa' },
  { code: '821.131.1', description: 'Literatura italiana' },
  { code: '821.134.2', description: 'Literatura espanhola' },
  { code: '821.112.2', description: 'Literatura alemã' },

  // 9 - História e Geografia
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

// Função para gerar código Cutter
export const generateCutter = (author: string, title: string): string => {
  if (!author || author.length === 0) {
    return generateCutterFromTitle(title);
  }
  
  // Pega o último sobrenome do autor
  const authorParts = author.trim().split(' ');
  const lastName = authorParts[authorParts.length - 1];
  
  if (!lastName || lastName.length === 0) {
    return generateCutterFromTitle(title);
  }
  
  // Remove acentos e converte para maiúsculo
  const normalizedLastName = lastName
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase();
  
  // Gera o código Cutter baseado na primeira letra + números
  const firstLetter = normalizedLastName.charAt(0);
  
  // Tabela simplificada de Cutter
  const cutterTable: { [key: string]: number } = {
    'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8, 'I': 9,
    'J': 1, 'K': 2, 'L': 3, 'M': 4, 'N': 5, 'O': 6, 'P': 7, 'Q': 8, 'R': 9,
    'S': 1, 'T': 2, 'U': 3, 'V': 4, 'W': 5, 'X': 6, 'Y': 7, 'Z': 8
  };
  
  const baseNumber = cutterTable[firstLetter] || 1;
  
  // Gera um número baseado nos caracteres seguintes
  let cutterNumber = baseNumber;
  for (let i = 1; i < Math.min(normalizedLastName.length, 3); i++) {
    const charCode = normalizedLastName.charCodeAt(i);
    cutterNumber = (cutterNumber * 10 + (charCode % 10)) % 1000;
  }
  
  // Formata como C999 (C + 3 dígitos)
  const paddedNumber = cutterNumber.toString().padStart(3, '0');
  return `${firstLetter}${paddedNumber}`;
};

const generateCutterFromTitle = (title: string): string => {
  if (!title || title.length === 0) return 'A001';
  
  // Remove artigos e palavras comuns do início
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
