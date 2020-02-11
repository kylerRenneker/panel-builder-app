import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import PanelContext from "../../contexts/PanelContext";
import PanelRow from "../PanelRow/PanelRow";
import PanelItem from "../PanelItem/PanelItem";
import html2canvas from "html2canvas";
import { ItemStore } from "../../assets/ITEMSTORE";

const Panel = styled.div`
  display: ${p => (p.show ? null : `none`)};
  background-color: ${p => p.color};
  width: 600px;
  height: 200px;
  margin: auto;
  box-shadow: 0px 15px 25px #505050;
  display: flex;
  flex-direction: column;
  ${p => (p.rows == 1 ? "justify-content: center" : null)}
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
  ${p => (p.spaceBetween ? `justify-content: space-between;` : null)}
  border: 1px dashed grey;
  &:nth-of-type(1) {
    margin-bottom: 10px;
  }
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

const Toggle = styled.input`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 62px;
  height: 32px;
  display: inline-block;
  position: relative;
  border-radius: 50px;
  overflow: hidden;
  outline: none;
  border: none;
  cursor: pointer;
  background-color: #707070;
  transition: background-color ease 0.3s;

  &:before {
    content: "";
    display: block;
    position: absolute;
    z-index: 2;
    width: 28px;
    height: 28px;
    background: #fff;
    left: 2px;
    top: 2px;
    border-radius: 50%;
    font: 10px/28px Helvetica;
    text-transform: uppercase;
    font-weight: bold;
    text-indent: -22px;
    word-spacing: 37px;
    color: #fff;
    text-shadow: -1px -1px rgba(0, 0, 0, 0.15);
    white-space: nowrap;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    transition: all cubic-bezier(0.3, 1.5, 0.7, 1) 0.3s;
  }

  &:checked {
    background-color: #4cd964;
    &:before {
      left: 32px;
    }
  }
`;

export default function PanelMain() {
  const [spaceEvenly, setSpaceEvenly] = useState(false);
  const {
    showPanel,
    panelColor,
    panelSize,
    panelRows,
    panelItems,
    setPanelItems,
    updatePanel,
    setUpdatePanel
  } = useContext(PanelContext);

  useEffect(() => {
    // if (updatePanel) {
    setPanelItems(ItemStore);

    // }
  }, []);

  const submitPanel = e => {
    e.preventDefault();

    html2canvas(document.querySelector("#panel")).then(canvas => {
      const data = {
        email: "Krenneker16@gmail.com",
        title: "panelTest",
        message: "This is a test for the panel builder app",
        image: canvas.toDataURL("image/png")
      };

      console.log(data);

      fetch("http://localhost:8888/api/v1/contact", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }).then(res => res.json());
    });
  };

  const renderRows = () => {
    const rows = [];
    for (let i = 0; i < panelRows; i++) {
      rows.push(
        <ItemRows
          spaceBetween={spaceEvenly}
          id={"row-" + i}
          className="item-section"
        ></ItemRows>
      );
    }
    return rows;
  };

  const RenderItems = () => {
    const itemList = panelItems.map(item => {
      return (
        <Item id={item.id} key={item.id} className="item" draggable="true">
          <ItemImg src={item.src}></ItemImg>
        </Item>
      );
    });

    return itemList;
  };

  const handleInputChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setSpaceEvenly(value);
  };

  return (
    <PanelSection show={showPanel}>
      {/* <PanelOptions></PanelOptions>
      <Panel show={showPanel} color={panelColor}></Panel> */}

      <ItemOptions id="items-container-1" className="item-section">
        {updatePanel ? RenderItems() : null}
      </ItemOptions>
      <div className="panel-controls">
        <ul>
          <li>
            <label>Spave evenly</label>
            <Toggle
              class="toggle"
              type="checkbox"
              name="space-evenly"
              onChange={handleInputChange}
            />
          </li>
        </ul>
      </div>
      <Panel show={showPanel} rows={panelRows} color={panelColor} id="panel">
        {panelRows ? renderRows() : null}
      </Panel>
      <SubmitButton onClick={submitPanel}>Get Quote Request</SubmitButton>
    </PanelSection>
  );
}
