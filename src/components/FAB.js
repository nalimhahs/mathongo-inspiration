// Floating Action Button

import React, { Component } from 'react'
import styled from 'styled-components'
import mail from "../assets/images/mail.svg"

const FABWrapper = styled.div`
  position: absolute;
  bottom: 15%;
  right: 7%;
  background:linear-gradient(
    75deg,
    rgba(21, 137, 238, 1) 0%,
    rgba(0, 212, 255, 1) 100%
  );
  width:70px;
  height:70px;
  border-radius:100%;
  color:#FFF;
  font-size:36px;
  box-shadow: 2px 3px 15px rgba(0,0,0,0.26), 0 3px 6px rgba(0,0,0,0.23);
  transition:.3s;  
  /* -webkit-tap-highlight-color: rgba(0,0,0,0); */
  display: flex;
  justify-content: center;
  align-items: center;
  :hover {
    transform: scale(1.2);
  }
`

const Message = styled.div`
  position: absolute;
  width: 190px;
  height: 110px;
  bottom: 27%;
  right: 7%;
  border-radius: 15px;
  box-shadow: 2px 3px 15px rgba(0,0,0,0.26), 0 3px 6px rgba(0,0,0,0.23);
  /* transform: translate(-200px, 35px); */
  z-index: 10;
  padding: 1rem;
  font-size: 15px;
  padding-left: 1.15rem;
  display: flex;
  align-items: center;
`
const Img = styled.img`
  height: 55%;
`

export default class FAB extends Component {
  render() {
    return (
      <div>
        <FABWrapper>
          <Img src={mail}/>
        </FABWrapper>
        {/* <Message>
          Drop in your mail to get the best delivered to your inbox daily.
        </Message> */}
      </div>
    )
  }
}
