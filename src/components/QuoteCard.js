import React, { Component } from "react";
import styled from "styled-components";

import ShareIcon from "../assets/images/share.svg";

const CardWrapper = styled.div`
  width: 100%;
  height: 72%;
  min-height: 100px;
  background: linear-gradient(
    ${props => (props.angle ? props.angle : "to right")},
    ${props => (props.primary ? props.primary : "#42275a")},
    ${props => (props.secondary ? props.secondary : "#734b6d")}
  );
  border-radius: 20px;
  margin: 0 50px;
  ${props =>
    props.active
      ? "animation: shadow-drop-center 0.3s cubic-bezier(0.445, 0.050, 0.550, 0.950) both;"
      : "animation: rev-shadow-drop-center 0.4s cubic-bezier(0.445, 0.050, 0.550, 0.950) both;"}
`;

const ContentWrapper = styled.div`
  height: 100%;
  /* max-width: 700px; */
  /* margin: auto; */
`;

const Quote = styled.div`
  padding: 25px 40px;
  font-family: "Nunito";
  font-size: ${props => props.size};
  font-weight: 600;
  line-height: 1.25;
  /* width: 90%; */
  padding-bottom: 5px;
`;

const Author = styled.div`
  width: 90%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 40px;
  font-family: "Nunito";
  font-size: 1.25rem;
  hr {
    width: 30px;
    background-color: rgb(100, 100, 100);
    height: 4px;
    border-radius: 5px;
    margin-right: 15px;
    margin-left: 15px;
  }
`;

const NextWarpper = styled.div`
  height: 100%;
  width: 100%;
  display: flex !important;
  justify-content: center;
  align-items: center;
  /* padding-right: 50px; */
  transition: opacity 0.2s ease-out;
  ${props => (props.active ? "opacity: 1;" : "opacity: 0;")}
`;

const Img = styled.img`
  height: ${props => (props.h ? props.h + "%" : "35%")};
  cursor: pointer;
  :hover{
    transform: scale(1.2);
  }
`;

const CardFooter = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 15%;
  padding: 0px 40px;
  font-family: Nunito;
  font-size: 0.8rem;
`;

const Icons = styled.div`
  float: right;
`

const Icon = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.6rem;
  transform: translateY(-10px);
  /* transform: scale(1); */
`

export default class QuoteCard extends Component {
  handleNext = () => {
    if (this.props.active) {
      this.props.nextCallback();
    }
  };

  getFontSize = text => {
    const MAX_SIZE = 2.75;
    const MIN_LEN = 5;
    var len = text.split(" ").length;
    if (len < MIN_LEN) {
      return MAX_SIZE;
    } else {
      var len = (1 - (2 * (len - MIN_LEN)) / 100) * MAX_SIZE;
      if (len < 1) {
        return 1;
      }
      return len;
    }
  };

  render() {
    var size = this.getFontSize(this.props.content.body) + "rem";
    return (
      <>
        <CardWrapper
          angle={this.props.angle}
          primary={this.props.primary}
          secondary={this.props.secondary}
          active={this.props.active}
          className="anim"
        >
          <ContentWrapper className="columns">
            <div className="column is-10" style={{position: "relative"}}>
              <Quote active={this.props.active} size={size}>
                {this.props.content.body}
              </Quote>
              <Author active={this.props.active}>
                <hr />
                {this.props.content.author}
              </Author>
              <CardFooter>
                Inspired {this.props.inspCount? this.props.inspCount : "10K"} students today.
                <Icons>
                  <Icon>
                  <Img src={ShareIcon} h="100"/>
                  Share
                  </Icon>
                  
                </Icons>
              </CardFooter>
            </div>
            <NextWarpper
              className="column is-2"
              active={this.props.active}
              onClick={this.handleNext}
            >
              Next
            </NextWarpper>
          </ContentWrapper>
        </CardWrapper>
      </>
    );
  }
}
