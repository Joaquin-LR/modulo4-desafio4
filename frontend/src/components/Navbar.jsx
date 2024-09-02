import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ isLoggedIn, setIsLoggedIn, navtitle, totalLabel, total }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark px-3'>
      <span className='navbar-brand text-white'>{navtitle}</span>
      <div className='collapse navbar-collapse'>
        <ul className='navbar-nav mr-auto'>
          <li className='nav-item'>
            <Link className='nav-link text-white px-3' to="/">🍕 Home</Link>
          </li>
          {isLoggedIn ? (
            <>
              <li className='nav-item'>
                <Link className='nav-link text-white px-3' to="/profile">🤤 Profile</Link>
              </li>
              <li className='nav-item'>
                <button className='nav-link btn btn-link text-white px-3' onClick={handleLogout}>🏃‍♂️‍➡️ Logout</button>
              </li>
            </>
          ) : (
            <>
              <li className='nav-item'>
                <Link className='nav-link text-white px-3' to="/login">🔒 Login</Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link text-white px-3' to="/register">🔒 Register</Link>
              </li>
            </>
          )}
        </ul>
        <button className='btn btn-outline-success my-2 my-sm-0 ms-auto' onClick={() => navigate('/cart')}>
          {totalLabel} {total.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
