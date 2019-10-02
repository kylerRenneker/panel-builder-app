import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header'
import LandingPage from './routes/LandingPage/LandingPage';
import ColorPickerForm from './routes/ColorPickerForm/ColorPickerForm';

function App() {
  return (
    <main className="App">
      <Header />

      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route path='/ColorPicker' component={ColorPickerForm} />
      </Switch>

    </main>
  );
}

export default App;
