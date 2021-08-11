import React, { useContext } from 'react';
import GlobalStyle from './globalStyles';
import { BrowserRouter as Router, Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { Navbar, Footer } from './components';
import Home from './pages/HomePage/Home';
import Budget from './pages/Budget/Budget';
import Asset from './pages/Asset';
import Stocks from './components/Stocks/Stocks';
import Transactions from './pages/Transactions';
// import OurTeam from './pages/OurTeam';
import SignUp from './components/auth/SignUp';
import ModifyClientPage from './components/auth/ModifyClientPage';
import Login from './components/auth/Login';
import Logout from './components/auth/Logout';
import NotFound from './pages/NotFound';
import Settings from './components/auth/Settings';
import ApexCharts from './pages/ApexCharts';
import ResourceSearch from './pages/ResourceSearch/ResourceSearch';
import AuthenticationContext from './components/auth/AuthenticationContext';
import AuthenticationProvider from './components/auth/AuthenticationProvider';
import Dashboard from './components/ApexCharts/Dashboard/Dashboard';
import OnboardingWizard from './components/OnboardingWizard/OnboardingWizard';

function App() {
  return (
    <AuthenticationProvider>
      <Router>
        <GlobalStyle />
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          {/* <Route path='/promotions' exact component={Promotions} /> */}
          <Route path='/resources' exact component={ResourceSearch} />
          <Route path='/apex-charts' exact component={ApexCharts} />
          <Route path='/onboard' exact component={OnboardingWizard} />
          {/* <Route path='/our-team' exact component={OurTeam} /> */}

          <ConditionalRoute condition={()=>{return UseAuth().isUser()}}
            path='/budget' exact>
            <Budget />
          </ConditionalRoute>

          <ConditionalRoute condition={()=>{return UseAuth().isUser()}}
            path='/asset' exact>
            <Asset/>
          </ConditionalRoute>

          <ConditionalRoute condition={()=>{return UseAuth().isUser()}}
            path='/stocks' exact>
            <Stocks/>
          </ConditionalRoute>

          <ConditionalRoute condition={()=>{return UseAuth().isUser()}}
          path='/transaction' exact>
          <Transactions/>
        </ConditionalRoute>

          <ConditionalRoute condition={()=>{return UseAuth().isUser()}}
            path='/dashboard' exact>
            <Dashboard />
          </ConditionalRoute>

          <ConditionalRoute condition={()=>{return !UseAuth().isLogedIn()}} 
            path='/login' exact>
              <Login/>
          </ConditionalRoute >

          <ConditionalRoute condition={()=>{return UseAuth().isLogedIn()}} 
            path='/logout' exact>
              <Logout/>
          </ConditionalRoute >

          <ConditionalRoute condition={()=>{const lc = UseAuth(); return !lc.isLogedIn() || lc.isAdmin()}} 
            path='/sign-up' exact>
             <SignUp/>
          </ConditionalRoute >

          <ConditionalRoute condition={()=>{return UseAuth().isLogedIn()}} 
            path='/modifyclient' exact>
             <ModifyClientPage/>
          </ConditionalRoute >

          <ConditionalRoute condition={()=>{return UseAuth().isAdmin()}} 
            path='/settings' exact>
             <Settings/>
          </ConditionalRoute >

          <Route path='*' component={NotFound} />

        </Switch>
        <Footer />
      </Router>
    </AuthenticationProvider>
  );
}

function UseAuth() {
  return useContext(AuthenticationContext);
}


// function ConditionalRoute2({ condition, component, path, component2, path2, ...rest }) {
//   return (
//     <Route
//       {...rest}
//       render={() => {
//         return (
//           condition ?
//             ({ component }, { path })
//             :
//             ({ component: component2 }, { path: path2 })
//         )
//       }
//       }
//     />
//   )
// }


function ConditionalRoute({ children, condition, ...rest }) {
  let condition2 = condition();
  // console.log("condition2=", condition2)
  return (
    <Route
      {...rest}
      render={({ location }) =>
        condition2 ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}


export default App;
