import React, { useContext } from 'react';
import GlobalStyle from './globalStyles';
import { BrowserRouter as Router, Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { Navbar, Footer } from './components';
import Home from './components/pages/HomePage/Home';
import Budget from './components/pages/Budget';
import Asset from './components/pages/Asset';
import Stocks from './components/Stocks/Stocks';
import Transactions from './components/pages/Transactions';
// import OurTeam from './components/pages/OurTeam';
import SignUp from './components/auth/SignUp';
import ModifyClientPage from './components/auth/ModifyClientPage';
import Login from './components/auth/Login';
import Logout from './components/auth/Logout';
import NotFound from './components/pages/NotFound';
import ApexCharts from './components/pages/ApexCharts';
import ResourceSearch from './components/pages/ResourceSearch/ResourceSearch';
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
