import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import  type { Book } from "../types/book";
import { FavoriteButton } from "./FavoriteButton";
import {Link} from 'react-router-dom'

export const BookCard = ({ book }: { book: Book }) => (
    <Link to={`/books/${book.id}`} style={{ textDecoration: "none" }}>

  <Card sx={{ display: "flex", mb: 2, justifyContent: "space-between" }}>
    <CardMedia
      component="img"
    sx={{
        width: '150px',
        height: '220px', 
        objectFit: "cover", 
        borderRadius: 1,
      }}
      image={book.coverImage}
      alt={book.title}
    />
    <CardContent sx={{ flexGrow: 1 }}>
      <Typography variant="h6">{book.title}</Typography>
      <Typography variant="subtitle1">by {book.author}</Typography>
      <Typography variant="body2">Rating: {book.rating}</Typography>
    </CardContent>
    <Box p={1}
     onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}><FavoriteButton book={book} /></Box>
  </Card>
  </Link>

);