import React, { useContext } from 'react'
import styled from 'styled-components'
import { List } from '../List/List'
import rocker_switch from '../../assets/rocker_switch.png'
import hole1 from '../../assets/hole2_1_8.png'
import hole2 from '../../assets/hole_3_3_8.png'
import PanelContext from '../../contexts/PanelContext'
import Draggable from 'react-draggable'

const OptionList = styled(List)`
    height: 200px;
    padding: 0px 50px;
`

const PanelItem = styled.li`
    display: inline-block;
    margin: auto 15px;
`
const ItemImg = styled.img`
    height: 60px;
    pointer-events: none;
`

const Hole2 = styled(ItemImg)`
    height: 80px;
`

const renderOptionList = (show) => {
    if (show) {
        return (
            <OptionList>
                <Draggable>
                    <PanelItem>
                        <ItemImg src={rocker_switch}></ItemImg>
                    </PanelItem>
                </Draggable>
                <Draggable>
                    <PanelItem>
                        <ItemImg src={hole1}></ItemImg>
                    </PanelItem>
                </Draggable><Draggable>
                    <PanelItem>
                        <Hole2 src={hole2}></Hole2>
                    </PanelItem>
                </Draggable><Draggable>
                    <PanelItem>
                        <ItemImg src={rocker_switch}></ItemImg>
                    </PanelItem>
                </Draggable><Draggable>
                    <PanelItem>
                        <ItemImg src={rocker_switch}></ItemImg>
                    </PanelItem>
                </Draggable>
            </OptionList>
        )
    }
}

export default function PanelOptions() {
    const { showPanel } = useContext(PanelContext)

    return (
        <OptionList>
            {renderOptionList(showPanel)}
        </OptionList>
    )
}