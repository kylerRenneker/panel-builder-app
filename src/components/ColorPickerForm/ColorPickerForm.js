import React, { useContext } from 'react'
import styled from 'styled-components'
import PanelContext from '../../contexts/PanelContext'
import { List } from '../List/List'

const ColorForm = styled.form`
    grid-area: color;
    ${p => panelColorDisplay(p)}
    flex-direction: column;
    grid-area: color;
    justify-self: center;
`
const ColorList = styled(List)`
    display: flex;
    flex-direction: column;
    align-self: center;
    padding: 0;
`
const ColorSquare = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 5px;
    margin-right: 10px;
`
const WhiteSquare = styled(ColorSquare)`
    background-color: #ffffff;
`
const GreySquare = styled(ColorSquare)`
    background-color: #2C3539;
`
const BlackSquare = styled(ColorSquare)`
    background-color: black;
`
const ListItem = styled.li`
    display: flex;
    align-items: center;
    margin: 10px;
    border: 2px solid #00d4ff;
    padding: 7px;
    border-radius: 5px;
    cursor: pointer;
    :hover {
        border: 2px solid #373F51;
    }
    ${p => (p.color === p.panel.panelColor) ? `border: 2px solid #373F51;` : null}
`
const Title = styled.h3`
    text-align: center;
    margin: 0;
`
const ColorName = styled.span`
    margin: auto;
`

const panelColorDisplay = (props) => {
    const { panel } = props

    if (panel.showColorPicker) {
        return `display: flex;`
    } else if (panel.showPanel) {
        return `display: flex;`
    } else {
        return `display: none;`
    }
}

export default function ColorPickerForm() {
    const panel = useContext(PanelContext)

    const chooseColor = (e) => {
        panel.setPanelColor(e)
        sessionStorage.setItem('panel_color', e)
        panel.setShowPanel(true)
        panel.setShowColorPicker(false)
    }

    return (
        <ColorForm panel={panel}>
            <Title>Pick A Color:</Title>
            <ColorList>
                <ListItem color={'#ffffff'} panel={panel} onClick={chooseColor.bind(this, '#ffffff')}>
                    <WhiteSquare></WhiteSquare>
                    <ColorName>White</ColorName>
                </ListItem>
                <ListItem color={'#2C3539'} panel={panel} onClick={chooseColor.bind(this, '#2C3539')}>
                    <GreySquare></GreySquare>
                    <ColorName>Gunmetal Grey</ColorName>
                </ListItem>
                <ListItem color={'black'} panel={panel} onClick={chooseColor.bind(this, 'black')}>
                    <BlackSquare></BlackSquare>
                    <ColorName>Black</ColorName>
                </ListItem>
                {/* Tortoise Shell would go here... */}
                {/* <ListItem>
                    <div></div>
                    <ColorName></ColorName>
                </ListItem> */}
            </ColorList>
        </ColorForm>
    )
}