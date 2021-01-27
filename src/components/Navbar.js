import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="nav-wrapper">
      <div className="container">
        <Link to="/" className="brand-logo">
          Products
        </Link>

        <ul className="right">
          <li>
            <Link to="/cart">
              <button className="waves-effect waves-light btn">
                Add Menu Item
              </button>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
