import React from "react";
import { Grid, Image } from "semantic-ui-react";
import { map } from "lodash";
import Link from "next/link";
import useWindowSize from "../../hooks/useWindowSize";
import CardProduct from "../CardProduct";
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
        <Grid.Row className="columnas" columns={getColummns()}>
          {map(products, (product) => (
            <CardProduct product={product} key={product._id}></CardProduct>
          ))}
        </Grid.Row>
      </Grid>
    </div>
  );
}
