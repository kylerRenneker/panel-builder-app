import React, { useContext } from 'react'
import Header from '../Header/Header'
import ColorPickerForm from '../ColorPickerForm/ColorPickerForm'
import PanelSizeForm from '../PanelSizeForm/PanelSizeForm'
import PanelMain from '../PanelMain/PanelMain'
import PanelContext from '../../contexts/PanelContext'
import styled, { css } from 'styled-components'

const Main = styled.main`
  max-width: 1200px;
  height: 100vh;
  margin: auto;
  padding: 20px;
  position: relative;
`

const PanelContainer = styled.div`
  width: 65%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${props => (props.background ? 'grey' : null)};
  display: grid;
  grid-template-columns: 1fr 2fr 2fr;
  grid-template-rows: auto;
  ${props => changeLayout(props)}
  
`

function changeLayout(props) {
  const { panel } = props
  if (panel.showSizeForm) {
    return css`
      grid-template-areas:
        "size size size"
        "size size size"
        "size size size";
    `
  } else {
    return css`
      grid-template-areas:
      "size color color"
      "size color color"
      "size color color";
  `
  }
}

function App() {
  const panel = useContext(PanelContext)

  return (
    <Main>
      <Header />
      <PanelContainer panel={panel}>
        <PanelSizeForm />
        <ColorPickerForm />
        <PanelMain />
      </PanelContainer>

    </Main>
  );
}

export default App;
