import { useReducer, useEffect } from 'react';

import AuthContext from './auth-context';

const initialState = { user: null, authIsReady: false, isAdmin: false };

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_USER': {
      return { user: action.payload, authIsReady: true };
    }
    case 'LOGIN': {
      return { ...state, user: action.payload };
    }
    case 'LOGOUT': {
      return { ...state, user: null };
    }
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch('api/cuenta/user', {
        credentials: 'include',
      });

      const data = await response.json();

      if (!data.email) {
        dispatch({ type: 'LOAD_USER', payload: null });
        return;
      }

      dispatch({ type: 'LOAD_USER', payload: data });
    };

    fetchUser();
  }, []);

  console.log('auth', state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
