import { useEffect, useRef, useState } from "react";
import { fetchBooks } from "../api/books";
import type { Book } from "../types/book";
import { BookCard } from "./BookCard";
import { Box, CircularProgress } from "@mui/material";

export const BookList = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const loadingRef = useRef(false);
  const loader = useRef<HTMLDivElement | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const loadBooks = async () => {
      loadingRef.current = true;
      setLoading(true);
      const newBooks = await fetchBooks(page);
      setBooks((prev) => [...prev, ...newBooks]);
      setLoading(false);
      loadingRef.current = false;
    };
    loadBooks();
  }, [page]);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loadingRef.current) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.5 }
    );

    if (loader.current) observer.current.observe(loader.current);

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, []);

  return (
    <Box>
      {books.map((book,i) => (
        <BookCard key={i} book={book} />
      ))}
      <div ref={loader}>{loading && <CircularProgress />}</div>
    </Box>
  );
};
