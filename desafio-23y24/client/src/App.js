import { Routes, Route } from 'react-router-dom';

import Layout from './setup/Layout';

import Home from './pages/Home';
import Login from './pages/Login';

import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
