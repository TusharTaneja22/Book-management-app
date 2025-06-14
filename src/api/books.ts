import type { Book } from '../types/book';

const API_URL = "https://openlibrary.org/search.json?q=book";

export const fetchBooks = async (page = 1, limit = 20): Promise<Book[]> => {
  const res = await fetch(`${API_URL}&page=${page}`);
  const data = await res.json();
  return data.docs.slice(0, limit).map((doc: any) => ({
    id: doc.cover_edition_key,
    title: doc.title,
    author: doc.author_name?.[0] || "Unknown",
    rating: +(Math.random() * 5).toFixed(1),
    coverImage: doc.cover_i ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg` : ''
  }));
};

export const searchBooks = async (query: string,page = 1): Promise<Book[]> => {
  const res = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&page=${page}`);
  const data = await res.json();
  return data.docs.slice(0, 20).map((doc: any, i: number) => ({
    id: i,
    title: doc.title,
    author: doc.author_name?.[0] || "Unknown",
    rating: +(Math.random() * 5).toFixed(1),
    coverImage: doc.cover_i ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg` : ''
  }));
};  

  export const getBookById = async (id: string): Promise<Book | undefined> => {
    const response = await fetch(`${API_URL}/${id}`);
    const data = await response.json();
  
    const bookDoc = data.docs?.[0];
    if (!bookDoc) return undefined;
  
    return {
      id: bookDoc.cover_edition_key || `book-${id}`,
      title: bookDoc.title || "Untitled",
      author: bookDoc.author_name?.[0] || "Unknown",
      rating: parseFloat(data.rating) || +(Math.random() * 5).toFixed(1),
      coverImage: bookDoc.cover_i
        ? `https://covers.openlibrary.org/b/id/${bookDoc.cover_i}-L.jpg`
        : '',
    };
  };
  
