import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBookById } from "../api/books";
import type { Book } from "../types/book";
import { Card,Container, CardContent,CardMedia, Typography } from "@mui/material";

export const BookDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    if (id) getBookById(id).then((b) => b && setBook(b));
  }, [id]);

  if (!book) return <Typography>Loading...</Typography>;

  return (
    <Container sx={{ mt: 4 }}>
    <Card sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, p: 2, boxShadow: 3 }}>
      <CardMedia
        component="img"
        image={book.coverImage}
        alt={book.title}
        sx={{ width: { xs: '100%', sm: 200 }, height: { xs: 'auto', sm: 220 }, objectFit: "cover", borderRadius: 2, mr: { sm: 2 }, mb: { xs: 2, sm: 0 } }}
      />
      <CardContent>
        <Typography variant="h4" gutterBottom>{book.title}</Typography>
        <Typography variant="h6">Author: {book.author}</Typography>
        <Typography variant="body1" sx={{ my: 1 }}>Rating: {book.rating}</Typography>
      </CardContent>
    </Card>
  </Container>
  );
};