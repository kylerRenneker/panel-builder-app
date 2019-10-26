import React, { useContext } from 'react'
import styled from 'styled-components'
import PanelContext from '../../contexts/PanelContext'
import PanelOptions from '../PanelOptions/PanelOptions'

const Panel = styled.div`
    display: ${p => p.show ? null : `none`};
    background-color: ${p => p.color};
    width: 600px;
    height: 200px;
    width: 600px;
    height: 200px;
    margin: 50px auto;
    box-shadow: 0px 15px 25px #505050;
`

const PanelSection = styled.section`
    display: ${p => p.show ? null : `none`};
    grid-area: panel;
`



export default function PanelMain() {
    const { showPanel, panelColor } = useContext(PanelContext)
    return (
        <PanelSection show={showPanel}>

            <PanelOptions></PanelOptions>
            <Panel show={showPanel} color={panelColor}></Panel>


        </PanelSection>
    )
}