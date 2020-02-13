import React from "react";

function PanelRow(props) {
  const drop = e => {
    e.preventDefault();

    console.log(e.target);

    const item_id = e.dataTransfer.getData("item_id");

    const item = document.getElementById(item_id);

    console.log(item);
    if (item) {
      item.style.display = "inline-block";
      e.target.appendChild(item);
    }
  };

  const dragOver = e => {
    e.preventDefault();
  };

  return (
    <div
      id={props.id}
      className={props.className}
      onDrop={drop}
      onDragOver={dragOver}
    >
      {props.children}
    </div>
  );
}

export default PanelRow;
