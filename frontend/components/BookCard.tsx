import { useEffect, useState } from 'react';
import styles from '../styles/bookCard.module.css';

interface BookCardProps {
  id: number;
  title: string;
  author: string;
  genre?: string;
}

const BookCard: React.FC<BookCardProps> = ({ id, title, author, genre }) => {
  const [offers, setOffers] = useState<number[]>([]);
  const [newOffer, setNewOffer] = useState<number>(0);

  const fetchOffers = async () => {
    const response = await fetch(`http://localhost:3001/books/${id}/offers`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    setOffers(data.map((offer: any) => offer.amount));
  };

  const handleOffer = async () => {
    const response = await fetch(`http://localhost:3001/books/${id}/offer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: newOffer }),
    });
    if (response.ok) {
      fetchOffers();
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  return (
    <div className={styles.card}>
      <div className={styles.details}>
        <h3>{title}</h3>
        <p>{author}</p>
        {genre && <p>{genre}</p>}
      </div>
      <div className={styles.offers}>
        <h4>Melhores Ofertas</h4>
        <ul>
          {offers.map((offer, index) => (
            <li key={index}>{offer}</li>
          ))}
        </ul>
      </div>
      <input
        type="number"
        value={newOffer}
        onChange={(e) => setNewOffer(Number(e.target.value))}
        className={styles.offerInput}
      />
      <button onClick={handleOffer} className={styles.offerButton}>
        Oferta
      </button>
    </div>
  );
};

export default BookCard;
