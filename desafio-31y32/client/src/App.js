import { Routes, Route, Navigate } from 'react-router-dom';

import { useAuthContext } from './hooks/useAuthContext';

import Layout from './setup/Layout';

import Home from './pages/Home';
import Info from './pages/Info';
import Random from './pages/Random';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Logout from './pages/Logout';
import AuthFail from './pages/AuthFail';

import './App.css';

function App() {
  const { authIsReady } = useAuthContext();

  return (
    <>
      {authIsReady && (
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/info" element={<Info />} />
            <Route path="/random" element={<Random />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/faillogin" element={<AuthFail />} />
            <Route path="/failregister" element={<AuthFail />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      )}
    </>
  );
}

export default App;
