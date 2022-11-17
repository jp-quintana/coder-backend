import { useState, useReducer, useEffect } from 'react';

import { AuthContext } from './auth-context';

const initialState = {
  user: null,
};

const authReducer = (action, state) => {
  switch (action.type) {
    case 'LOAD_USER': {
      return { user: action.payload };
    }
    case 'LOGIN': {
      return { user: action.payload };
    }
    case 'LOGOUT': {
      return { initialState };
    }
    default: {
      return state;
    }
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch('/session', {
        method: 'GET',
        credentials: 'include',
      });
      console.log(response);
      const data = await response.json();

      console.log(data);

      dispatch({ type: 'LOAD_USER', payload: data });
      setIsLoading(false);
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
