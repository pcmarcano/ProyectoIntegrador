import React from 'react';
import logo from "../../../../public/logo1.png";
import './Footer.css';

const Footer = () => (
    <div className="footer-container">
        <img src={logo} alt="Logo" className="logo" />
        <p className="copyright">Copyright &copy; 2024 | Spacio</p>
    </div>
);

export default Footer;