// Floating Action Button

import React, { Component } from "react";
import styled from "styled-components";
import mail from "../assets/images/mail.svg";

const FABWrapper = styled.div`
  position: absolute;
  bottom: 15%;
  right: 7%;
  background: linear-gradient(
    75deg,
    rgba(21, 137, 238, 1) 0%,
    rgba(0, 212, 255, 1) 100%
  );
  width: 70px;
  height: 70px;
  border-radius: 100%;
  color: #fff;
  font-size: 36px;
  box-shadow: 2px 3px 15px rgba(0, 0, 0, 0.26), 0 3px 6px rgba(0, 0, 0, 0.23);
  transition: 0.3s;
  /* -webkit-tap-highlight-color: rgba(0,0,0,0); */
  display: flex;
  justify-content: center;
  align-items: center;
  :hover {
    transform: scale(1.2);
  }
  cursor: pointer;
`;

const Message = styled.div`
  position: absolute;
  width: 190px;
  height: 110px;
  bottom: 28%;
  right: 7%;
  border-radius: 15px;
  box-shadow: 2px 3px 15px rgba(0, 0, 0, 0.26), 0 3px 6px rgba(0, 0, 0, 0.23);
  /* transform: translate(-200px, 35px); */
  z-index: 10;
  padding: 1rem;
  font-size: 15px;
  padding-left: 1.15rem;
  display: ${props => (props.hidden ? "none" : "flex")};
  align-items: center;
  font-family: Nunito;
  background: white;
`;

const Img = styled.img`
  height: 55%;
`;

const H1 = styled.h1`
  font-size: 2rem;
  font-weight: 800;
  font-family: Nunito;
  margin-top: 10px;
`;

export default class FAB extends Component {
  state = {
    hidden: false,
    modalEmail: "",
    isModalEmailValid: true,
    isModalActive: false
  };

  handleModalShow = () => {
    this.setState({ isModalActive: true });
  };

  handleModalClose = () => {
    this.setState({ isModalActive: false });
  };

  handleMessageHide = () => {
    this.setState({ hidden: true });
  };

  handleModalEmailSubmit = () => {
    var email = this.state.modalEmail;
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(email).toLowerCase())) {
      this.setState({ isModalEmailValid: false });
    } else {
      this.setState({ isModalEmailValid: true });
      // Handle form submit here
      this.handleModalClose();
    }
  };

  handleEnterSubmit = event => {
    var code = event.keyCode || event.which;
    if (code === 13) {
      this.handleModalEmailSubmit();
    }
  };

  render() {
    return (
      <div>
        <FABWrapper
          onClick={this.handleModalShow}
          onMouseLeave={this.handleMessageHide}
        >
          <Img src={mail} />
        </FABWrapper>
        <Message
          hidden={this.state.hidden}
          onMouseLeave={this.handleMessageHide}
        >
          Drop in your mail to get the best delivered to your inbox daily.
        </Message>
        <div className={this.state.isModalActive ? "modal is-active" : "modal"}>
          <div className="modal-background" onClick={this.handleModalClose} />
          <div className="modal-content">
            <div className="box">
              <div className="container">
                <H1>Get inspiration. Delivered!</H1>
                <hr />
                <div className="field">
                  <label className="label">Email</label>
                  <div className="control">
                    <input
                      className={
                        this.state.isModalEmailValid
                          ? "input"
                          : "input is-danger"
                      }
                      type="email"
                      placeholder="Email input"
                      onChange={e => {
                        this.setState({ modalEmail: e.target.value });
                      }}
                      value={this.state.modalEmail}
                      onKeyDown={this.handleEnterSubmit}
                    />
                  </div>
                  {this.state.isModalEmailValid ? (
                    ""
                  ) : (
                    <p className="help is-danger">This email is invalid</p>
                  )}
                </div>
                <button
                  className="button is-link"
                  aria-label="submit"
                  onClick={this.handleModalEmailSubmit}
                  style={{ marginBottom: "20px", marginTop: "10px" }}
                >
                  Sign Me Up!
                </button>
              </div>
            </div>
          </div>
          <button
            className="modal-close is-large"
            aria-label="close"
            onClick={this.handleModalClose}
          />
        </div>
      </div>
    );
  }
}
