export interface PersonalBook {
  id: string;
  title: string;
  authors: string[];
  isbn?: string;
  publisher?: string;
  publishedDate?: string;
  pageCount?: number;
  description?: string;
  imageUrl?: string;
  categories?: string[];
  
  // Classificação bibliotecária
  cduCode?: string; // Código CDU (ex: "821.111-73")
  cutterCode?: string; // Código Cutter (ex: "A123")
  callNumber?: string; // Número de chamada completo (CDU + Cutter)
  
  // Informações específicas do acervo pessoal
  status: 'não-lido' | 'lendo' | 'lido' | 'abandonado' | 'quero-ler';
  rating?: number; // 1-5 estrelas
  personalNotes?: string;
  purchaseDate?: string;
  purchasePrice?: number;
  condition: 'novo' | 'seminovo' | 'usado' | 'danificado';
  physicalLocation?: string; // localização física real (ex: "Sala 1, Estante A, Prateleira 2")
  favorite?: boolean;
  loanedTo?: string; // nome da pessoa se emprestado
  loanDate?: string;
  
  // Timestamps
  addedAt: string;
  updatedAt: string;
}

export interface PersonalLibrary {
  books: PersonalBook[];
  totalBooks: number;
  readBooks: number;
  currentlyReading: number;
  wantToRead: number;
}

export interface BookFilters {
  status?: PersonalBook['status'][];
  condition?: PersonalBook['condition'][];
  favorite?: boolean;
  authors?: string[];
  categories?: string[];
  rating?: number[];
  searchText?: string;
  cduCode?: string[]; // Filtro por código CDU
  cduMainCategory?: string; // Filtro por categoria principal CDU (0-9)
}

export interface BookSortOptions {
  field: 'title' | 'authors' | 'addedAt' | 'rating' | 'publishedDate';
  direction: 'asc' | 'desc';
}
