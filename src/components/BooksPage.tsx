import { Container, Typography } from "@mui/material";
import { BookList } from "./BookList";
import { BookSearch } from "./BookSearch";

export const BooksPage = () => (
  <Container>
    <Typography variant="h4" gutterBottom>Book Management</Typography>
    <BookSearch />
    <BookList />
  </Container>
);