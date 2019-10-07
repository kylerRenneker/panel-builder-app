import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from '../src/components/App/App';
import { PanelProvider } from '../src/contexts/PanelContext'

ReactDOM.render(
    <BrowserRouter>
        <PanelProvider>
            <App />
        </PanelProvider>
    </BrowserRouter>,
    document.getElementById('root'));
