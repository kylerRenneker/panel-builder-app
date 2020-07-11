import React, { useContext, useEffect } from "react";
import styled, { css } from "styled-components";
import PanelContext from "../../contexts/PanelContext";
import { Error } from "../Error/Error";

const SizeForm = styled.form`
  display: flex;
  flex-direction: column;
  grid-area: size;
  margin-bottom: 20px;
`;

const Label = styled.label`
  margin-bottom: 10px;
  font-size: 1.4rem;
`;

const Input = styled.input`
  border-radius: 3px;
  border: 1px solid #d6d6d6;
  height: 2rem;
  margin-bottom: 10px;
  font-size: 1.4rem;
  padding: 5px;
`;

const Select = styled.select`
  border-radius: 3px;
  border: 1px solid #d6d6d6;
  height: 2rem;
  margin-bottom: 10px;
  font-size: 1.2rem;
  padding: 5px;
`;

const Button = styled.button`
  width: 100px;
  height: 32px;
  border-radius: 5px;
  background-color: #373f51;
  border: 2px solid #11b5f6;
  box-shadow: 1px 5px 5px #b7b7b7;
  font-size: 1rem;
  color: #11b5f6;
  margin: 0 auto;
  font-weight: 600;
  :hover {
    box-shadow: none;
    transition: 0.5s;
  }
`;

function PanelSizeForm(props) {
  const panel = useContext(PanelContext);

  useEffect(() => {
    console.log("panelSize rendered");
    panel.clearError(null);
    panel.setShowSizeForm(true);
  }, []);

  const handlePanelSizeSubmit = (ev) => {
    ev.preventDefault();

    const { length, width, num_of_rows } = ev.target;

    if (length.value < 5 || length.value > 19.5) {
      panel.setError("Length must be between 5 and 19.5 inches");
    } else if (width.value < 4 || width.value > 11) {
      panel.setError("Width must be between 4 and 11 inches");
    } else {
      panel.clearError(null);
      panel.setShowSizeForm(false);
      panel.setShowColorPicker(true);

      panel.setPanelRows(num_of_rows.value);

      sessionStorage.setItem("length", length.value);
      sessionStorage.setItem("width", width.value);
      sessionStorage.setItem("panel_rows", num_of_rows.value);
    }
  };

  const setRows = (e) => {
    panel.setPanelRows(e.target.value);
    sessionStorage.setItem("panel_rows", e.target.value);
  };

  const handleSizeChange = (e) => {
    const target = e.target;
    const name = target.name;

    if (name == "length") {
      panel.setPanelSize(e);
    } else if (name == "width") {
      panel.setPanelSize(e);
    }

    console.log(panel.panelSize);
  };

  return (
    <SizeForm
      onSubmit={handlePanelSizeSubmit}
      showSizeForm={panel.showSizeForm}
    >
      {panel.error ? <Error>{panel.error}</Error> : null}
      <Label htmlFor="length_input">Input Panel Length: </Label>
      <Input
        onChange={handleSizeChange}
        id="length_input"
        name="length"
        type="number"
      />

      <Label htmlFor="width_input">Input Panel Width: </Label>
      <Input
        onChange={handleSizeChange}
        id="width_input"
        name="width"
        type="number"
      />

      <Label htmlFor="num_of_rows">Number of rows: </Label>
      <Select id="num_of_rows" onChange={setRows}>
        <option value="1">1</option>
        <option value="2">2</option>
      </Select>

      <Button type="submit">Next</Button>
    </SizeForm>
  );
}

export default PanelSizeForm;
