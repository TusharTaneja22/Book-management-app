import { Container, Typography } from "@mui/material";
import { BookList } from "./BookList";
import { BookSearch } from "./BookSearch";
import { useState } from "react";

export const BooksPage = () => {
  const [searching, setSearching] = useState(false);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Book Management</Typography>
      <BookSearch onSearchStateChange={setSearching} />
      {!searching && <BookList />}
    </Container>
  );
};
