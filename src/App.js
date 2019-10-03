import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header'
import LandingPage from './routes/LandingPage/LandingPage';
import ColorPickerForm from './components/ColorPickerForm/ColorPickerForm';
import PanelSizeForm from './components/PanelSizeForm/PanelSizeForm';

function App() {
  return (
    <main className="App">
      <Header />

    {/* Research setting up without routes (functions to add/remove classes that with position/show components accordingly) */}
      
      {/* <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route path='/ColorPicker' component={ColorPickerForm} />
      </Switch> */}

      <div className='panel_container'>
        <PanelSizeForm className='panel_size' />
        <ColorPickerForm className='color_picker'/>
        
      </div>

    </main>
  );
}

export default App;
