import { useState, useRef, useEffect } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { useSignup } from '../../hooks/useSignup';

import styles from './index.module.css';

const Signup = () => {
  const navigate = useNavigate();
  const { signup, isLoading, error } = useSignup();

  const [navigation, setNavigation] = useState(false);

  const emailInput = useRef();
  const passwordInput = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup({
      email: emailInput.current.value,
      password: passwordInput.current.value,
    });

    setNavigation(true);
  };

  useEffect(() => {
    if (navigation) {
      error
        ? navigate('/failregister', { state: { message: error } })
        : navigate('/');
    }
  }, [navigation]);

  return (
    <section>
      <div className="main-container">
        <h1 className={styles.page_title}>Signup</h1>
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
              Crear
            </button>
          )}
          {isLoading && (
            <button type="submit" className={styles.button} disabled>
              Creando...
            </button>
          )}
          <p>
            Ya tenés cuenta?{' '}
            <Link to="/login" className={styles.signup}>
              Ingresá acá!
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Signup;
