import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { useLogin } from '../../hooks/useLogin';

const Login = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useLogin();

  const nameInput = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login({ name: nameInput.current.value });

    navigate('/');
  };

  return (
    <section className="section">
      <h1 className="page-title">Login de Usuario</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <label>
          <span>Nombre:</span>
          <input type="text" ref={nameInput} required />
        </label>
        {!isLoading && (
          <button className="button" type="submit">
            Ingresar
          </button>
        )}
        {isLoading && (
          <button className="button" type="submit" disabled>
            Cargando...
          </button>
        )}
      </form>
    </section>
  );
};

export default Login;
