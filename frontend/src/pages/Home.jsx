import React, { useState, useEffect } from 'react';
import CardPizza from '../components/CardPizza';
import Header from '../components/Header'; 
import { useNavigate } from 'react-router-dom';

const Home = ({ cart, setCart }) => {
  const [pizzas, setPizzas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Home - Pizzería Mamma Mia"; // Cambia el título al montar
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/api/pizzas')
      .then(response => response.json())
      .then(data => setPizzas(data))
      .catch(error => console.error('Error al obtener las pizzas:', error));
  }, []);

  const handleViewMore = (pizza) => {
    navigate(`/pizza/${pizza.id}`);
  };

  const updateCart = (pizzaId, quantity) => {
    setCart(prevCart => {
      const existingPizza = prevCart.find(pizza => pizza.id === pizzaId);
      if (existingPizza) {
        return prevCart.map(pizza =>
          pizza.id === pizzaId ? { ...pizza, quantity: Math.max(0, quantity) } : pizza
        );
      } else {
        const newPizza = pizzas.find(pizza => pizza.id === pizzaId);
        return [...prevCart, { ...newPizza, quantity }];
      }
    });
  };

  return (
    <div className='home-container'>
      <Header headerTitle="¡Bienvenido a Pizzería Mamma Mia!" headerSubtitle="Las mejores pizzas de la ciudad" />
      
      <div className='card-container'>
        {pizzas.map((pizza) => (
          <CardPizza
            key={pizza.id}
            id={pizza.id}
            name={pizza.name}
            price={pizza.price}
            ingredients={pizza.ingredients}
            imagen={pizza.img}
            quantity={cart.find(item => item.id === pizza.id)?.quantity || 0}
            updateCart={(quantity) => updateCart(pizza.id, quantity)}
            onViewMore={() => handleViewMore(pizza)}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
