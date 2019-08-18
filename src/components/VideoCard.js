import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";

import PlayIcon from "../assets/images/play.svg";
import ShareIcon from "../assets/images/share-w.svg";

const CardWrapper = styled.div`
  width: 65%;
  height: 90%;
  min-height: 100px;
  background: linear-gradient(
    ${props => (props.angle ? props.angle : "to right")},
    ${props => (props.primary ? props.primary : "#42275a")},
    ${props => (props.secondary ? props.secondary : "#734b6d")}
  );
  background: url(${props => props.bg});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-radius: 20px;
  margin: 0 auto;
  ${props =>
    props.active
      ? "animation: shadow-drop-center 0.3s cubic-bezier(0.445, 0.050, 0.550, 0.950) both;"
      : "animation: rev-shadow-drop-center 0.4s cubic-bezier(0.445, 0.050, 0.550, 0.950) both;"}
  color: #d1d1d1;
`;

const ContentWrapper = styled.div`
  height: 100%;
  margin: auto;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0.5);
`;

const TitleWrapper = styled.div`
  width: 65%;
  border-radius: 25px;
  background: linear-gradient(
    ${props => (props.angle ? props.angle : "to right")},
    ${props => (props.primary ? props.primary : "#42275a")},
    ${props => (props.secondary ? props.secondary : "#734b6d")}
  );
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.26), 0 5px 50px rgba(0, 0, 0, 0.23);
  margin: 5px 10px;
  color: #4e4e4e;
  padding-bottom: 10px;
`;

const Heading = styled.div`
  padding: 28px 40px;
  font-family: "Nunito";
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1;
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
  font-family: "Nunito";
  font-size: 1.1rem;
  transition: opacity 0.2s ease-out;
  ${props => (props.active ? "opacity: 1;" : "opacity: 0;")}
  cursor: pointer;
`;

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
  transition: 0.2s linear;
  :hover {
    transform: scale(1.2);
  }
`;

const CardFooter = styled.div`
  position: fixed;
  bottom: 20px;
  width: 52vw;
  height: 15%;
  padding: 0 40px;
  font-family: Nunito;
`;

const Icons = styled.div`
  float: right;
  transform: translateY(-7px);
`;

const Icon = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.6rem;
  transform: translateY(20);
  transform: scale(1.3);
`;

export default class VideoCard extends Component {
  state = {
    data: {},
    isModalActive: false
  };

  componentDidMount = () => {
    axios
      .get("http://noembed.com/embed", {
        params: {
          url: "https://youtube.com/watch?v=" + this.props.vidId
        }
      })
      .then(response => {
        this.setState({ data: response.data }, () => {
          console.log(this.state.data);
        });
      });
  };

  

  handleNext = () => {
    if (this.props.active) {
      this.props.nextCallback();
    }
  };

  handlePlay = () => {
    this.props.handlePlay(this.props.vidId);
    console.log(window.location.origin.toString());
  };

  render() {
    return (
      <>
        <CardWrapper
          angle={this.props.angle}
          primary={this.props.primary}
          secondary={this.props.secondary}
          active={this.props.active}
          bg={this.state.data.thumbnail_url}
        >
          <ContentWrapper className="columns">
            <div className="column is-10">
              <TitleWrapper
                angle={this.props.angle}
                primary={this.props.primary}
                secondary={this.props.secondary}
              >
                <Heading>{this.state.data.title}</Heading>
                <Author>
                  <hr />
                  {this.state.data.author_name}
                </Author>
              </TitleWrapper>
              <PlayWrapper
                primary={this.props.primary}
                secondary={this.props.secondary}
              >
                <Img src={PlayIcon} onClick={this.handlePlay} />
              </PlayWrapper>
              <CardFooter>
                Inspired {this.props.inspCount ? this.props.inspCount : "-"}{" "}
                students today.
                <Icons>
                  <Icon>
                    <Img src={ShareIcon} h="100" />
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
