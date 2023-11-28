import React, { useRef } from "react";
import Slider from "react-slick";

function SliderComponent() {
  const slider = useRef();

  const next = () => {
    slider.current.slickNext();
  };

  const prev = () => {
    slider.current.slickPrev();
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    afterChange: (current) => handleAfterChange(current),
    beforeChange: (current, next) => handleBeforeChange(current, next),
  };

  const handleAfterChange = (current) => {
    if (current + 1 === totalItems) {
      // disable next arrow
      slider.current.nextArrow.classList.add("slick-disabled");
    }
  };

  const handleBeforeChange = (current, next) => {
    if (next === current - 1 && current !== 0) {
      // enable next arrow
      slider.current.nextArrow.classList.remove("slick-disabled");
    }
  };

  return (
    <div>
      <Slider ref={slider} {...settings}>
        {/* your slides */}
      </Slider>
      <button onClick={prev}>Prev</button>
      <button onClick={next}>Next</button>
    </div>
  );
}

export default SliderComponent;
