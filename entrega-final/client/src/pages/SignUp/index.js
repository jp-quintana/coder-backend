import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useSignUp } from '../../hooks/useSignUp';

import styles from './index.module.css';

const SignUp = () => {
  const navigate = useNavigate();
  const { signUp, isLoading, error } = useSignUp();

  const [navigation, setNavigation] = useState(false);

  const emailInput = useRef();
  const passwordInput = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signUp({
      email: emailInput.current.value,
      password: passwordInput.current.value,
    });
    setNavigation(true);
  };

  useEffect(() => {
    if (navigation && !error) {
      navigate('/');
    } else {
      setNavigation(false);
    }
  }, [navigation]);

  return (
    <section>
      <div className="main-container">
        <h1 className="page-title">Registrate</h1>
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
            <button type="submit" className={`btn ${styles.button}`}>
              Registrate
            </button>
          )}
          {isLoading && (
            <button type="submit" className={`btn ${styles.button}`} disabled>
              {' '}
              Registrando...
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

export default SignUp;
