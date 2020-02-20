import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import PanelContext from "../../contexts/PanelContext";
import PanelRow from "../PanelRow/PanelRow";
import html2canvas from "html2canvas";
import PanelItems from "../PanelItems/PanelItems";
import "./_rangSlider.scss";

const Panel = styled.div`
  display: ${p => (p.show ? null : `none`)};
  background-color: ${p => p.color};
  ${p => {
    const width = p.size.width;
    const length = p.size.length;

    return `min-width: ${length * 42}px;
        min-height: ${width * 42}px;
        max-width: ${length * 42}px;
        max-height: ${width * 42}px;
        width: ${length * 42}px;
        height: ${width * 42}px;
      `;
  }}
  margin: auto;
  box-shadow: 0px 15px 25px #505050;
  display: flex;
  flex-direction: column;
  ${p => (p.rows == 1 ? "justify-content: center" : null)}
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

const PanelSection = styled.section`
  display: ${p => (p.show ? `flex` : `none`)};
  grid-area: panel;
  flex-direction: column;
`;

const ItemOptions = styled(PanelRow)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  border: 3px dotted;
  margin: 20px;
  width: calc(100% - 40px);
  height: 50%;
  padding: 20px;
`;

const ItemRows = styled(PanelRow)`
  width: 100%;
  min-height: 25%;
  padding-top: 4px;
  align-items: center;
  display: flex;
  border: ${p =>
    p.id === p.row ? "3px solid rgba(68, 156, 238, 0.699)" : "1px dashed grey"};
  &:nth-of-type(1) {
    margin-bottom: 10px;
  }
  div {
    padding: 0;
    div {
      display: none;
    }
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
  const [spacing, setSpacing] = useState(1);
  const [currentRow, setCurrentRow] = useState("row-0");
  const [rowConfigs, setRowConfigs] = useState([1]);
  const [rowIdNumner, setRowIdNumber] = useState(0);
  const { showPanel, panelColor, panelRows, panelSize } = useContext(
    PanelContext
  );

  useEffect(() => {});

  const submitPanel = e => {
    e.preventDefault();

    html2canvas(document.querySelector("#panel")).then(canvas => {
      const data = {
        email: "Krenneker16@gmail.com",
        title: "panelTest",
        message: "This is a test for the panel builder app",
        image: canvas.toDataURL("image/png")
      };

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

  const handleSelectedRow = e => {
    const target = e.target;
    const id = target.id;

    if (currentRow !== target.id) {
      document.getElementById(currentRow).classList.remove("active");
      document.getElementById(target.id).classList.add("active");
      setCurrentRow(target.id);
      let rowId = id.toString().split("row-");
      setRowIdNumber(rowId[1]);
      return rowConfigs[rowId[1]] ? null : setRowConfigs([...rowConfigs, 1]);
    }
  };

  const renderRows = () => {
    const rows = [];
    for (let i = 0; i < panelRows; i++) {
      rows.push(
        <ItemRows
          spacing={spacing}
          id={"row-" + i}
          className="item-section"
          selectedRow={handleSelectedRow}
          row={currentRow}
          rowNum={rowIdNumner}
        ></ItemRows>
      );
    }
    return rows;
  };

  const handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    let newConfigs = rowConfigs;

    for (let i = 0; i < rowConfigs.length; i++) {
      if (rowIdNumner == i) {
        newConfigs[i] = value;
      }
    }

    setRowConfigs(newConfigs);

    if (value == 1) {
      document.getElementById(`row-${rowIdNumner}`).style.justifyContent =
        "start";
    } else if (value == 2) {
      document.getElementById(`row-${rowIdNumner}`).style.justifyContent =
        "space-evenly";
    } else if (value == 3) {
      document.getElementById(`row-${rowIdNumner}`).style.justifyContent =
        "space-around";
    } else if (value == 4) {
      document.getElementById(`row-${rowIdNumner}`).style.justifyContent =
        "space-between";
    } else if (value == 5) {
      document.getElementById(`row-${rowIdNumner}`).style.justifyContent =
        "center";
    } else if (value == 6) {
      document.getElementById(`row-${rowIdNumner}`).style.justifyContent =
        "flex-end";
    }

    setSpacing(parseInt(value));
  };

  return (
    <PanelSection show={showPanel}>
      <ItemOptions id="items-container-1" className="item-section">
        <PanelItems />
      </ItemOptions>
      <div className="panel-controls">
        <div className="slide-container">
          <label htmlFor="myRange">Spacing</label>
          <input
            type="range"
            min="1"
            max="6"
            defaultValue="1"
            className="slider"
            id="myRange"
            onChange={handleInputChange}
          ></input>
        </div>
      </div>
      <Panel
        show={showPanel}
        size={panelSize}
        rows={panelRows}
        color={panelColor}
        id="panel"
      >
        {renderRows()}
      </Panel>
      <SubmitButton onClick={submitPanel}>Get Quote Request</SubmitButton>
    </PanelSection>
  );
}
