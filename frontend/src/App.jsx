import { useState } from 'react';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './components/Home';
import LoginPage from './components/LoginPage';
import Navbar from './components/Navbar';
import RegisterPage from './components/RegisterPage';
import Cart from './components/Cart';
import Pizza from './components/Pizza'; 
import pizzas from './assets/script/pizzas';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState(
    pizzas.map(pizza => ({
      ...pizza,
      quantity: 0,
    }))
  );
  const [selectedPizza, setSelectedPizza] = useState(null);

  const calculateTotal = () => {
    return cart.reduce((total, pizza) => total + (pizza.price * pizza.quantity), 0);
  };

  const handlePizzaSelect = (pizza) => {
    setSelectedPizza(pizza);
    setCurrentView('pizza');
  };

  const handleNavClick = (view) => {
    setSelectedPizza(null);
    setCurrentView(view);
  };

  return (
    <>
      <div className='container'>
        <div className='nav-container'>
          <Navbar 
            navtitle={'¡Pizzería Mamma Mia!'}
            home={'🍕 Home'}
            login={'🔐 Login'}
            register={'🔐 Register'}
            profile={'🔒 Profile'}
            logout={'🔒 Logout'}
            totalLabel={'🛒 Carrito: $'}
            total={calculateTotal()}
            setCurrentView={handleNavClick}
            isLoggedIn={isLoggedIn}
          />
        </div>

        {currentView === 'home' && (
          <>
            <Header 
              headerTitle={'¡Pizzería Mamma Mia!'}
              headerSubtitle={'¡Tenemos las mejores pizzas que podrás encontrar!'}
            />
            <Home 
              cart={cart} 
              setCart={setCart} 
              setSelectedPizza={handlePizzaSelect}
            />
          </>
        )}

        {currentView === 'pizza' && selectedPizza && (
          <Pizza 
            pizza={selectedPizza} 
            setCart={setCart} 
            cart={cart} 
          />
        )}

        {currentView === 'register' && (
          <div className='register-container'>
            <RegisterPage setCurrentView={setCurrentView} />
          </div>
        )}

        {currentView === 'login' && (
          <div className='login-container'>
            <LoginPage setCurrentView={setCurrentView} setIsLoggedIn={setIsLoggedIn} />
          </div>
        )}

        {currentView === 'cart' && (
          <div className='cart-container'>
            <Cart cart={cart} setCart={setCart} />
          </div>
        )}

        <Footer footerContent={'©2021 - Pizzería Mamma Mia! - Todos los derechos reservados'} />
      </div>
    </>
  );
}

export default App;
