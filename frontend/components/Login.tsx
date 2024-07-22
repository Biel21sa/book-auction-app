'use client';

import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/page.module.css';

const Login = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error: ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();
      console.log('Login successful:', data);

      localStorage.setItem('token', data.token);

      router.push('/');
    } catch (error: any) {
      console.error('Login failed:', error);
      // Exiba uma mensagem de erro para o usuário aqui
      alert('Falha no login: ' + error.message);
    }
  };

  const handleSignUpRedirect = () => {
    router.push('/signup');
  };

  return (
    <main className={styles.main}>
      <h1>Login</h1>
      <form onSubmit={handleLogin} className={styles.form}>
        <input
          type="username"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <button className={styles.button} onClick={handleSignUpRedirect}>
        Criar uma Conta
      </button>
    </main>
  );
};

export default Login;
