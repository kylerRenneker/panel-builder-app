import React from "react";
import styled from "styled-components";

export default function PanelItem(props) {
  const dragStart = e => {
    const target = e.target;

    e.dataTransfer.setData("item_id", target.id);

    setTimeout(() => {
      target.style.display = "none";
    }, 0);
  };

  const dragOver = e => {
    e.stopPropagation();
  };

  return (
    <div
      id={props.id}
      className={props.className}
      draggable={props.draggable}
      onDragStart={dragStart}
      onDragOver={dragOver}
    >
      {props.children}
    </div>
  );
}
