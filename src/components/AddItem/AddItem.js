import React, { useContext } from "react";
import styled from "styled-components";
import { ItemStore } from "../../assets/ITEMSTORE";
import { generateRandId } from "../../helpers/helpers";
import PanelContext from "../../contexts/PanelContext";

const AddBtn = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #4caf50;
  position: absolute;
  top: 0px;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;

  &:hover {
    background-color: #3dd23d;
  }

  &:before {
    content: "+";
    left: 5px;
    bottom: 2px;
    color: white;
    position: relative;
  }
`;

export default function AddItem(props) {
  const handleAddItem = () => {
    const item = document.getElementById(props.itemId);
    const styles = getComputedStyle(item.children[1]);

    ItemStore.push({
      id: generateRandId(),
      src: item.children[1].src,
      key: item.id,
      height: styles.height
    });
    props.updateItems(true);
  };

  return <AddBtn onClick={handleAddItem} />;
}
