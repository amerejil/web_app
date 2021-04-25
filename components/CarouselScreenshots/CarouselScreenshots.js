import React, { useEffect, useState } from "react";
import { Image } from "semantic-ui-react";
import Slider from "react-slick";
import { getBannerApi } from "../../Api/banner";
import { map } from "lodash";
const settings = {
  className: "carousel-screenshots",
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  swipeToSlider: true,
  adaptiveHeight: true,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
};

export default function CarouselScreenshots(props) {
  const { banners } = props;

  return (
    <Slider {...settings}>
      {map(banners.imagen, (imagen) => (
        <div key="imagen._id" className="imagen">
          <Image loading="eager" src={imagen.url} key="1" alt="1"></Image>
        </div>
      ))}
    </Slider>
  );
}
