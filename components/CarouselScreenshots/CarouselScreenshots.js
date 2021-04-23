import React, { useState } from "react";
import { Image } from "semantic-ui-react";
import Slider from "react-slick";

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
  const [showModal, setshowModal] = useState(false);
  const [urlImage, seturlImage] = useState(null);
  const { title, screenshots } = props;

  const openImagen = (url) => {
    seturlImage(url);
    setshowModal(true);
  };

  return (
    <Slider {...settings}>
      <div className="imagen">
        <Image loading="lazy" src="/banner_1.jpeg" key="1" alt="1"></Image>
      </div>
      <div className="imagen">
        <Image src="/banner_2.jpeg" key="2" alt="2"></Image>
      </div>
    </Slider>
  );
}
