import React, { useState } from "react";

const PanelContext = React.createContext({});

export default PanelContext;

export const PanelProvider = props => {
  const [error, setError] = useState(null);
  const [showSizeForm, setShowSizeForm] = useState(null);
  const [showColorPicker, setShowColorPicker] = useState(null);
  const [showPanel, setShowPanel] = useState(null);
  const [panelColor, setPanelColor] = useState(null);
  const [panelSize, setPanelSize] = useState({
    width: null,
    length: null
  });
  const [panelRows, setPanelRows] = useState(null);
  const [panelItems, setPanelItems] = useState([]);
  const [updateItems, setUpdateItems] = useState(false);

  const setUpdateItemsFn = bool => {
    setUpdateItems(bool);
  };

  const setPanelItemsFn = items => {
    setPanelItems(items);
  };

  const setPanelSizeFn = e => {
    setPanelSize({
      ...panelSize,
      [e.target.name]: e.target.value
    });
  };

  const setPanelRowsFn = num => {
    setPanelRows(num);
  };

  const setErrorFn = error => {
    setError(error);
  };

  const clearError = () => {
    setError(null);
  };

  const setShowSizeFormFn = bool => {
    setShowSizeForm(bool);
  };

  const setShowColorPickerFn = bool => {
    setShowColorPicker(bool);
  };

  const setShowPanelFn = bool => {
    setShowPanel(bool);
  };

  const setPanelColorFn = color => {
    setPanelColor(color);
  };

  const value = {
    error: error,
    setError: setErrorFn,
    clearError: clearError,
    showSizeForm: showSizeForm,
    setShowSizeForm: setShowSizeFormFn,
    showColorPicker: showColorPicker,
    setShowColorPicker: setShowColorPickerFn,
    showPanel: showPanel,
    setShowPanel: setShowPanelFn,
    panelColor: panelColor,
    setPanelColor: setPanelColorFn,
    panelSize: panelSize,
    setPanelSize: setPanelSizeFn,
    panelRows: panelRows,
    setPanelRows: setPanelRowsFn,
    panelItems: panelItems,
    setPanelItems: setPanelItemsFn,
    updateItems: updateItems,
    setUpdateItems: setUpdateItemsFn
  };

  return (
    <PanelContext.Provider value={value}>
      {props.children}
    </PanelContext.Provider>
  );
};
