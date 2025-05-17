import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import type { Book } from "../types/book";
import { useFavorites } from "../context/FavoritesContext";

export const FavoriteButton = ({ book }: { book: Book }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const fav = isFavorite(book.id);
  return (
    <IconButton onClick={() => toggleFavorite(book)}>
      {fav ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
    </IconButton>
  );
};