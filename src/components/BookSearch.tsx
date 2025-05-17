import { useEffect, useState } from "react";
import { searchBooks } from "../api/books";
import type { Book } from "../types/book";
import { BookCard } from "./BookCard";
import { TextField, Box } from "@mui/material";

export const BookSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Book[]>([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (query) searchBooks(query).then(setResults);
      else setResults([]);
    }, 400);
    return () => clearTimeout(timeout);
  }, [query]);

  
  return (
    <Box>
      <TextField
        label="Search books"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {results.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </Box>
  );
};