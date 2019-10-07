import React, { useState, useContext, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import styled, { css } from 'styled-components'
import PanelContext from '../../contexts/PanelContext'

const Form = styled.form`
    font-size: 1.4rem;
    display: flex;
    flex-direction: column;
    grid-area: size;
    ${p => p.showSizeForm ? null : css`display: none;`}
`

const Label = styled.label`
    margin-bottom: 10px;
`

const Input = styled.input`
    border-radius: 3px;
    border: 1px solid #d6d6d6;
    height: 1.5rem;
    margin-bottom: 10px;
`

const Button = styled.button`
    width: 100px;
    margin: auto;
    height: 32px;
    border-radius: 20px;
    background-color: #00b4ff;
    border: none;
    box-shadow: 1px 5px 5px #dedede;
    font-size: 1.2rem;

    :hover {
        box-shadow: none;
        transition: 0.5s;
    }
`

function PanelSizeForm(props) {
    const panel = useContext(PanelContext)

    useEffect(() => {
        panel.clearError(null)
        panel.setShowSizeForm(true)
    }, [])

    const handlePanelSizeSubmit = (ev) => {
        ev.preventDefault()

        const { panel_length, panel_width } = ev.target

        if (panel_length.value < 5 || panel_length.value > 19.5) {
            panel.setError('Length must be between 5 and 19.5 inches')
        } else if (panel_width.value < 4 || panel_width.value > 11) {
            panel.setError('Width muse be between 4 and 11 inches')
        } else {
            panel.setShowSizeForm(false)
            panel.setShowColorPicker(true)

            sessionStorage.setItem('panel_length', panel_length.value)
            sessionStorage.setItem('panel_width', panel_width.value)
        }
    }



    return (
        <Form onSubmit={handlePanelSizeSubmit} showSizeForm={panel.showSizeForm}>
            {panel.error ? <p>{panel.error}</p> : null}
            <Label htmlFor='length_input'>Input Panel Length: </Label>
            <Input id='length_input' name='panel_length' type='number' />

            <Label htmlFor='width_input'>Input Panel Width: </Label>
            <Input id='width_input' name='panel_width' type='number' />

            <Button type='submit'>Next</Button>
        </Form>
    )
}

export default withRouter(PanelSizeForm)