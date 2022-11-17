import { useRef } from 'react';

import { useLogin } from '../../hooks/useLogin';

const Login = () => {
  const { login, isLoading } = useLogin();

  const nameInput = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login({ name: nameInput.current.value });
  };

  return (
    <section className="login-section">
      <form onSubmit={handleSubmit} className="login-form">
        <h1>Login de Usuario</h1>
        <label>
          <span>Nombre:</span>
          <input type="text" ref={nameInput} required />
        </label>
        <button className="button" type="submit">
          Ingresar
        </button>
      </form>
    </section>
  );
};

export default Login;
