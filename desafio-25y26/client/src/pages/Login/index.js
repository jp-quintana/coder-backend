import { Link } from 'react-router-dom';

import styles from './index.module.css';

const Login = () => {
  return (
    <section>
      <div className="main-container">
        <h1 className={styles.page_title}>Login</h1>
        <form className={styles.form}>
          <h2>Ingresá tus datos:</h2>
          <label>
            <span>Email:</span>
            <input type="email" required />
          </label>
          <label>
            <span>Password:</span>
            <input type="password" required />
          </label>
          <button className={styles.button}>Ingresar</button>
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
