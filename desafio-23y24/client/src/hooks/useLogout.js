import { useAuthContext } from './useAuthContext';

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const logout = async () => {
    try {
      await fetch('/session', {
        method: 'DELETE',
        credentials: 'include',
      });

      dispatch({ type: 'LOGOUT' });
    } catch (err) {
      console.log(err);
    }
  };

  return { logout };
};
