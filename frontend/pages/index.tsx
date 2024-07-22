import Link from 'next/link';
import styles from '../styles/home.module.css';

const HomePage = () => {
  return (
    <main className={styles.main}>
      <h1>Bem-Vindo ao Leilão de Livros</h1>
      <p>Escolha uma das opções abaixo para acessar o nosso leilão!</p>
      <div>
        <button className={styles.button}>
          <Link href="/login">Login</Link>
        </button>
        <button className={styles.button}>
          <Link href="/signup">Sign Up</Link>
        </button>
        <button className={styles.button}>
          <Link href="/home">Home</Link>
        </button>
      </div>
    </main>
  );
};

export default HomePage;
