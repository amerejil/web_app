import React from "react";
import { Grid, Image } from "semantic-ui-react";
import { map } from "lodash";
import Link from "next/link";
import useWindowSize from "../../hooks/useWindowSize";
import {
  breakpointUpLg,
  breakpointUpMd,
  breakpointUpSm,
} from "../../Utils/breakpoint";

export default function ListProducts(props) {
  const { products } = props;
  const { width } = useWindowSize();

  const getColummns = () => {
    switch (true) {
      case width > breakpointUpLg:
        return 5;
      case width > breakpointUpMd:
        return 3;
      case width > breakpointUpSm:
        return 2;
      default:
        return 1;
    }
  };

  return (
    <div className="list-products">
      <Grid>
        <Grid.Row columns={getColummns()}>
          {map(products, (product) => (
            <Product product={product} key={product._id}></Product>
          ))}
        </Grid.Row>
      </Grid>
    </div>
  );
}
function Product(props) {
  const { product } = props;

  return (
    <Grid.Column className="list-games_game">
      <Link href={`/${product.url}`}>
        <a>
          <div className="list-games_game-poster">
            <Image src={product.imagen.url} alt={product.title}></Image>
            <div className="list-games_game-poster-info">
              {product.discount ? (
                <span className="discount">-{product.discount}%</span>
              ) : (
                <span></span>
              )}
              <span className="price">${product.price}</span>
            </div>
          </div>
          <h2>{product.title}</h2>
        </a>
      </Link>
    </Grid.Column>
  );
}
