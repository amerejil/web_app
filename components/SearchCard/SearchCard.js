import React from "react";
import Link from "next/link";
export default function SearchCard(props) {
  const { products } = props;

  if (!products.length > 0) return null;
  return (
    <div className="searchCardAbsolute">
      <div className="searchCard">
        {products?.map((product) => (
          <Link href={`/${product.url}`}>
            <a>
              <div className="one-product" key={product.id}>
                <img src={product.imagen.formats.thumbnail.url}></img>
                <span className="title">{product.title}</span>
                <span className="precio">${product.price}</span>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}
