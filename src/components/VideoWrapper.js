import React, { Component } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

import styled from "styled-components";
import VideoCard from "./VideoCard";

import { gradients } from "../assets/gradients/gradients.js";

import "../assets/styles/videos.scss";

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
    data: [],
    isModalActive: false
  };

  componentWillMount = () => {
    this.getVideos();
  };

  getVideos = () => {
    axios
      .get("https://api.sheety.co/34d217ea-b298-4e0c-a05f-dbe677522ea9")
      .then(response => {
        console.log(response.data);
        var len = gradients.length;
        var data = [];

        for (let i = 0; i < response.data.length; i++) {
          var rand = Math.floor(Math.random() * len);
          var gradient = gradients[rand].colors;

          while (!this.checkIfLight(gradient)) {
            rand = Math.floor(Math.random() * len);
            gradient = gradients[rand].colors;
          }

          var element = {
            index: i,
            vidId: response.data[i].vid_id,
            inspCount: response.data[i].insp_count,
            primary: gradient[0],
            secondary: gradient[1],
            angle: ""
          };

          data.push(element);
        }
        this.setState({ data: data, loaded: true });
      })
      .catch(function(error) {
        console.log(error);
      });
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

  handleNext = () => {
    this.slider.slickNext();
  };

  handleVideoClose = () => {
    this.setState({ isModalActive: false, currentVidID: null });
  };

  handlePlay = vidId => {
    this.setState({ currentVidID: vidId, isModalActive: true });
  };

  render() {
    var settings = {
      infinite: true,
      slidesToShow: 1,
      speed: 700,
      draggable: false,
      easing: "ease",
      arrows: false,
      accessibility: false
      // fade: true
    };

    return (
      <Main>
        {this.state.loaded ? (
          <SliderWrapper {...settings} ref={c => (this.slider = c)}>
            {this.state.data.map(video => {
              return (
                <VideoCard
                  key={video.index}
                  primary={video.primary}
                  secondary={video.secondary}
                  active={true}
                  nextCallback={this.handleNext}
                  inspCount={video.inspCount}
                  vidId={video.vidId}
                  handlePlay={this.handlePlay}
                />
              );
            })}
          </SliderWrapper>
        ) : (
          "Loading..."
        )}
        <div className={this.state.isModalActive ? "modal is-active" : "modal"}>
          <div className="modal-background" onClick={this.handleVideoClose} />
          <div className="modal-content">
            <iframe
              width="100000"
              height="100000"
              src={
                "https://www.youtube.com/embed/" +
                this.state.currentVidID +
                "?autoplay=1&origin=" +
                window.location.origin.toString()
              }
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              style={{height: "100%"}}
            />
          </div>
          <button
            className="modal-close is-large"
            aria-label="close"
            onClick={this.handleVideoClose}
          />
        </div>
      </Main>
    );
  }
}
