import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header'
import LandingPage from './routes/LandingPage/LandingPage';

function App() {
  return (
    <main className="App">
      <Header />

      <Switch>
        <Route path='/' component={LandingPage} />
      </Switch>

    </main>
  );
}

export default App;
