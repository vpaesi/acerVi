import api from './api';

//para search os books com propriedades específicas, criar interfaces para os dados retornados pela API e para as props do componente

// Função para search books por subject
export const getBooksBySubject = async (subject: string) => {
  try {
    const response = await api.get(`/book/subject/${subject}`);
    if (response.status === 204 || !Array.isArray(response.data)) {
      return [];
    }
    return response.data;
  } catch (error) {
    console.error('Error when searching books by subject:', error);
    throw error;
  }
};

// Função para search todos os books
export const getAllBooks = async () => {
  try {
    const response = await api.get('/book');
    if (response.status === 204 || !Array.isArray(response.data)) {
      return [];
    }
    return response.data;
  } catch (error) {
    console.error('Error when searching all books:', error);
    throw error;
  }
};
