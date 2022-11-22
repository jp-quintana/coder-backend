import { useReducer, useEffect } from 'react';

import { AuthContext } from './auth-context';

import React from 'react';

const initialState = {
  user: null,
  authIsReady: false,
};

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
      const response = await fetch('http://localhost:8080', {
        credentials: 'include',
      });

      const data = await response.json();

      dispatch({ type: 'LOAD_USER', payload: data.email });
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
