import React from "react";
import logo from "../../../../public/logo1.png";
import "./Footer.css";

const Footer = () => (
  <div class="footer-container">
    <img src={logo} alt="Logo" class="logo" />
    <p class="copyright">Copyright &copy; 2024 | Spacio</p>
  </div>
);

export default Footer;
