import React, { Component } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";

const Main = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SliderWrapper = styled(Slider)`
  width: 100%;
  height: 100%;
`;

export default class PosterWrapper extends Component {

  state = {
    loaded: false,
  }

  render() {
    var settings = {
      infinite: true,
      slidesToShow: 1,
      speed: 700,
      draggable: false,
      easing: "ease",
      arrows: false,
      accessibility: false,
      afterChange: index => {
        this.handleChange(index);
      }
      // fade: true
    };

    return (
      <Main>
        {this.state.loaded ? (
          <SliderWrapper {...settings} ref={c => (this.slider = c)}>
            
          </SliderWrapper>
        ) : (
          "Loading..."
        )}
      </Main>
    );
  }
}
