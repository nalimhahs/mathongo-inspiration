import React, { Component } from "react";
import styled from "styled-components";

import PlayIcon from "../assets/images/play.svg";
import ShareIcon from "../assets/images/share.svg";

const CardWrapper = styled.div`
  width: 65%;
  height: 90%;
  min-height: 100px;
  background: linear-gradient(
    ${props => (props.angle ? props.angle : "to right")},
    ${props => (props.primary ? props.primary : "#42275a")},
    ${props => (props.secondary ? props.secondary : "#734b6d")}
  );
  border-radius: 20px;
  margin: 0 auto;
  ${props =>
    props.active
      ? "animation: shadow-drop-center 0.3s cubic-bezier(0.445, 0.050, 0.550, 0.950) both;"
      : "animation: rev-shadow-drop-center 0.4s cubic-bezier(0.445, 0.050, 0.550, 0.950) both;"}
`;

const ContentWrapper = styled.div`
  height: 100%;
  margin: auto;
`;

const TitleWrapper = styled.div`
  width: 65%;
  height: 30%;
  border-radius: 25px;
  background: linear-gradient(
    ${props => (props.angle ? props.angle : "to right")},
    ${props => (props.primary ? props.primary : "#42275a")},
    ${props => (props.secondary ? props.secondary : "#734b6d")}
  );
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.26), 0 5px 50px rgba(0, 0, 0, 0.23);
  margin: 5px 10px;
`;

const Heading = styled.div`
  padding: 28px 40px;
  font-family: "Nunito";
  font-size: 2rem;
  font-weight: 600;
  line-height: 1;
  /* width: 90%; */
  padding-bottom: 0px;
`;

const Author = styled.div`
  width: 90%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 30px;
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
  display: flex;
  justify-content: center;
  align-items: center;
  /* padding-right: 50px; */
  transition: opacity 0.2s ease-out;
  ${props => (props.active ? "opacity: 1;" : "opacity: 0;")}
`;

// const PlayIcon = props => (
//   <>
//     <svg
//       style={{ width: 0, height: 0, position: "absolute" }}
//       aria-hidden="true"
//       focusable="false"
//     >
//       <linearGradient id="play-gradient" x2="1" y2="1">
//         <stop offset="0%" stopColor={props.primary} />
//         <stop offset="100%" stopColor={props.secondary} />
//       </linearGradient>
//     </svg>
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       width="72"
//       height="72"
//       viewBox="0 0 72 72"
//       fill = "url(#play-gradient)"
//       // style={{ height: 50 + "%"}}
//     >
//       <path d="M8 5v14l11-7z"/>
//       <path d="M0 0h24v24H0z" fill="none" />
//     </svg>
//   </>
// );

const PlayWrapper = styled.div`
  height: 55%;
  width: 100%;
  display: flex;
  justify-content: center;
  transform: translate(10%, 15%);
`;

const Img = styled.img`
  height: ${props => (props.h ? props.h + "%" : "35%")};
  cursor: pointer;
  :hover{
    transform: scale(1.2);
  }
`;

const CardFooter = styled.div`
  width: 100%;
  height: 15%;
  padding: 0 40px;
  font-family: Nunito;
`;

const Icons = styled.div`
  float: right;
`

const Icon = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.6rem;
  transform: translateY(20);
  transform: scale(1.3);

`

export default class VideoCard extends Component {
  handleNext = () => {
    if (this.props.active) {
      this.props.nextCallback();
    }
  };

  handlePlay = () => {
    console.log("clicked");
  }

  render() {
    return (
      <>
        <CardWrapper
          angle={this.props.angle}
          primary={this.props.primary}
          secondary={this.props.secondary}
          active={this.props.active}
        >
          <ContentWrapper className="columns">
            <div className="column is-10">
              <TitleWrapper
                angle={this.props.angle}
                primary={this.props.primary}
                secondary={this.props.secondary}
              >
                <Heading>Inspirational Video</Heading>
                <Author>
                  <hr />
                  {this.props.content.author}
                </Author>
              </TitleWrapper>
              <PlayWrapper
                primary={this.props.primary}
                secondary={this.props.secondary}
              >
                <Img src={PlayIcon} onClick={this.handlePlay}/>
              </PlayWrapper>
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
