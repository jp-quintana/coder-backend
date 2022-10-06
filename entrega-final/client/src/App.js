import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useCartContext } from './hooks/useCartContext';

import Home from './pages/Home';
import AdminProducts from './pages/AdminProducts';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import Cart from './pages/Cart';

import Nav from './components/Nav';

import './App.css';

const App = () => {
  const { cartIsReady } = useCartContext();
  return (
    <div>
      {cartIsReady && (
        <BrowserRouter>
          <header>
            <Nav />
          </header>
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/productos/admin" element={<AdminProducts />} />
              <Route path="/productos/admin/agregar" element={<AddProduct />} />
              <Route path="/productos/admin/:id" element={<EditProduct />} />
              <Route path="/carrito" element={<Cart />} />
            </Routes>
          </main>
        </BrowserRouter>
      )}
    </div>
  );
};

export default App;
