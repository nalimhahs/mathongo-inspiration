import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";

import ShareIcon from "../assets/images/share.svg";
import DownloadIcon from "../assets/images/download.svg";
import PrevIcon from "../assets/images/prev.svg";
import NextIcon from "../assets/images/next.svg";

const POSTER_URL = "https://api.sheety.co/5e2b9d9c-b942-487c-a5d1-420180440896";

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

  img {
    object-fit: contain;
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
  }
`;

const Div = styled.div`
  height: 100%;
  width: 100%;
`;

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Card = styled.div`
  position: relative;
  height: 80%;
  width: 75%;
  border-radius: 15px;
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.1), 0 5px 50px rgba(0, 0, 0, 0.1);
  padding: 30px 40px;

  p {
    /* padding-top: 10px; */
    font-family: Nunito;
    font-size: 1rem;
    padding: 10px 5px;
  }

  h6 {
    font-family: Nunito;
    text-align: center;
    padding-top: 30px;
    font-size: 0.9rem;
    color: #999999;
    position: absolute;
    bottom: 29%;
    width: 100%;
    left: 0;
  }
`;

const P = styled.p`
  font-family: Nunito;
  font-size: ${props => props.size} !important;
  padding: 10px 5px;
`;

const CardFooter = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 30%;
  width: 100%;
  margin-left: 1px;
`;

const Img = styled.img`
  height: 75%;
  cursor: pointer;
`;

const Icon = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.8rem;
  text-align: center;
  span {
    margin-top: 5px;
    font-family: Nunito;
  }
`;

const H1 = styled.h1`
  font-family: Nunito;
  font-size: ${props => props.size};
  font-weight: 600;
`;

const Prev = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  z-index: 999;
  transform: translateX(-30px);
`;

const Next = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  z-index: 999;
  transform: translateX(30px);
`;

function PrevArrow(props) {
  return (
    <Prev>
      <Icon onClick={props.callBack}>
        <Img src={PrevIcon} h="100" />
        <span>Prev</span>
      </Icon>
    </Prev>
  );
}

function NextArrow(props) {
  return (
    <Next>
      <Icon onClick={props.callBack}>
        <Img src={NextIcon} h="100" />
        <span>Next</span>
      </Icon>
    </Next>
  );
}

export default class PosterWrapper extends Component {
  state = {
    loaded: false,
    currentPoster: {
      url: "",
      title: "",
      desc: "",
      seen: 0
    },
    data: []
  };

  componentWillMount = () => {
    axios.get(POSTER_URL).then(response => {
      this.setState({
        data: response.data,
        loaded: true,
        currentPoster: response.data[0]
      });
    });
  };

  handleChange = index => {
    this.setState({ currentPoster: this.state.data[index] });
  };

  next = () => {
    this.slider.slickNext();
  };
  prev = () => {
    this.slider.slickPrev();
  };

  getFontSize = (text, mult = 20, min = 2, max = 2.75) => {
    const MAX_SIZE = max;
    const MIN_LEN = min;
    var len = text.split(" ").length;
    if (len < MIN_LEN) {
      return MAX_SIZE + "rem";
    } else {
      var len = (1 - (mult * (len - MIN_LEN)) / 100) * MAX_SIZE;
      // if (len < 1) {
      //   console.log(len)
      //   return "1rem";
      // }
      return len + "rem";
    }
  };

  render() {
    var settings = {
      infinite: true,
      speed: 700,
      draggable: true,
      easing: "ease",
      nextArrow: <NextArrow callBack={this.next} />,
      prevArrow: <PrevArrow callBack={this.prev} />,
      afterChange: index => {
        this.handleChange(index);
      }
      // fade: true
    };

    return (
      <Main>
        {this.state.loaded ? (
          <>
            <Div className="columns container">
              <Wrapper className="column is-7">
                <SliderWrapper {...settings} ref={c => (this.slider = c)}>
                  {this.state.data.map(poster => (
                    <img src={poster.url} className="image" />
                  ))}
                </SliderWrapper>
              </Wrapper>
              <Wrapper className="column is-5">
                <Card>
                  <H1 size={this.getFontSize(this.state.currentPoster.title)}>
                    {this.state.currentPoster.title}
                  </H1>
                  <P size={this.getFontSize(this.state.currentPoster.desc, 2, 20, 1)}>
                    {this.state.currentPoster.desc}
                  </P>
                  <h6>
                    Inspired {this.state.currentPoster.seen} students today.
                  </h6>
                  <CardFooter className="columns">
                    <Div className="column">
                      <Icon>
                        <Img src={ShareIcon} h="100" />
                        <span>Share</span>
                      </Icon>
                    </Div>
                    <Div className="column">
                      <Icon>
                        <Img src={DownloadIcon} h="100" />
                        <span>Download</span>
                      </Icon>
                    </Div>
                  </CardFooter>
                </Card>
              </Wrapper>
            </Div>
          </>
        ) : (
          "Loading..."
        )}
      </Main>
    );
  }
}
