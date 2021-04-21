import React, { useState, useEffect } from "react";
import BasicModal from "../Modal/BasicModal";
import { Icon } from "semantic-ui-react";
import Link from "next/link";
import Search from "../Search";
import Auth from "../../components/Auth";
import useAuth from "../../hooks/useAuth";
import useUser from "../../hooks/useUser";

export default function Header() {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, settitleModal] = useState("Iniciar Sesión");
  const onShowModal = () => setShowModal(true);
  const onCloseModal = () => setShowModal(false);
  const [click, setclick] = useState(false);
  const { user } = useUser();
  const { auth, logout } = useAuth();
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

            {user ? (
              <li className="nav-item">
                <Link href="/account">
                  <a className="nav-links">
                    <Icon name="user outline" />
                    {user.name} {user.lastname}
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
              <a href="/" className="nav-links">
                <Icon className="cart"></Icon>
              </a>
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
