import React, { Component } from "react";
import styled from "styled-components";

import Footer from "../components/Footer";
import QuotesWrapper from "./QuotesWrapper";
import VideoWrapper from "./VideoWrapper";
import PosterWrapper from "./PosterWrapper";

const Wrapper = styled.div`
  height: calc(80vh - 5rem);
  width: 100%;
`;

export default class MainWrapper extends Component {
  state = { active: "Quotes" };

  handleFooterChange = active => {
    this.setState({ active: active });
  };

  getComponent = () => {
    if (this.state.active === "Posters") {
      return (<PosterWrapper />);
    } else if (this.state.active === "Videos") {
      return (<VideoWrapper />);
    } else if (this.state.active === "Quotes") {
      return (<QuotesWrapper />);
    } else {
      console.log("test")
      console.log(this.state.active)
    }
  }

  render() {
    return (
      <>
        <Wrapper>
          {this.getComponent()}
        </Wrapper>
        <Footer callback={this.handleFooterChange} default={this.state.active}/>
      </>
    );
  }
}
