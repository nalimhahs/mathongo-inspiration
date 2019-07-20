import React, { Component } from "react";
import styled from "styled-components";

import logo from "../assets/images/logo-dark.svg";
import bell from "../assets/images/bell.svg";

const Nav = styled.nav`
  -webkit-box-shadow: 0px 2px 20px 0px rgba(140, 140, 140, .2);
  -moz-box-shadow: 0px 2px 20px 0px rgba(140, 140, 140, .2);
  box-shadow: 0px 2px 20px 0px rgba(140, 140, 140, .2);
`;

const Img = styled.img`
  height: 45px;
`
const Bell = styled.img`
  height: 40px;
  margin-right: 1.75rem;
  margin-top: 2px;
  filter: drop-shadow( 1px 1px 2px rgba(150, 150, 150, .5));  
`

export default class Navbar extends Component {
  render() {
    return (
      <div>
        <Nav
          className="navbar is-spaced"
          role="navigation"
          aria-label="main navigation"
        >
          <div className="navbar-brand">
            <a className="navbar-item" href="localhost:3000">
              <Img src={logo} alt="Logo" />
            </a>
          </div>
          <div className="navbar-end ">
            <div className="navbar-item">
              <Bell src={bell} alt="Enable notification" />
            </div>
          </div>
        </Nav>
      </div>
    );
  }
}
