'use client';

import { useEffect, useState } from 'react';
import BookCard from '../components/BookCard';
import AddBookForm from '../components/AddBookForm';
import styles from '../styles/home.module.css';

interface Book {
  id: number;
  title: string;
  author: string;
  genre?: string; // Se você estiver incluindo o gênero
}

const Home = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [searchTitle, setSearchTitle] = useState<string>('');
  const [searchAuthor, setSearchAuthor] = useState<string>('');
  const [searchGenre, setSearchGenre] = useState<string>('');

  const fetchBooks = async (filters: {
    title?: string;
    author?: string;
    genre?: string;
  }) => {
    try {
      const query = new URLSearchParams(filters as any).toString();
      const response = await fetch(`http://localhost:3001/books?${query}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }
      const data = await response.json();
      setBooks(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks({});
  }, []);

  const handleSearch = () => {
    fetchBooks({
      title: searchTitle,
      author: searchAuthor,
      genre: searchGenre,
    });
  };

  const handleBookAdded = () => {
    fetchBooks({
      title: searchTitle,
      author: searchAuthor,
      genre: searchGenre,
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <main className={styles.main}>
      <h1>Livros em Leilão</h1>
      <button
        className={styles.button}
        onClick={() => setShowForm((prev) => !prev)}
      >
        {showForm ? 'Cancelar' : 'Adicionar Livro'}
      </button>
      {showForm && <AddBookForm onBookAdded={handleBookAdded} />}
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Procurar por Título"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Procurar por Autor"
          value={searchAuthor}
          onChange={(e) => setSearchAuthor(e.target.value)}
        />
        <input
          type="text"
          placeholder="Procurar por Gênero"
          value={searchGenre}
          onChange={(e) => setSearchGenre(e.target.value)}
        />
        <button onClick={handleSearch}>Procurar</button>
      </div>
      <div className={styles.booksContainer}>
        {books.map((book) => (
          <BookCard
            key={book.id}
            id={book.id}
            title={book.title}
            author={book.author}
            genre={book.genre}
          />
        ))}
      </div>
    </main>
  );
};

export default Home;
