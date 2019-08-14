import React, { Component } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

import styled from "styled-components";
import VideoCard from "./VideoCard";

import { gradients } from "../assets/gradients/gradients.js";

import "../assets/styles/videos.scss";

const MAX_SLIDES = 2;

const Main = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  /* overflow: hidden; */
`;

const SliderWrapper = styled(Slider)`
  width: 100%;
  height: 100%;
`;

export default class VideoWrapper extends Component {
  state = {
    loaded: false,
    index: 0,
    quotes: [],
    quotesBuffer: [],
    page: 1,
    quotePointer: 0
  };

  instance = axios.create({
    baseURL: "https://favqs.com/api/",
    headers: {
      Authorization: 'Token token="efd17e3873ee2ed832507cf4260d3c7a"'
    }
  });

  componentWillMount = () => {
    this.getQuotes().then(() => {
      var len = gradients.length;
      var data = [];
      for (let i = 0; i < MAX_SLIDES; i++) {
        var rand = Math.floor(Math.random() * len);
        var gradient = gradients[rand].colors;

        while (!this.checkIfLight(gradient)) {
          rand = Math.floor(Math.random() * len);
          gradient = gradients[rand].colors;
        }
        var pointer = this.state.quotePointer;
        var element = {
          index: i,
          quote: this.state.quotesBuffer[pointer],
          views: "",
          shareLink: "",
          primary: gradient[0],
          secondary: gradient[1],
          angle: ""
        };
        data.push(element);
        this.setState({ quotePointer: this.state.quotePointer + 1 });
      }
      this.setState({ quotes: data }, () => {
        this.setState({ loaded: true });
      });
    });
  };

  getQuotes = () => {
    var promise = this.instance
      .get("quotes/", {
        params: {
          page: this.state.page
        }
      })
      .then(response => {
        this.setState({
          quotesBuffer: this.state.quotesBuffer.concat(response.data.quotes),
          page: this.state.page + 1
        });
      })
      .catch(function(error) {
        console.log(error);
      })
      .then(function() {
        // always executed
      });
    return promise;
  };

  checkIfLight = gradient => {
    for (let i = 0; i < gradient.length; i++) {
      var c = gradient[i];
      c = c.substring(1); // strip #
      var rgb = parseInt(c, 16); // convert rrggbb to decimal
      var r = (rgb >> 16) & 0xff; // extract red
      var g = (rgb >> 8) & 0xff; // extract green
      var b = (rgb >> 0) & 0xff; // extract blue

      var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

      if (luma < 128) {
        return false;
      }
    }
    return true;
  };

  handleChange = index => {
    var data = this.state.quotes;
    // var indexToChange = index - Math.floor(MAX_SLIDES / 2);
    var indexToChange = (this.state.quotePointer % MAX_SLIDES) - 2;

    if (indexToChange < 0) {
      indexToChange = MAX_SLIDES + indexToChange;
    }

    var rand = Math.floor(Math.random() * gradients.length);
    var gradient = gradients[rand].colors;

    while (!this.checkIfLight(gradient)) {
      rand = Math.floor(Math.random() * gradients.length);
      gradient = gradients[rand].colors;
    }
    data[indexToChange] = {
      index: indexToChange,
      quote: this.state.quotesBuffer[this.state.quotePointer],
      views: "",
      shareLink: "",
      primary: gradient[0],
      secondary: gradient[1],
      angle: ""
    };
    this.setState(
      { quotes: data, quotePointer: this.state.quotePointer + 1 },
      () => {
        if (this.state.index === MAX_SLIDES - 1) {
          this.setState({ index: 0 });
        } else {
          this.setState({ index: this.state.index + 1 });
        }
        if (this.state.quotePointer >= 0.8 * this.state.quotePointer) {
          this.getQuotes();
        }
      }
    );
  };

  handleNext = () => {
    this.slider.slickNext();
  };

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
            {this.state.quotes.map(quote => {
              return (
                <VideoCard
                  key={quote.index}
                  primary={quote.primary}
                  secondary={quote.secondary}
                  content={quote.quote}
                  active={true}
                  nextCallback={this.handleNext}
                />
              );
            })}
          </SliderWrapper>
        ) : (
          "Loading..."
        )}
      </Main>
    );
  }
}
