import React from 'react'
import Header from '../Header/Header'
import ColorPickerForm from '../ColorPickerForm/ColorPickerForm'
import PanelSizeForm from '../PanelSizeForm/PanelSizeForm'
import PanelMain from '../PanelMain/PanelMain'
import styled, { css } from 'styled-components'

const Main = styled.main`
  max-width: 1200px;
  height: 100vh;
  margin: auto;
  padding: 20px;
  position: relative;
`

const PanelContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${props => (props.background ? 'grey' : null)}
  width: 1200px;
  display: grid;
  grid-template-columns: 25% 25% 50%;
  grid-template-rows: auto;
  grid-template-areas: 
    "size size size"
    "size size size"
    "size size size";
`

function App() {
  return (
    <Main>
      <Header />

      <PanelContainer>
        <PanelSizeForm />
        <ColorPickerForm />
        <PanelMain />
      </PanelContainer>

    </Main>
  );
}

export default App;
