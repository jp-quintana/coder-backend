import { Routes, Route } from 'react-router-dom';

import Layout from './setup/Layout';

import Home from './pages/Home';
import Login from './pages/Login';
import Logout from './pages/Logout';
import AuthFail from './pages/Home';

import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/faillogin" element={<AuthFail />} />
          <Route path="/failregister" element={<AuthFail />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
