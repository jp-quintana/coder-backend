import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useLogin } from '../../hooks/useLogin';

import styles from './index.module.css';

const Login = () => {
  const navigate = useNavigate();
  const { login, isLoading, error } = useLogin();

  const [navigation, setNavigation] = useState(false);

  const emailInput = useRef();
  const passwordInput = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login({
      email: emailInput.current.value,
      password: passwordInput.current.value,
    });
    setNavigation(true);
  };

  useEffect(() => {
    if (navigation) {
      error
        ? navigate('/faillogin', { state: { message: error } })
        : navigate('/');
    }
  }, [navigation]);

  return (
    <section>
      <div className="main-container">
        <h1 className={styles.page_title}>Login</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2>Ingresá tus datos:</h2>
          <label>
            <span>Email:</span>
            <input ref={emailInput} type="email" required />
          </label>
          <label>
            <span>Password:</span>
            <input ref={passwordInput} type="password" required />
          </label>
          {!isLoading && (
            <button type="submit" className={styles.button}>
              Ingresar
            </button>
          )}
          {isLoading && (
            <button type="submit" className={styles.button} disabled>
              {' '}
              Ingresando...
            </button>
          )}
          <p>
            No tenés cuenta?{' '}
            <Link to="/signup" className={styles.signup}>
              Registrate acá!
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
