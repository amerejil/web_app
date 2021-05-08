import React, { useEffect, useState } from "react";
import BasicModal from "../Modal/BasicModal";
import { Icon, Label } from "semantic-ui-react";
import Link from "next/link";
import Search from "../Search";
import Auth from "../../components/Auth";
import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";
import useUser from "../../hooks/useUser";
import Dropdown from "../Dropdown";
import { useRouter } from "next/router";

export default function Header(props) {
  const [isFixed, setisFixed] = useState(false);
  const r = useRouter();

  function fixnavbar() {
    const page = document.querySelector(".page-product");
    if (window.scrollY >= 30) {
      page.style.paddingTop = "80px";
      setisFixed(true);
    } else {
      page.style.paddingTop = 0;
      setisFixed(false);
    }
  }
  useEffect(() => {
    if (r.pathname === "/[product]")
      window.addEventListener("scroll", fixnavbar, [{ once: true }]);
    return () => {
      window.removeEventListener("scroll", fixnavbar, [{ once: true }]);
    };
  }, [r]);
  const item_submenu_account = [
    { url: "perfil", title: "Perfil", id: 1 },
    { url: "favorites", title: "Favoritos", id: 2 },
    { url: "orders", title: "Pedidos", id: 3 },
  ];
  const { categorias } = props;
  const [dropdownAccount, setdropdownAccount] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [titleModal, settitleModal] = useState("Iniciar Sesión");
  const onShowModal = () => setShowModal(true);
  const onCloseModal = () => setShowModal(false);
  const [click, setclick] = useState(false);
  const { user } = useUser();
  const { auth, logout } = useAuth();
  const { prouductsCart } = useCart();

  const onMouseEnterSubc = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeaveSubc = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };

  const onMouseEnterAccount = () => {
    if (window.innerWidth < 960) {
      setdropdownAccount(false);
    } else {
      setdropdownAccount(true);
    }
  };

  const onMouseLeaveAccount = () => {
    if (window.innerWidth < 960) {
      setdropdownAccount(false);
    } else {
      setdropdownAccount(false);
    }
  };

  const handleClick = () => {
    setclick(!click);
  };

  const closeMobileMenu = () => setclick(false);

  return (
    <>
      <ul className="info">
        <li>
          <Icon name="whatsapp"></Icon>0000000000
        </li>
        <li>
          <Icon name="mail"></Icon>Info2@mail.com
        </li>
        <li>
          <Icon name="time"></Icon>00H00 a 00H00
        </li>
      </ul>

      <nav className={isFixed ? "navbar-fixed" : "navbar"}>
        <div className="navbar-container">
          <Link href="/" onClick={closeMobileMenu}>
            <a className="navbar-logo">
              <div>
                <img
                  src="https://lx-1992.s3.us-east-2.amazonaws.com/thumbnail_Logo_Porcelanito_36c21b403e.png"
                  alt="Porcelanito"
                ></img>
              </div>

              <span>El Porcelanito</span>
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
              onMouseEnter={onMouseEnterSubc}
              onMouseLeave={onMouseLeaveSubc}
            >
              <a href="#sect-2" onClick={closeMobileMenu} className="nav-links">
                Categorías
              </a>
              {dropdown && (
                <Dropdown submenu="categorias" categorias={categorias} />
              )}
            </li>
            <li className="nav-item">
              <Link href="/promociones">
                <a onClick={closeMobileMenu} className="nav-links">
                  Promociones
                </a>
              </Link>
            </li>

            {user ? (
              <li
                onMouseEnter={onMouseEnterAccount}
                onMouseLeave={onMouseLeaveAccount}
                className="nav-item"
              >
                <a className="nav-links">
                  <Icon className="user" />
                </a>

                {dropdownAccount && (
                  <Dropdown
                    submenu="account"
                    categorias={item_submenu_account}
                  />
                )}
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
