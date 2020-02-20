import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import PanelContext from "../../contexts/PanelContext";
import AddItem from "../AddItem/AddItem";

export const Item = styled(PanelItem)`
  display: inline-block;
  margin: 0px 15px;
  height: fit-content;
  cursor: grab;
  position: relative;
  padding-top: 30px;
  margin-top: 0;
`;

export default function PanelItem(props) {
  const [showAddBtn, setShowAddBtn] = useState(false);

  console.log("PanelItem rendered");

  const dragStart = e => {
    console.log("drag starting");
    const target = e.target;
    e.dataTransfer.setData("item_id", target.id);
  };

  const dragEnd = () => {
    props.updateItems(true);
  };

  const dragOver = e => {
    e.stopPropagation();
  };

  const showAddItemBtn = () => {
    setShowAddBtn(true);
  };

  const removeAddItemBtn = () => {
    setShowAddBtn(false);
  };

  return (
    <div
      id={props.id}
      className={props.className}
      draggable={props.draggable}
      onDragStart={dragStart}
      onDragOver={dragOver}
      onMouseOver={showAddItemBtn}
      onMouseLeave={removeAddItemBtn}
    >
      {showAddBtn ? (
        <AddItem itemId={props.id} updateItems={props.updateItems} />
      ) : null}
      {props.children}
    </div>
  );
}
