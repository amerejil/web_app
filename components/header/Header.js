import React, { useState } from "react";
import { Icon } from "semantic-ui-react";
import Link from "next/link";
import Search from "../Search";
export default function Header() {
  const [click, setclick] = useState(false);
  const handleClick = () => {
    setclick(!click);
  };
  const closeMobileMenu = () => setclick(false);
  return (
    <>
      <ul className="info">
        <li>Info1</li>
        <li>Info2</li>
        <li>Info3</li>
      </ul>

      <nav className="navbar">
        <div className="navbar-container">
          <Link href="/" onClick={closeMobileMenu}>
            <div className="navbar-logo">
              <img src="https://lx-1992.s3.us-east-2.amazonaws.com/thumbnail_Logo_Porcelanito_36c21b403e.png"></img>
              El Porcelanito
            </div>
          </Link>
          <div className="menu-icon">
            <Icon
              className={click ? "times" : "bars"}
              onClick={handleClick}
            ></Icon>
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Search></Search>
            </li>
            <li className="nav-item">
              <a href="#sect-2" onClick={closeMobileMenu} className="nav-links">
                Categorías
              </a>
            </li>
            <li className="nav-item">
              <a href="#sect-3" onClick={closeMobileMenu} className="nav-links">
                Promociones
              </a>
            </li>
            <li className="nav-item">
              <a href="#sect-1" onClick={closeMobileMenu} className="nav-links">
                Login
              </a>
            </li>
            <li className="nav-item">
              <a href="/" className="nav-links">
                <Icon className="cart"></Icon>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
