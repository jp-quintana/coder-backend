// import { useState } from 'react';

import { useAuthContext } from './useAuthContext';

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = async () => {
    try {
      await fetch('api/cuenta/session', {
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
