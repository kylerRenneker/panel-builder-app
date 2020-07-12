import React, { useContext, useState, useEffect, Fragment } from "react";
import styled from "styled-components";
import PanelContext from "../../contexts/PanelContext";
import PanelRow from "../PanelRow/PanelRow";
import PanelItems from "../PanelItems/PanelItems";
import "./_rangSlider.scss";
import Modal from "../Modal/Modal";

const Panel = styled.div`
  display: ${(p) => (p.show ? null : `none`)};
  background-color: ${(p) => p.color};
  ${(p) => {
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
  ${(p) => (p.rows == 1 ? "justify-content: center" : null)}
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

const PanelSection = styled.section`
  display: ${(p) => (p.show ? `flex` : `none`)};
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
  border: ${(p) =>
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
  border-radius: 5px;
  border: none;
  box-shadow: 1px 5px 5px #b7b7b7;
  font-size: 1rem;
  color: #ffffff;
  margin: 40px 0 20px 0;
  padding: 10px;
  font-weight: 600;
  align-self: flex-end;
  cursor: pointer;
  background-color: #11b5f6;
  transition: 0.3s;
  :hover {
    box-shadow: none;
  }

  :focus {
    outline: none;
  }
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
  const [showModal, setShowModal] = useState(false);
  const {
    showPanel,
    panelColor,
    panelRows,
    panelSize,
    setPanelRows,
  } = useContext(PanelContext);

  useEffect(() => {
    console.log("panelMain re-rendering");
  });

  const renderModal = () => {
    setShowModal(true);
  };

  // const handleAddRow = () => {
  //   const numOfRows = parseInt(panelRows) + 1;
  //   setPanelRows(numOfRows);
  // };

  // const handleDeleteRow = (e) => {
  //   console.log(e, currentRow);
  //   document.getElementById(currentRow).remove();
  //   const numOfRows = parseInt(panelRows) - 1;
  //   setPanelRows(numOfRows);
  //   setCurrentRow(numOfRows);
  //   console.log(typeof panelRows);
  // };

  const handleSelectedRow = (e) => {
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

  const handleInputChange = (event) => {
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
    <Fragment>
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
        <div>
          <Panel
            show={showPanel}
            size={panelSize}
            rows={panelRows}
            color={panelColor}
            id="panel"
          >
            {renderRows()}
          </Panel>
          {/* <button className="btn btn-addRow" onClick={handleAddRow}>
          ADD ROW
        </button>
        <button className="btn btn-delRow" onClick={(e) => handleDeleteRow(e)}>
          DELETE ROW
        </button> */}
        </div>

        <SubmitButton onClick={renderModal}>FREE Quote Request</SubmitButton>
      </PanelSection>
      {showModal ? <Modal setShow={setShowModal} /> : null}
    </Fragment>
  );
}
