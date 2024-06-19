// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <h1>tip4.us</h1>
      <ul>
        <li><Link to="/">All</Link></li>
        <li><Link to="/tag/python">Python</Link></li>
        <li><Link to="/tag/java">Java</Link></li>
        {/* Add more tags as needed */}
      </ul>
    </nav>
  );
};

export default Navbar;
