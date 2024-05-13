import React from 'react';
import logo from "../../../../public/logo2.png";
import './Footer.css';

const Footer = () => (
    <div className="footer-container">
        <img src={logo} alt="Logo" className="logo" />
        <p className="copyright">&copy; Spacio 2024</p>
    </div>
);

export default Footer;