import React, { useContext, useEffect, useState } from "react";
import PanelContext from "../../contexts/PanelContext";
import { Item } from "../PanelItem/PanelItem";
import styled from "styled-components";
import { ItemStore } from "../../assets/ITEMSTORE";

const ItemImg = styled.img`
  height: ${p => {
    return `${p.height}`;
  }} !important;
  pointer-events: none;
`;

export default function RenderItems() {
  const [updateItems, setUpdateItems] = useState(true);
  const { panelItems, setPanelItems } = useContext(PanelContext);

  useEffect(() => {
    if (updateItems) {
      setPanelItems(ItemStore);
      setUpdateItems(false);
    }
  });

  console.log(panelItems);

  const itemList = panelItems.map(item => {
    return (
      <Item
        id={item.id}
        key={item.id}
        className="item"
        draggable="true"
        updateItems={setUpdateItems}
      >
        <ItemImg src={item.src} height={item.height}></ItemImg>
      </Item>
    );
  });

  return itemList;
}
