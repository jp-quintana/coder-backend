import { Routes, Route } from 'react-router-dom';

import { useAuthContext } from './hooks/useAuthContext';

import Layout from './setup/Layout';
import ProtectedRoutes from './setup/ProtectedRoutes';

import Home from './pages/Home';
import Login from './pages/Login';
import Logout from './pages/Logout';

import './App.css';

function App() {
  const { authIsReady } = useAuthContext();

  return (
    <div className="App">
      {authIsReady && (
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route element={<ProtectedRoutes needAuth={false} />}>
              <Route path="/login" element={<Login />} />
            </Route>
            <Route element={<ProtectedRoutes needAuth={true} />}>
              <Route path="/logout" element={<Logout />} />
            </Route>
          </Route>
        </Routes>
      )}
    </div>
  );
}

export default App;
