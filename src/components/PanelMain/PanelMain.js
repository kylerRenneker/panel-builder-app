import React, { useContext } from 'react'
import styled from 'styled-components'
import PanelContext from '../../contexts/PanelContext'

const Panel = styled.div`
    display: ${p => p.showPanel ? null : `none`};
    background-color: ${p => p.color};
    width: 600px;
    height: 200px;
    grid-area: panel;
    margin: auto;
`

export default function PanelMain() {
    const panel = useContext(PanelContext)
    return (
        <Panel showPanel={panel.showPanel} color={panel.panelColor}>

        </Panel>
    )
}