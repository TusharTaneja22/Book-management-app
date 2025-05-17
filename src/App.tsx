import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { BooksPage } from './components/BooksPage';
import { BookDetails } from './components/BookDetails';
import { FavoritesProvider } from './context/FavoritesContext';

function App() {
  return (
    <FavoritesProvider>
    <Router>
      <Routes>
      <Route path="/" element={<Navigate to="/books" />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/books/:id" element={<BookDetails />} />
      </Routes>
    </Router>
  </FavoritesProvider>
  )
}

export default App
