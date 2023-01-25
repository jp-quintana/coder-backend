import { createContext } from 'react';

const AuthContext = createContext({ user: null, authIsReady: false });

export default AuthContext;
