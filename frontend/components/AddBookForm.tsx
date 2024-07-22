import { useState } from 'react';
import styles from '../styles/home.module.css';

interface AddBookFormProps {
  onBookAdded: () => void;
}

const AddBookForm: React.FC<AddBookFormProps> = ({ onBookAdded }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, author, genre, description }),
      });

      if (!response.ok) {
        throw new Error('Failed to add book');
      }

      setTitle('');
      setAuthor('');
      setGenre('');
      onBookAdded();
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Adicionar Novo Livro</h2>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Autor(a)"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Gênero"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
        <button type="submit">Adicionar</button>
      </div>
      {error && <p>{error}</p>}
    </form>
  );
};

export default AddBookForm;
