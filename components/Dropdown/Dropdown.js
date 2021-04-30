import React, { useState } from "react";
import Link from "next/link";
export default function Dropdown(props) {
  const { categorias, submenu } = props;
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  return (
    <ul className={click ? "dropdown-menu clicked" : "dropdown-menu"}>
      {categorias.map((categoria) => (
        <li key={categoria.id}>
          <Link href={`/${submenu}/${categoria.url}`}>
            <a className="nav-links">{categoria.title}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
}
