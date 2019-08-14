import React, { Component } from "react";
import styled from "styled-components";

import "../assets/styles/global.scss";

const FooterWrapper = styled.footer`
  position: fixed;
  bottom: 0;
  height: 20%;
  width: 100%;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  text-align: center;
  z-index: -1;
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
  box-shadow: 0px 8px 24px 0px rgba(115, 115, 115, 0.67);
  transform: translateY(-14px);
`;

const FullWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Center = styled.div`
  display: flex !important;
  justify-content: center;
  align-items: center;
`;

const Line = styled.div`
  /* width: 1px;
  background-color: black;
  height: 100px;
  display: inline-block; */
  height: 30%;
  width: 1px;
  border-right: 2px solid gray;
  /*display: inline-block;*/
  /*margin: 0 auto;*/
`;

export default class Footer extends Component {
  render() {
    return (
      <>
        <FooterWrapper>
          <FullWrapper className="container">
            <FullWrapper className="columns">
              <div
                className="column"
                style={{ height: 100 + "%" }}
              >
                <FullWrapper>Videos</FullWrapper>
              </div>
              <Line />
              <Center
                className="column is-two-fifths"
                style={{ height: 100 + "%" }}
              >
                <Selected>Quotes</Selected>
              </Center>
              <Line />
              <div
                className="column"
                style={{ height: 100 + "%" }}
              >
                <FullWrapper>Posters</FullWrapper>
              </div>
            </FullWrapper>
          </FullWrapper>
        </FooterWrapper>
      </>
    );
  }
}
