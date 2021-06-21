import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import { BrowserRouter  as Router, Switch, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Promotions from './components/pages/Promotions';
import Advisors from './components/pages/Advisors';
import Budget from './components/pages/Budget';
import Asset from './components/pages/Asset';
import SignUp from './components/pages/SignUp';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/promotions' exact component={Promotions} />
        <Route path='/advisors' exact component={Advisors} />
        <Route path='/budget' exact component={Budget} />
        <Route path='/asset' exact component={Asset} />
        <Route path='/sign-up' exact component={SignUp} />
      </Switch>
    </Router>
  );
}

export default App;
