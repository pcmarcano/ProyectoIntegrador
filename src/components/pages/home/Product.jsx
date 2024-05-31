import React from "react";

const Product = () => {
  return (
    <form id="userForm">
      <label htmlFor="name">Nombre:</label>
      <input type="text" id="name" name="name" required />

      <label htmlFor="email">Correo Electrónico:</label>
      <input type="email" id="email" name="email" required />

      <label htmlFor="phone">Teléfono:</label>
      <input type="tel" id="phone" name="phone" />

      <button type="submit">Enviar</button>
    </form>
  );
};

export default Product;
