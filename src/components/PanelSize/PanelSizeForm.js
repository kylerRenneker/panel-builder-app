import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'

function PanelSizeForm(props) {
    const [error, setError] = useState(null)

    const handlePanelSizeSubmit = (ev) => {
        ev.preventDefault()
        setError(null)
        const { panel_length, panel_width } = ev.target
        const { history } = props

        if (panel_length.value < 5 || panel_length.value > 19.5) {
            setError('Length must be between 5 and 19.5 inches')
        } else if (panel_width.value < 4 || panel_width.value > 11) {
            setError('Width muse be between 4 and 11 inches')
        } else (
            history.push('/ColorPicker')
        )
    }

    return (
        <form onSubmit={handlePanelSizeSubmit}>
            {error ? <p>{error}</p> : null}
            <label htmlFor='length_input'>Input Panel Length: </label>
            <input id='length_input' name='panel_length' type='number' />

            <label htmlFor='width_input'>Input Panel Width: </label>
            <input id='width_input' name='panel_width' type='number'></input>

            <button type='submit'>Next</button>
        </form>
    )
}

export default withRouter(PanelSizeForm)