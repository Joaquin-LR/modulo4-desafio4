import React, { useEffect } from 'react';

const Profile = ({ userEmail }) => {
  useEffect(() => {
    document.title = "Profile - Pizzería Mamma Mia";
  }, []);

  return (
    <div className='profile-container'>
      <h2>Perfil del Usuario</h2>
      {/* Muestra el correo del usuario */}
      <p>Email: {userEmail}</p>
      <button className='btn btn-danger'>Cerrar sesión</button>
    </div>
  );
};

export default Profile;
