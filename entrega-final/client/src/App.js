import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';

import Nav from './components/Nav';

import './App.css';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <header>
          <Nav />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
};

export default App;
