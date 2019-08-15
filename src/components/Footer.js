import React, { Component } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";

import "../assets/styles/global.scss";
import "../assets/styles/footer.scss";

const FooterWrapper = styled.footer`
  position: fixed;
  bottom: 0;
  height: 19%;
  width: 100%;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  text-align: center;
  z-index: 2;
  font-family: Nunito;
  font-size: 2rem;
  font-weight: 700;
  /* padding: 10px; */
`;

const Selected = styled.div`
  width: 60%;
  height: 60%;
  background: rgb(21, 137, 238);
  background: linear-gradient(
    15deg,
    rgba(21, 137, 238, 1) 0%,
    rgba(0, 212, 255, 1) 100%
  );
  border-radius: 15px;
  display: flex !important;
  justify-content: center;
  align-items: center;
  /* box-shadow: 0px 8px 24px 0px rgba(115, 115, 115, 0.67); */
`;

const FullWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .cursor {
    cursor: pointer;
  }
`;

const Center = styled.div`
  display: flex !important;
  justify-content: center;
  align-items: center;
`;

const Line = styled.div`
  height: 30%;
  width: 1px;
  border-right: 2px solid gray;
`;

export default class Footer extends Component {
  state = {
    left: "Quotes",
    main: "Posters",
    right: "Videos",
    active_class: "add-shadow",
    text_class: "text-fade-in"
  };

  handleChange = clicked => {
    this.props.callback(clicked);
    this.setState(
      { active_class: "rem-shadow", text_class: "text-fade-out" },
      () => {
        setTimeout(() => {
          if (clicked === this.state.left) {
            this.setState({
              left: this.state.right,
              main: this.state.left,
              right: this.state.main
            }, () => {
              // this.props.callback(this.state.main);
            });
          } else if (clicked === this.state.right) {
            this.setState({
              left: this.state.main,
              main: this.state.right,
              right: this.state.left
            }, () => {
              // this.props.callback(this.state.main);
            });
          }
          setTimeout(() => {
            this.setState({
              active_class: "add-shadow",
              text_class: "text-fade-in"
            });
          }, 400);
        }, 300);
      }
    );
  };

  render() {
    return (
      <>
        <FooterWrapper>
          <FullWrapper className="container">
            <FullWrapper className="columns">
              <div className="column cursor" style={{ height: 100 + "%" }}>
                <FullWrapper
                  onClick={() => {
                    this.handleChange(this.state.left);
                  }}
                  className={this.state.text_class}
                >
                  {this.state.left}
                </FullWrapper>
              </div>
              <Line />
              <Center
                className="column is-two-fifths cursor"
                style={{ height: 100 + "%" }}
              >
                <Selected className={this.state.active_class}>
                  <span className={this.state.text_class}>{this.state.main}</span>
                </Selected>
              </Center>
              <Line />
              <div className="column cursor" style={{ height: 100 + "%" }}>
                <FullWrapper
                  onClick={() => {
                    this.handleChange(this.state.right);
                  }}
                  className={this.state.text_class}
                >
                  {this.state.right}
                </FullWrapper>
              </div>
            </FullWrapper>
          </FullWrapper>
        </FooterWrapper>
      </>
    );
  }
}
