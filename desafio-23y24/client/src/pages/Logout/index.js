import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { useAuthContext } from '../../hooks/useAuthContext';
import { useLogout } from '../../hooks/useLogout';

const Logout = () => {
  const navigate = useNavigate();

  const { user } = useAuthContext();
  const { logout } = useLogout();

  useEffect(() => {
    setTimeout(async () => {
      await logout();

      navigate('/');
    }, 2000);
  }, []);
  return (
    <section className="section">
      <h1 className="page-title">Nos vemos {user}!</h1>
    </section>
  );
};

export default Logout;
