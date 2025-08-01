export interface PersonalBook {
  id: string;
  title: string;
  authors: string[];
  isbn?: string;
  publisher?: string;
  publishedDate?: string;
  pageCount?: number;
  edition?: string; 
  description?: string;
  imageUrl?: string;
  categories?: string[];
  
  cduCode?: string;
  cutterCode?: string;
  callNumber?: string;
  series?: string;
  volumeNumber?: string;
  
  status: 'não-lido' | 'lendo' | 'lido' | 'abandonado' | 'quero-ler';
  rating?: number;
  personalNotes?: string;
  purchaseDate?: string;
  purchasePrice?: number;
  condition: 'novo' | 'seminovo' | 'usado' | 'danificado';
  physicalLocation?: string;
  favorite?: boolean;
  loanedTo?: string;
  loanDate?: string;
  
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
  cduCode?: string[];
  cduMainCategory?: string;
}

export interface BookSortOptions {
  field: 'title' | 'authors' | 'addedAt' | 'rating' | 'publishedDate';
  direction: 'asc' | 'desc';
}
