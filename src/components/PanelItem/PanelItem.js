import React, { useContext } from "react";
import styled from "styled-components";
import { useId } from "react-id-generator";
import { ItemStore } from "../../assets/ITEMSTORE";
import PanelContext from "../../contexts/PanelContext";

export default function PanelItem(props) {
  const [randId] = useId();
  const { panelItems, setPanelItems, updatePanel, setUpdatePanel } = useContext(
    PanelContext
  );

  const dragStart = e => {
    const target = e.target;
    console.log("drag starting");
    e.dataTransfer.setData("item_id", target.id);

    setTimeout(() => {
      target.style.display = "none";
    }, 0);
    setTimeout(() => {
      console.log(ItemStore);
    }, 2000);

    const item = document.getElementById(target.id);
    const clone = item.cloneNode(true);
    clone.id = randId;

    ItemStore.push({
      id: clone.id,
      src: clone.children[0].src,
      key: randId
    });

    setPanelItems(ItemStore);
    setUpdatePanel(true);
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
