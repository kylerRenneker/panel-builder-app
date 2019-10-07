import React, { useState } from 'react'

const PanelContext = React.createContext({})

export default PanelContext

export const PanelProvider = (props) => {
    const [error, setError] = useState(null)
    const [showSizeForm, setShowSizeForm] = useState(null)
    const [showColorPicker, setShowColorPicker] = useState(null)
    const [showPanel, setShowPanel] = useState(null)

    const setErrorFn = error => {
        setError(error)
    }

    const clearError = () => {
        setError(null)
    }

    const setShowSizeFormFn = (bool) => {
        setShowSizeForm(bool)
    }

    const setShowColorPickerFn = (bool) => {
        setShowColorPicker(bool)
    }

    const setShowPanelFn = (bool) => {
        setShowPanel(bool)
    }

    const value = {
        error: error,
        setError: setErrorFn,
        clearError: clearError,
        showSizeForm: showSizeForm,
        setShowSizeForm: setShowSizeFormFn,
        showColorPicker: showColorPicker,
        setShowColorPicker: setShowColorPickerFn,
        showPanel: showPanel,
        setShowPanel: setShowPanelFn
    }

    return (
        <PanelContext.Provider value={value}>
            {props.children}
        </PanelContext.Provider>
    )
}