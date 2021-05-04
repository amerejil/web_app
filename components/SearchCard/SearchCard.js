import React from "react";

export default function SearchCard(props) {
  const { products } = props;
  console.log(products);
  if (!products) return null;
  return (
    <div className="searchCard">
      {products?.map((product) => (
        <div className="one-product" key={product.id}>
          <img src={product.imagen.formats.thumbnail.url}></img>
          <span className="title">{product.title}</span>
          <span className="precio">${product.price}</span>
        </div>
      ))}
    </div>
  );
}
