import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets"; 

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">

        {/* Left */}
        <div className="footer-left">
            <div className="footer-logo">
                <img src={assets.logo} alt="" />
            </div>
          
          <p>
            Apsor brings your favorite food right to your doorstep.  
            Fresh ingredients, authentic flavors, and fast delivery —
            all in one place.
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="Facebook" />
            <img src={assets.twitter_icon} alt="Twitter" />
            <img src={assets.linkedin_icon} alt="LinkedIn" />
          </div>
        </div>

        {/* Center */}
        <div className="footer-center">
          <h3>COMPANY</h3>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Right */}
        <div className="footer-right">
          <h3>GET IN TOUCH</h3>
          <ul>
            <li>+855 81 441 9625</li>
            <li>nutkimheng000@gmail.com</li>
            <li>Phnom Penh, Cambodia</li>
          </ul>
        </div>

      </div>

      <hr />

      <p className="footer-copyright">
        © 2026 Tomato.com — All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
