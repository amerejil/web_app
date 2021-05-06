import React from "react";
import Link from "next/link";
export default function SearchCard(props) {
  const { products } = props;

  if (!products.length > 0) return null;
  return (
    <div className="searchCardAbsolute">
      <div className="searchCard">
        {products?.map((product) => (
          <Link href={`/${product.url}`} key={product.id}>
            <a>
              <div className="one-product">
                <div className="container_img">
                  <img src={product.imagen[0].formats.thumbnail.url}></img>
                </div>
                <span className="title">{product.title}</span>
                <span className="precio">${product.price.toFixed(2)}</span>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}
