import { Routes, Route } from 'react-router-dom';

import { useAuthContext } from './hooks/useAuthContext';
import { useCartContext } from './hooks/useCartContext';

import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import User from './pages/User';
import AdminProducts from './pages/AdminProducts';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import Cart from './pages/Cart';

import Nav from './components/Nav';

import './App.css';

const App = () => {
  const { authIsReady } = useAuthContext();
  const { cartIsReady } = useCartContext();

  return (
    <>
      {authIsReady && cartIsReady && (
        <>
          <header>
            <Nav />
          </header>
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/usuario" element={<User />} />
              <Route path="/productos/admin" element={<AdminProducts />} />
              <Route path="/productos/admin/agregar" element={<AddProduct />} />
              <Route path="/productos/admin/:id" element={<EditProduct />} />
              <Route path="/carrito" element={<Cart />} />
            </Routes>
          </main>
        </>
      )}
    </>
  );
};

export default App;
