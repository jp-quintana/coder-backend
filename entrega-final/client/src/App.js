import { Routes, Route } from 'react-router-dom';

import CartProvider from './context/cart/CartProvider';

import { useAuthContext } from './hooks/useAuthContext';

import Home from './pages/Home';
import Login from './pages/Login';
import AdminProducts from './pages/AdminProducts';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import Cart from './pages/Cart';

import Nav from './components/Nav';

import './App.css';

const App = () => {
  const { authIsReady } = useAuthContext();
  return (
    <>
      {authIsReady && (
        <CartProvider>
          <header>
            <Nav />
          </header>
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/productos/admin" element={<AdminProducts />} />
              <Route path="/productos/admin/agregar" element={<AddProduct />} />
              <Route path="/productos/admin/:id" element={<EditProduct />} />
              <Route path="/carrito" element={<Cart />} />
            </Routes>
          </main>
        </CartProvider>
      )}
    </>
  );
};

export default App;
