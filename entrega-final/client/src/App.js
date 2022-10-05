import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import AdminProducts from './pages/AdminProducts';
import AddProduct from './pages/AddProduct';
import Cart from './pages/Cart';

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
            <Route path="/productos/admin" element={<AdminProducts />} />
            <Route path="/productos/admin/agregar" element={<AddProduct />} />
            <Route path="/carrito" element={<Cart />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
};

export default App;
