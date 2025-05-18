import { useEffect, useRef, useState } from "react";
import { searchBooks } from "../api/books";
import { Box, TextField, Typography } from "@mui/material";
import { BookCard } from "./BookCard";
import type { Book } from "../types/book";

export const BookSearch = ({ onSearchStateChange }: { onSearchStateChange: (searching: boolean) => void }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Book[]>([]);
  const [noResults, setNoResults] = useState(false);
  const currentQueryRef = useRef("");   
  
  useEffect(() => {
    const timeout = setTimeout(() => {
        
      const trimmedQuery = query && query.trim();
      if (trimmedQuery) {
        currentQueryRef.current = trimmedQuery;
        onSearchStateChange(true);
        searchBooks(trimmedQuery).then((books) => {
          if (currentQueryRef.current !== trimmedQuery) return;

          if (books.length === 0) {
            setResults([]);
            setNoResults(true);
          } else {
            setResults(books);
            setNoResults(false);
          }
        });
      } else {
        currentQueryRef.current = "";
        setResults([]);
        setNoResults(false);
        onSearchStateChange(false);
      }
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

      {noResults ? (
        <Typography variant="body1">No results found for "{query}"</Typography>
      ) : results.length > 0 ? (
        results.map((book) => <BookCard key={book.id} book={book} />)
      ) : null}
    </Box>
  );
};

