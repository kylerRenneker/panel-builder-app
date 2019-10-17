import React, { useContext, useEffect } from 'react'
import styled, { css } from 'styled-components'
import PanelContext from '../../contexts/PanelContext'
import { List } from '../List/List'

const ColorForm = styled.form`
    grid-area: color;
    background-color: grey;
    ${p => p.showColorForm ? null : css`display: none;`}
`

const ColorSquare = styled.div`
    width: 50px;
    height: 50px;
`
const WhiteSquare = styled(ColorSquare)`
    background-color: #fffff;
`
const GreySquare = styled(ColorSquare)`
    background-color: #2C3539;
`

export default function ColorPickerForm() {
    const panel = useContext(PanelContext)



    return (
        <ColorForm showColorForm={panel.showColorPicker}>
            <List>
                <li>
                    <WhiteSquare></WhiteSquare>
                    <span></span>
                </li>
                <li>
                    <GreySquare></GreySquare>
                    <span></span>
                </li>
                <li>
                    <div></div>
                    <span></span>
                </li>
                {/* Tortoise Shell would go here... */}
                {/* <li>
                    <div></div>
                    <span></span>
                </li> */}
            </List>
        </ColorForm>
    )
}