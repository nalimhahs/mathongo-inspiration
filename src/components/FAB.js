// Floating Action Button

import React, { Component } from 'react'
import styled from 'styled-components'

const FABWrapper = styled.div`
  position: absolute;
  bottom: 15%;
  right: 7%;
  background:linear-gradient(
    15deg,
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

  :hover {
    transform: scale(1.2);
  }
`

export default class FAB extends Component {
  render() {
    return (
      <div>
        <FABWrapper />
      </div>
    )
  }
}
