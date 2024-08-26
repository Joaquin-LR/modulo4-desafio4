import React, { useState, useEffect } from 'react';
import CardPizza from './CardPizza';
import Pizza from './Pizza';

const Home = ({ cart, setCart, setCurrentView, selectedPizza, setSelectedPizza }) => {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/pizzas')
      .then(response => response.json())
      .then(data => {
        setPizzas(data);
        // No inicializar el carrito aquí, ya que se mantiene en App.js
      })
      .catch(error => {
        console.error('Error al obtener las pizzas:', error);
      });
  }, []);

  const handleViewMore = (pizza) => {
    setSelectedPizza(pizza);
    setCurrentView('pizzaDetails');  // Cambia la vista a 'pizzaDetails'
  };

  const updateCart = (pizzaId, quantity) => {
    setCart(prevCart => prevCart.map(pizza => 
      pizza.id === pizzaId ? { ...pizza, quantity } : pizza
    ));
  };

  return (
    <>
      {selectedPizza ? (
        <Pizza pizza={selectedPizza} setCurrentView={setCurrentView} />
      ) : (
        <div className='card-container'>
          {pizzas.map((pizza) => (
            <CardPizza 
              key={pizza.id}
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
      )}
    </>
  );
};

export default Home;
