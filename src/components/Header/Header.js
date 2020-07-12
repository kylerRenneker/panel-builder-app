import React from "react";
import styled from "styled-components";
import backArrow from "./back.svg";
import "./_header.scss";

const Nav = styled.nav`
  position: fixed;
  position: fixed;
  width: 100%;
  padding: 20px;
  background-color: whitesmoke;
  box-shadow: 0px 5px 15px #929292;
`;

export default function Header() {
  return (
    <Nav>
      <a href="http://www.millermarinefl.com" className="millerMarineLink">
        <div className="arrow-container">
          <img src={backArrow} alt="back arrow" />
        </div>
        Miller Marine
      </a>
    </Nav>
  );
}
