'use client';

import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/page.module.css';

const SignUp = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [type, setType] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          username,
          email,
          type,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Sign Up successful:', data);
      router.push('/login');
    } catch (error) {
      console.error('Sign Up failed:', error);
    }
  };

  return (
    <main className={styles.main}>
      <h1>Sign Up</h1>
      <form onSubmit={handleSignUp} className={styles.form}>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Nome de Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
            className={styles.selectBox}
          >
            <option value="">Selecione uma opção</option>
            <option value="seller">Vendedor</option>
            <option value="buyer">Comprador</option>
          </select>
        </div>
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </main>
  );
};

export default SignUp;
