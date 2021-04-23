import React, { useState } from "react";
import BasicModal from "../Modal/BasicModal";
import { Icon, Label } from "semantic-ui-react";
import Link from "next/link";
import Search from "../Search";
import Auth from "../../components/Auth";
import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";
import useUser from "../../hooks/useUser";
import Dropdown from "../Dropdown";
export default function Header(props) {
  const { categorias } = props;
  const [dropdown, setDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [titleModal, settitleModal] = useState("Iniciar Sesión");
  const onShowModal = () => setShowModal(true);
  const onCloseModal = () => setShowModal(false);
  const [click, setclick] = useState(false);
  const { user } = useUser();
  const { auth, logout } = useAuth();
  const { prouductsCart } = useCart();

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };

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
            <a className="navbar-logo">
              <img
                src="https://lx-1992.s3.us-east-2.amazonaws.com/thumbnail_Logo_Porcelanito_36c21b403e.png"
                alt="Porcelanito"
              ></img>
              El Porcelanito
            </a>
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
            <li
              className="nav-item"
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            >
              <a href="#sect-2" onClick={closeMobileMenu} className="nav-links">
                Categorías
              </a>
              {dropdown && <Dropdown categorias={categorias} />}
            </li>
            <li className="nav-item">
              <a href="#sect-3" onClick={closeMobileMenu} className="nav-links">
                Promociones
              </a>
            </li>

            {user ? (
              <li className="nav-item">
                <Link href="/account">
                  <a className="nav-links">
                    <Icon className="user outline" />
                  </a>
                </Link>
              </li>
            ) : null}
            {auth ? (
              <li className="nav-item">
                <div className="nav-links" onClick={logout}>
                  <Icon className="power off"></Icon>
                </div>
              </li>
            ) : (
              <li className="nav-item">
                <a
                  href="#sect-1"
                  onClick={() => {
                    closeMobileMenu();
                    onShowModal();
                  }}
                  className="nav-links"
                >
                  Login
                </a>
              </li>
            )}

            <li className="nav-item">
              <Link href="/cart">
                <a className="nav-links">
                  <Icon className="cart"></Icon>
                  {prouductsCart > 0 && (
                    <div className="count-cart">{prouductsCart}</div>
                  )}
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <BasicModal
        show={showModal}
        setShow={setShowModal}
        title={titleModal}
        size="small"
      >
        <Auth onCloseModal={onCloseModal} settitleModal={settitleModal} />
      </BasicModal>
    </>
  );
}
