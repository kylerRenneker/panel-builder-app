import React, { useContext, useEffect, useState } from "react";
import Header from "../Header/Header";
import ColorPickerForm from "../ColorPickerForm/ColorPickerForm";
import PanelSizeForm from "../PanelSizeForm/PanelSizeForm";
import PanelMain from "../PanelMain/PanelMain";
import PanelContext from "../../contexts/PanelContext";
import styled, { css } from "styled-components";

const Main = styled.main`
  max-width: 1300px;
  height: 100vh;
  margin: auto;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PanelContainer = styled.div`
  background-color: ${(props) => (props.background ? "grey" : null)};
  display: grid;
  grid-template-columns: 1fr 2fr 2fr;
  grid-template-rows: auto;
  ${(props) => changeLayout(props)}
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 80px #404040;
  background-color: whitesmoke;
`;

function changeLayout(props) {
  const { panel } = props;
  if (panel.showSizeForm) {
    return css`
      grid-template-areas:
        "size size size"
        "size size size"
        "size size size";
    `;
  } else if (panel.showColorPicker) {
    return css`
      grid-template-areas:
        "size color color"
        "size color color"
        "size color color";
    `;
  } else {
    return css`
      grid-template-areas:
        "size panel panel"
        "color panel panel";
    `;
  }
}

function App() {
  const panel = useContext(PanelContext);
  console.log("entire app rerender");

  useEffect(() => {
    console.log(panel);
  });

  return (
    <>
      <Header />
      <Main>
        <PanelContainer panel={panel}>
          <PanelSizeForm />
          <ColorPickerForm />
          <PanelMain />
        </PanelContainer>
      </Main>
    </>
  );
}

export default App;
