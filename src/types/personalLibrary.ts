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
  
  // Informações específicas do acervo pessoal
  status: 'não-lido' | 'lendo' | 'lido' | 'abandonado' | 'quero-ler';
  rating?: number; // 1-5 estrelas
  personalNotes?: string;
  purchaseDate?: string;
  purchasePrice?: number;
  condition: 'novo' | 'seminovo' | 'usado' | 'danificado';
  location?: string; // onde está guardado (ex: "Estante A, prateleira 2")
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
}

export interface BookSortOptions {
  field: 'title' | 'authors' | 'addedAt' | 'rating' | 'publishedDate';
  direction: 'asc' | 'desc';
}
