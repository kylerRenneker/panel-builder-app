import React, { useContext } from "react";
import styled from "styled-components";
import PanelContext from "../../contexts/PanelContext";
import PanelOptions from "../PanelOptions/PanelOptions";
import PanelRow from "../PanelRow/PanelRow";
import PanelItem from "../PanelItem/PanelItem";

import rocker_switch from "../../assets/rocker_switch.png";
import hole1 from "../../assets/hole2_1_8.png";
import hole2 from "../../assets/hole_3_3_8.png";

import html2canvas from "html2canvas";

const Panel = styled.div`
  display: ${p => (p.show ? null : `none`)};
  background-color: ${p => p.color};
  width: 600px;
  height: 200px;
  margin: auto;
  box-shadow: 0px 15px 25px #505050;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
`;

const PanelSection = styled.section`
  display: ${p => (p.show ? `flex` : `none`)};
  grid-area: panel;
  flex-direction: column;
`;

const Item = styled(PanelItem)`
  display: inline-block;
  margin: auto 15px;
  cursor: grab;
`;

const ItemImg = styled.img`
  height: 60px;
  pointer-events: none;
`;

const ItemOptions = styled(PanelRow)`
  border: 3px dotted;
  margin: 20px;
  width: calc(100% - 40px);
  height: 50%;
  padding: 20px;
`;

const ItemRows = styled(PanelRow)`
  width: 100%;
  height: 50%;
  display: flex;
`;

const SubmitButton = styled.button`
  width: 180px;
  height: 32px;
  border-radius: 5px;
  border: 2px solid #11b5f6;
  box-shadow: 1px 5px 5px #b7b7b7;
  font-size: 1rem;
  color: #11b5f6;
  margin: 20px 0px;
  padding: 5px;
  font-weight: 600;
  align-self: flex-end;
  cursor: pointer;
`;

export default function PanelMain() {
  const { showPanel, panelColor } = useContext(PanelContext);

  const submitPanel = e => {
    e.preventDefault();

    html2canvas(document.querySelector("#panel")).then(canvas => {
      const image = canvas.toDataURL("image/png");
    });
  };

  return (
    <PanelSection show={showPanel}>
      {/* <PanelOptions></PanelOptions>
      <Panel show={showPanel} color={panelColor}></Panel> */}

      <ItemOptions id="items-container-1" className="item-section">
        <Item id="item-1" className="item" draggable="true">
          <ItemImg src={rocker_switch}></ItemImg>
        </Item>
      </ItemOptions>
      <Panel show={showPanel} color={panelColor} id="panel">
        <ItemRows id="items-container-2" className="item-section">
          <Item id="item-2" className="item" draggable="true">
            <ItemImg src={hole1}></ItemImg>
          </Item>
        </ItemRows>
        <ItemRows id="items-container-3" className="item-section">
          <Item id="item-3" className="item" draggable="true">
            <ItemImg src={hole2}></ItemImg>
          </Item>
        </ItemRows>
      </Panel>
      <SubmitButton onClick={submitPanel}>Get Quote Request</SubmitButton>
    </PanelSection>
  );
}
