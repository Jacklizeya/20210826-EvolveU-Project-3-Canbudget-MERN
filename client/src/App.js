import React from 'react';
import GlobalStyle from './globalStyles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Navbar, Footer } from './components';
import Home from './components/pages/HomePage/Home';
import Advisors from './components/pages/Advisors';
import Budget from './components/pages/Budget';
import Asset from './components/pages/Asset';
// import OurTeam from './components/pages/OurTeam';
import SignUp from './components/pages/SignUp';
import ApexCharts from './components/pages/ApexCharts';
import ResourceSearch from './components/pages/ResourceSearch/ResourceSearch';
import AuthenticationProvider from './components/auth/AuthenticationProvider';
import SearchForm from './components/NearbySearch/SearchForm';



function App() {
  return (
    <AuthenticationProvider>
      <Router>
        <GlobalStyle />
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          {/* <Route path='/promotions' exact component={Promotions} /> */}
          <Route path='/advisors' exact component={Advisors} />
          <Route path='/budget' exact component={Budget} />
          <Route path='/asset' exact component={Asset} />
          <Route path='/sign-up' exact component={SignUp} />
          <Route path='/apex-charts' exact component={ApexCharts} />
          <Route path='/map' exact component={ResourceSearch} />
          <Route path='/form' exact component={SearchForm} />
          {/* <Route path='/our-team' exact component={OurTeam} /> */}
        </Switch>
        <Footer />
      </Router>
    </AuthenticationProvider>
  );
}

export default App;
