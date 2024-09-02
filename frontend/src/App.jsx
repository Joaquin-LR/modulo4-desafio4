import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Cart from './pages/Cart';
import Pizza from './pages/Pizza';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState(''); // Nuevo estado para almacenar el email del usuario
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const calculateTotal = () => {
    return cart.reduce((total, pizza) => total + (pizza.price * pizza.quantity), 0);
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <Router>
      <div className='container'>
        <div className='nav-container'>
          <Navbar
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            navtitle={'¡Pizzería Mamma Mia!'}
            totalLabel={'🛒 Carrito:'}
            total={calculateTotal()}
          />
        </div>
        <Routes>
          <Route path="/" element={<Home cart={cart} setCart={setCart} />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* Pasa setIsLoggedIn y setUserEmail al componente LoginPage */}
          <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} setUserEmail={setUserEmail} />} />
          <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
          {/* Pasa el correo del usuario al componente Profile */}
          <Route path="/profile" element={<Profile userEmail={userEmail} />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
        <Footer footerContent={'©2021 - Pizzería Mamma Mia! - Todos los derechos reservados'} />
      </div>
    </Router>
  );
}

export default App;
