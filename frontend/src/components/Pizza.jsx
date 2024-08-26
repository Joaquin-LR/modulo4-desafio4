import React, { useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

function Pizza({ pizza, setCurrentView }) {
  const { name, price, ingredients, img, desc } = pizza;

  const formattedPrice = price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' });

  useEffect(() => {
    // Cambia el título del documento al nombre de la pizza
    document.title = `Pizza ${name}`;
    
    // Limpiar el título cuando el componente se desmonte o se cambie de vista
    return () => {
      document.title = 'Pizzería Mamma Mia';
    };
  }, [name]);

  return (
    <div>
      <Button variant="secondary" onClick={() => setCurrentView('home')}>Volver</Button>

      <div className='pizza-details-container'>
        <Card style={{ width: '30rem', marginTop: '20px' }}>
          <Card.Img variant="top" src={img} />
          <Card.Body>
            <Card.Title><h4>Pizza {name}</h4></Card.Title>
            <p>{desc}</p>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <div className='ingredientes'>
              <ListGroup.Item>
                <p className='ingredientes-titulo'>Ingredientes:</p>
                <ul className='ingredientes-texto'>
                  {ingredients.map((ingredient, index) => (
                    <li key={index}>🍕 {ingredient}</li>
                  ))}
                </ul>
              </ListGroup.Item>
            </div>
            <div className='precio-details'>
              <ListGroup.Item>
                <p>Precio: {formattedPrice}</p>
              </ListGroup.Item>
            </div>
          </ListGroup>
        </Card>
      </div>
      
    </div>
  );
}

export default Pizza;
