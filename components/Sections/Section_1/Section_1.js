import React from "react";
import CarouselScreenshots from "../../CarouselScreenshots";

export default function Section_1(props) {
  const { banners } = props;
  return (
    <section className="section-container" id="sect-1">
      <CarouselScreenshots banners={banners}></CarouselScreenshots>
    </section>
  );
}
