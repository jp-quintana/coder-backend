import { useReducer, useEffect } from 'react';

import { AuthContext } from './auth-context';

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
      console.log('running');
      return { ...state, user: action.payload };
    }
    case 'LOGOUT': {
      return { ...state, user: null };
    }
    default: {
      return state;
    }
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch('/session', { credentials: 'include' });
      const { name } = await response.json();
      dispatch({ type: 'LOAD_USER', payload: name });
    };

    fetchUser();
  }, []);

  console.log(state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
