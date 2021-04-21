import React from "react";
import Link from "next/link";
import { Image } from "semantic-ui-react";
export default function CardCategories(props) {
  const { categorias } = props;

  return (
    <Link href={`/categorias/${categorias.url}`}>
      <a className={`card-container ${categorias.id}`}>
        <div className="card-absolute">
          <img
            className="imagen"
            src={categorias.imagen.formats.small.url}
            alt={categorias.title}
          ></img>
          <h5>{categorias.title}</h5>
        </div>
      </a>
    </Link>
  );
}
